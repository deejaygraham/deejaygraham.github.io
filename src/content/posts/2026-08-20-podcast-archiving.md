---
title: Archive Podcast Episodes
tags: [python, code]
---

Another take on the problem of creating an archive of a favourite podcast, this time using SQLite to store which episodes 
have already been downloaded so we don't waste bandwidth saving files we already have. Again this is going to run in the background 
on a Mac quietly saving episodes as they appear.

## archive_podcast.py

The script takes in a path to the podcast rss xml file and the folder to store the episodes files. Each folder contains the files downloaded so far 
and an individual .podcast-archive.sqlite3 database that tracks the files found in the feed and downloaded.

```python
#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import mimetypes
import os
import re
import sqlite3
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable


USER_AGENT = "podcast-archive/1.0"
DATABASE_FILE = ".podcast-archive.sqlite3"
INVALID_FILENAME_CHARS = re.compile(r'[<>:"/\\|?*\x00-\x1f]')
WHITESPACE = re.compile(r"\s+")
KNOWN_AUDIO_EXTENSIONS = {
    "audio/aac": ".aac",
    "audio/flac": ".flac",
    "audio/m4a": ".m4a",
    "audio/mp4": ".m4a",
    "audio/mpeg": ".mp3",
    "audio/ogg": ".ogg",
    "audio/wav": ".wav",
    "audio/x-m4a": ".m4a",
}


@dataclass(frozen=True)
class Episode:
    episode_id: str
    title: str
    url: str
    media_type: str = ""
    published: str = ""


def local_name(tag: str) -> str:
    """Return an XML tag without its namespace."""
    return tag.rsplit("}", 1)[-1].lower()


def child_text(element: ET.Element, names: set[str]) -> str:
    for child in element:
        if local_name(child.tag) in names and child.text:
            return child.text.strip()
    return ""


def enclosure_from(element: ET.Element) -> tuple[str, str] | None:
    candidates: list[tuple[str, str]] = []
    for child in element:
        tag = local_name(child.tag)
        rel = child.attrib.get("rel", "").lower()
        url = child.attrib.get("url") or child.attrib.get("href") or ""
        media_type = child.attrib.get("type", "")
        if url and (tag in {"enclosure", "content"} or rel == "enclosure"):
            candidates.append((url.strip(), media_type.strip()))

    if not candidates:
        return None
    return next(
        (candidate for candidate in candidates if candidate[1].lower().startswith("audio/")),
        candidates[0],
    )


def parse_feed(xml_data: bytes) -> list[Episode]:
    root = ET.fromstring(xml_data)
    entries = [element for element in root.iter() if local_name(element.tag) in {"item", "entry"}]
    episodes: list[Episode] = []
    for entry in entries:
        enclosure = enclosure_from(entry)
        if not enclosure:
            continue
        url, media_type = enclosure
        title = child_text(entry, {"title"}) or "Untitled episode"
        episode_id = child_text(entry, {"guid", "id"}) or url
        published = child_text(entry, {"pubdate", "published", "updated"})
        episodes.append(Episode(episode_id, title, url, media_type, published))
    return episodes


def read_feed(source: str) -> bytes:
    path = Path(source).expanduser()
    if path.is_file():
        return path.read_bytes()
    request = urllib.request.Request(source, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read()


def safe_title(title: str, limit: int = 120) -> str:
    title = INVALID_FILENAME_CHARS.sub("_", title)
    title = WHITESPACE.sub(" ", title).strip(" .")
    return (title or "Untitled episode")[:limit].rstrip(" .")


def published_prefix(value: str) -> str:
    # RFC 2822 and ISO timestamps both normally begin with, or contain, these
    # date components. A missing/unusual date simply produces no prefix.
    match = re.search(r"(?P<year>\d{4})[-/](?P<month>\d{2})[-/](?P<day>\d{2})", value)
    if match:
        return f"{match['year']}-{match['month']}-{match['day']} - "
    try:
        from email.utils import parsedate_to_datetime

        parsed = parsedate_to_datetime(value)
        return parsed.strftime("%Y-%m-%d - ")
    except (TypeError, ValueError, OverflowError):
        return ""


def extension_for(episode: Episode) -> str:
    url_path = urllib.parse.unquote(urllib.parse.urlsplit(episode.url).path)
    suffix = Path(url_path).suffix.lower()
    if suffix and len(suffix) <= 6 and re.fullmatch(r"\.[a-z0-9]+", suffix):
        return suffix
    media_type = episode.media_type.partition(";")[0].strip().lower()
    return KNOWN_AUDIO_EXTENSIONS.get(media_type) or mimetypes.guess_extension(media_type) or ".audio"


def episode_key(episode: Episode) -> str:
    return hashlib.sha256(episode.episode_id.encode("utf-8")).hexdigest()


def filename_for(episode: Episode, key: str, used_names: set[str]) -> str:
    stem = published_prefix(episode.published) + safe_title(episode.title)
    extension = extension_for(episode)
    filename = stem + extension
    if filename.casefold() in used_names:
        filename = f"{stem} - {key[:8]}{extension}"
    return filename


def open_database(output: Path) -> sqlite3.Connection:
    connection = sqlite3.connect(output / DATABASE_FILE)
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS episodes (
            episode_key TEXT PRIMARY KEY,
            episode_id TEXT NOT NULL,
            title TEXT NOT NULL,
            url TEXT NOT NULL,
            file TEXT NOT NULL,
            published TEXT NOT NULL,
            archived_at TEXT NOT NULL
        )
        """
    )
    connection.execute("CREATE INDEX IF NOT EXISTS episodes_file_idx ON episodes(file)")
    return connection


def record_episode(connection: sqlite3.Connection, episode: Episode, key: str, filename: str) -> None:
    connection.execute(
        """
        INSERT INTO episodes
            (episode_key, episode_id, title, url, file, published, archived_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(episode_key) DO UPDATE SET
            episode_id = excluded.episode_id,
            title = excluded.title,
            url = excluded.url,
            file = excluded.file,
            published = excluded.published
        """,
        (
            key,
            episode.episode_id,
            episode.title,
            episode.url,
            filename,
            episode.published,
            datetime.now().astimezone().isoformat(timespec="seconds"),
        ),
    )
    connection.commit()


def download(url: str, destination: Path) -> None:
    temporary = destination.with_name(destination.name + ".part")
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=60) as response, temporary.open("wb") as output:
            while chunk := response.read(1024 * 1024):
                output.write(chunk)
        os.replace(temporary, destination)
    except Exception:
        temporary.unlink(missing_ok=True)
        raise


def archive(feed: str, output: Path) -> tuple[int, int, int]:
    output.mkdir(parents=True, exist_ok=True)
    episodes = parse_feed(read_feed(feed))
    existing_names = {path.name.casefold() for path in output.iterdir() if path.is_file()}
    used_names = set(existing_names)
    downloaded = skipped = failed = 0
    connection = open_database(output)

    try:
        print(f"Found {len(episodes)} episode(s) in the feed.")
        for episode in episodes:
            key = episode_key(episode)
            record = connection.execute(
                "SELECT file FROM episodes WHERE episode_key = ?", (key,)
            ).fetchone()
            recorded_filename = record[0] if record else None
            if recorded_filename and Path(recorded_filename).name == recorded_filename:
                recorded_path = output / recorded_filename
                if recorded_path.is_file():
                    record_episode(connection, episode, key, recorded_filename)
                    print(f"SKIP     {episode.title}")
                    skipped += 1
                    continue

            if recorded_filename and Path(recorded_filename).name == recorded_filename:
                filename = recorded_filename
            else:
                # If the database was lost but the deterministic file remains,
                # adopt it instead of downloading it again.
                base_filename = filename_for(episode, key, set())
                if base_filename.casefold() in existing_names:
                    filename = base_filename
                else:
                    filename = filename_for(episode, key, used_names)
            destination = output / filename
            if destination.is_file():
                print(f"SKIP     {episode.title} (file already exists)")
                skipped += 1
            else:
                print(f"DOWNLOAD {episode.title}")
                try:
                    download(episode.url, destination)
                    downloaded += 1
                except Exception as error:
                    print(f"ERROR    {episode.title}: {error}", file=sys.stderr)
                    failed += 1
                    continue

            used_names.add(filename.casefold())
            record_episode(connection, episode, key, filename)
    finally:
        connection.close()

    return downloaded, skipped, failed


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("feed", help="Podcast RSS/Atom feed URL (or a local XML file for testing)")
    parser.add_argument("output", type=Path, help="Directory in which to archive episodes")
    return parser


def main(argv: Iterable[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        downloaded, skipped, failed = archive(args.feed, args.output.expanduser().resolve())
    except (OSError, RuntimeError, sqlite3.Error, ET.ParseError, ValueError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print(f"Done: {downloaded} downloaded, {skipped} already archived, {failed} failed.")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())

```

