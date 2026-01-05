---
title: Download from RSS
draft: true
tags: [code, python]
---

```python
#!/usr/bin/env python3
"""
Download all podcast episodes (enclosures) from an RSS feed to local disk.

Features:
- Parses RSS feed and downloads audio enclosures.
- Oldest-first ordering (start from the very beginning).
- Safe filenames based on episode titles.
- Supports public, Basic Auth, and Bearer token feeds.

Usage:
  Set RSS_URL and AUTH_METHOD below, then run:
    python3 download_podcast.py
"""
from __future__ import annotations

import os
import re
import sys
import xml.etree.ElementTree as ET
import urllib.request
import urllib.error
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List, Optional, Tuple

# --------------------------
# Configuration (edit these)
# --------------------------
RSS_URL: str = "https://example.com/path/to/private_or_public_feed.rss"
OUT_DIR: Path = Path("PodcastDownloads")

# Choose ONE auth method:
#   - None: public feeds or token-in-URL feeds
#   - Basic: username/password
#   - Bearer: set Authorization header with a token
AUTH_METHOD: str = "None"     # "None" | "Basic" | "Bearer"

BASIC_USERNAME: str = "your_username"
BASIC_PASSWORD: str = "your_password"

BEARER_TOKEN: str = "your_token_value"


# --------------------------
# Data structures
# --------------------------
@dataclass
class Episode:
    """Represents a single podcast episode parsed from RSS."""
    title: str
    url: str
    ext: str


# --------------------------
# Helpers
# --------------------------
def sanitize_filename(name: str) -> str:
    """
    Create a filesystem-safe filename from an arbitrary title string.
    """
    name = re.sub(r"\s+", " ", name.strip())
    name = re.sub(r'[\\/:"*?<>|]', "-", name)
    return name


def detect_extension(url: str, default: str = ".mp3") -> str:
    """
    Attempt to infer file extension from URL, defaulting to `.mp3`.
    """
    lower = url.lower()
    m = re.search(r"\.(mp3|m4a|aac|mp4|wav|ogg)(?:\?|$)", lower)
    return f".{m.group(1)}" if m else default


def configure_auth_opener(
    method: str,
    rss_url: str,
    username: Optional[str] = None,
    password: Optional[str] = None,
    bearer_token: Optional[str] = None,
) -> Optional[urllib.request.OpenerDirector]:
    """
    Configure an opener for authentication.

    Returns:
        An OpenerDirector if special auth is needed, else None.
    """
    method = method.strip()
    if method == "None":
        return None

    if method == "Basic":
        if not (username and password):
            raise ValueError("Basic auth requires username and password.")
        auth_handler = urllib.request.HTTPBasicAuthHandler()
        auth_handler.add_password(realm=None, uri=rss_url, user=username, passwd=password)
        opener = urllib.request.build_opener(auth_handler)
        urllib.request.install_opener(opener)
        return opener

    if method == "Bearer":
        if not bearer_token:
            raise ValueError("Bearer auth requires a token.")
        # For Bearer, we set headers per request, so no opener is strictly required.
        # Return None and ensure requests use headers.
        return None

    raise ValueError(f"Unsupported AUTH_METHOD: {method}")


def fetch_bytes(url: str, headers: Optional[dict[str, str]] = None) -> bytes:
    """
    Fetch a resource and return raw bytes.
    """
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req) as resp:
        return resp.read()


def stream_download(url: str, dest: Path, headers: Optional[dict[str, str]] = None, chunk_size: int = 262_144) -> None:
    """
    Stream a download to disk to avoid large memory usage.

    Args:
        url: Remote audio URL.
        dest: Local file path to write to.
        headers: Optional HTTP headers (e.g., Authorization).
        chunk_size: Bytes per read chunk; default 256 KiB.
    """
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req) as resp, dest.open("wb") as out:
        while True:
            buf = resp.read(chunk_size)
            if not buf:
                break
            out.write(buf)


def parse_rss_items(xml_data: bytes) -> List[ET.Element]:
    """
    Parse RSS XML and return a list of <item> elements.
    """
    root = ET.fromstring(xml_data)
    channel = root.find("channel")
    items = channel.findall("item") if channel is not None else root.findall(".//item")
    return items


def extract_episode(item: ET.Element, index_fallback: int) -> Optional[Episode]:
    """
    Extract an Episode from an RSS <item> element.
    Looks for <enclosure url="..."> first; falls back to <link>/<guid>.
    """
    title_el = item.find("title")
    title_text = title_el.text.strip() if (title_el is not None and title_el.text) else f"Episode {index_fallback}"

    enclosure = item.find("enclosure")
    url: Optional[str] = enclosure.get("url") if enclosure is not None else None

    if not url:
        # Try <link> or <guid> if they end with a common audio extension
        for tag in ("link", "guid"):
            el = item.find(tag)
            if el is not None and el.text:
                candidate = el.text.strip()
                if re.search(r"\.(mp3|m4a|aac|mp4|wav|ogg)(?:\?|$)", candidate.lower()):
                    url = candidate
                    break

    if not url:
        # No usable audio URL found
        return None

    ext = detect_extension(url)
    return Episode(title=title_text, url=url, ext=ext)


def build_auth_headers(method: str, bearer_token: Optional[str] = None) -> dict[str, str]:
    """
    Build HTTP headers for the selected auth method.
    """
    if method == "Bearer" and bearer_token:
        return {"Authorization": f"Bearer {bearer_token}"}
    return {}


def ensure_output_dir(path: Path) -> None:
    """
    Ensure output directory exists.
    """
    path.mkdir(parents=True, exist_ok=True)


def plan_downloads(items: Iterable[ET.Element]) -> List[Episode]:
    """
    Convert <item> elements to a list of Episodes, ordered oldest-first.
    """
    raw_episodes: List[Episode] = []
    # Reverse items (feeds are usually newest-first)
    for idx, item in enumerate(reversed(list(items)), start=1):
        ep = extract_episode(item, index_fallback=idx)
        if ep is not None:
            raw_episodes.append(ep)
    return raw_episodes


def episode_filename(ep: Episode) -> str:
    """
    Build a safe filename for an episode.
    """
    base = sanitize_filename(ep.title)
    return f"{base}{ep.ext}"


# --------------------------
# Main
# --------------------------
def main() -> int:
    """
    Entry point. Returns 0 on success, non-zero on failure.
    """
    try:
        # Configure auth
        opener = configure_auth_opener(
            method=AUTH_METHOD,
            rss_url=RSS_URL,
            username=BASIC_USERNAME,
            password=BASIC_PASSWORD,
            bearer_token=BEARER_TOKEN,
        )
        # Build headers if needed (Bearer only)
        headers = build_auth_headers(AUTH_METHOD, BEARER_TOKEN)

        ensure_output_dir(OUT_DIR)

        print("Fetching feed…")
        xml_data = fetch_bytes(RSS_URL, headers=headers)

        items = parse_rss_items(xml_data)
        if not items:
            print("No <item> elements found in feed. Is the RSS URL correct?", file=sys.stderr)
            return 2

        episodes = plan_downloads(items)
        print(f"Found {len(episodes)} episodes. Starting from the earliest…")

        for i, ep in enumerate(episodes, start=1):
            filename = episode_filename(ep)
            path = OUT_DIR / filename

            if path.exists() and path.stat().st_size > 0:
                print(f"[{i}] Already exists: {filename}")
                continue

            print(f"[{i}] Downloading: {ep.title}")
            try:
                stream_download(ep.url, path, headers=headers)
            except urllib.error.HTTPError as e:
                print(f"HTTP error for '{ep.title}': {e.code} {e.reason}", file=sys.stderr)
            except Exception as e:
                print(f"Error downloading '{ep.title}': {e}", file=sys.stderr)

        print("All done.")
        return 0

    except ET.ParseError as e:
        print(f"XML parse error: {e}", file=sys.stderr)
        return 3
    except ValueError as e:
        print(f"Configuration error: {e}", file=sys.stderr)
        return 4
    except Exception as e:
        print(f"Unexpected error: {e}", file=sys.stderr)
        return 5


if __name__ == "__main__":
    sys.exit(main())
```