## Run

Trying this with a well known podcast feed like this: 

```bash
python archive_podcast.py https://developeronfire.com/recentonly-rss.xml C:\dev\archive\developeronfire
```

...gives the following resulting output.

```bash
Found 20 episode(s) in the feed.
DOWNLOAD Episode 452 | Aimee Knight - Inspired
DOWNLOAD Episode 451 | Alberto Brandolini - Mistakes and Experiments
DOWNLOAD Episode 450 | Reem Altamimi - Leading Humans
DOWNLOAD Episode 449 | Luca Ferrari - Focused Practice
DOWNLOAD Episode 448 | Nicholas Chase - Expanding What People Think They Can Do
DOWNLOAD Episode 447 | Samantha Campbell - Community-Focused
DOWNLOAD Episode 446 | Taylor Perkins - Hard Things Thoughtfully Done
DOWNLOAD Episode 445 | Gonçalo Silva - Highly Productive Teams
DOWNLOAD Episode 444 | Carl Perry - Customer Focused
DOWNLOAD Episode 443 | Justin Hoover - Building a Legacy
DOWNLOAD Episode 442 | Elliot Simon - Collaborating with Robots
DOWNLOAD Episode 441 | Juval Löwy - Validating Design
DOWNLOAD Episode 440 | Ole Dallerup - Proving the Value
DOWNLOAD Episode 439 | Geoff Mazeroff - Leading as Yourself
DOWNLOAD Episode 438 | William Springer - Rewards of Teaching
DOWNLOAD Episode 437 | Andy Hunt and Dave Thomas - The Pragmatic Programmer, 20th Anniversary Edition
DOWNLOAD Episode 436 | Amitai Schleier - Safe for Programmers and Non-programmers
DOWNLOAD Episode 435 | Eric Brechner - Responding Honorably
DOWNLOAD Episode 434 | Enrique López Mañas - Tribe of Programming Titans
DOWNLOAD Episode 433 | Elissa Shevinsky - Continuous Growth
Done: 20 downloaded, 0 already archived, 0 failed.
```

## Tests

I tried to add a little bit of confidence in the form of some unit tests with fake downloads from an in-memory 
rss feed. 

```python
import io
import shutil
import sqlite3
import unittest
import urllib.error
import uuid
from contextlib import redirect_stderr
from pathlib import Path
from unittest.mock import patch

import archive_podcast


RSS = b"""<?xml version="1.0"?>
<rss version="2.0"><channel><title>Example</title>
  <item><title>Episode: One?</title><guid>episode-1</guid>
    <pubDate>Tue, 01 Sep 2026 10:00:00 GMT</pubDate>
    <enclosure url="https://example.test/one.mp3?token=abc" type="audio/mpeg" />
  </item>
  <item><title>Episode Two</title><guid>episode-2</guid>
    <enclosure url="https://example.test/audio?id=2" type="audio/mp4" />
  </item>
</channel></rss>"""


class PodcastArchiveTests(unittest.TestCase):
    def temporary_directory(self):
        directory = Path.cwd() / f".podcast-test-{uuid.uuid4().hex}"
        self.addCleanup(shutil.rmtree, directory, True)
        return directory

    def test_parse_rss_and_build_safe_names(self):
        episodes = archive_podcast.parse_feed(RSS)
        self.assertEqual(2, len(episodes))
        self.assertEqual("episode-1", episodes[0].episode_id)
        key = archive_podcast.episode_key(episodes[0])
        self.assertEqual(
            "2026-09-01 - Episode_ One_.mp3",
            archive_podcast.filename_for(episodes[0], key, set()),
        )
        self.assertEqual(".m4a", archive_podcast.extension_for(episodes[1]))

    def test_second_run_skips_downloaded_episode(self):
        directory = self.temporary_directory()
        output = directory / "archive"

        def fake_download(_url, destination):
            destination.write_bytes(b"audio")

        with patch.object(archive_podcast, "read_feed", return_value=RSS), patch.object(
            archive_podcast, "download", side_effect=fake_download
        ) as downloader:
            self.assertEqual((2, 0, 0), archive_podcast.archive("feed", output))
            self.assertEqual((0, 2, 0), archive_podcast.archive("feed", output))
            self.assertEqual(2, downloader.call_count)

        connection = sqlite3.connect(output / archive_podcast.DATABASE_FILE)
        try:
            rows = connection.execute("SELECT episode_id, title, file FROM episodes ORDER BY episode_id").fetchall()
        finally:
            connection.close()
        self.assertEqual(2, len(rows))
        self.assertEqual("episode-1", rows[0][0])

    def test_downloads_episode_when_indexed_file_is_missing(self):
        output = self.temporary_directory() / "archive"
        episode = archive_podcast.parse_feed(RSS)[0]
        output.mkdir(parents=True)
        connection = archive_podcast.open_database(output)
        try:
            archive_podcast.record_episode(
                connection,
                episode,
                archive_podcast.episode_key(episode),
                "missing.mp3",
            )
        finally:
            connection.close()

        audio = b"actual audio bytes"
        with patch.object(archive_podcast, "read_feed", return_value=RSS), patch.object(
            archive_podcast.urllib.request, "urlopen", side_effect=lambda *_args, **_kwargs: io.BytesIO(audio)
        ):
            result = archive_podcast.archive("feed", output)

        self.assertEqual((2, 0, 0), result)
        self.assertEqual(audio, (output / "missing.mp3").read_bytes())
        self.assertFalse((output / "missing.mp3.part").exists())

    def test_unavailable_feed_exits_cleanly(self):
        output = self.temporary_directory() / "archive"
        stderr = io.StringIO()
        with patch.object(
            archive_podcast,
            "read_feed",
            side_effect=urllib.error.URLError("internet unavailable"),
        ), redirect_stderr(stderr):
            result = archive_podcast.main(["https://example.test/feed.xml", str(output)])

        self.assertEqual(1, result)
        self.assertIn("ERROR:", stderr.getvalue())
        self.assertIn("internet unavailable", stderr.getvalue())
        self.assertFalse((output / archive_podcast.DATABASE_FILE).exists())

    def test_atom_enclosure(self):
        atom = b"""<feed xmlns="http://www.w3.org/2005/Atom"><entry>
          <title>An episode</title><id>tag:example.test,2026:1</id>
          <link rel="enclosure" type="audio/ogg" href="https://example.test/one.ogg" />
        </entry></feed>"""
        episodes = archive_podcast.parse_feed(atom)
        self.assertEqual("https://example.test/one.ogg", episodes[0].url)


if __name__ == "__main__":
    unittest.main()

```



