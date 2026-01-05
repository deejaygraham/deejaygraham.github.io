---
title: Download from RSS
draft: true
tags: [code, python]
---

## Code

```python
#!/usr/bin/env python3
"""
Download all podcast episodes (enclosures) from an RSS feed to local disk,
assuming authentication is embedded directly in the URL (e.g., token query or
username:password in the URL).

Features:
- Oldest-first ordering (start from the beginning).
- Safe filenames based on episode titles.
- Politeness: rate limit, per-download delay, exponential backoff, Retry-After.
- No external auth methods (Bearer/Basic) — URL is used as-is.
"""

from __future__ import annotations

import re
import sys
import time
import xml.etree.ElementTree as ET
import urllib.request
import urllib.error
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List, Optional, Dict


RSS_URL: str = "https://www.example.com/rss/podcast.rss"
OUT_DIR: Path = Path("PodcastDownloads")

# Politeness settings 
MAX_DOWNLOADS_PER_MINUTE: float = 2.0   # e.g., 1–3
PER_DOWNLOAD_SLEEP_SECONDS: float = 5.0 # pause after each episode
MAX_RETRIES: int = 4                    # retries for transient errors
INITIAL_BACKOFF_SECONDS: float = 2.0    # base for exponential backoff
USER_AGENT: str = "PodcastDownloader/1.0 (+https://yourdomain.example)"

# Optional: cap throughput per episode (bytes/sec). None disables.
# Example: 500_000 ≈ 0.5 MB/s; 1_000_000 ≈ 1 MB/s.
MAX_BYTES_PER_SEC: Optional[int] = None

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
    name = re.sub(r"\s+", " ", name.strip())
    name = re.sub(r'[\\/:"*?<>|]', "-", name)
    return name


def detect_extension(url: str, default: str = ".mp3") -> str:
    lower = url.lower()
    m = re.search(r"\.(mp3|m4a|aac|mp4|wav|ogg)(?:\?|$)", lower)
    return f".{m.group(1)}" if m else default


def default_headers() -> Dict[str, str]:
    return {"User-Agent": USER_AGENT}


def request_with_backoff(
    req: urllib.request.Request,
    max_retries: int = MAX_RETRIES,
    initial_backoff_s: float = INITIAL_BACKOFF_SECONDS,
) -> urllib.response.addinfourl:
    """
    Perform a request with exponential backoff for transient errors.
    Honors Retry-After when present.
    """
    attempt = 0
    while True:
        try:
            return urllib.request.urlopen(req)
        except urllib.error.HTTPError as e:
            status = e.code
            if status in (429, 500, 502, 503, 504) and attempt < max_retries:
                retry_after = e.headers.get("Retry-After")
                if retry_after:
                    try:
                        sleep_s = float(retry_after)
                    except ValueError:
                        sleep_s = initial_backoff_s * (2 ** attempt)
                else:
                    sleep_s = initial_backoff_s * (2 ** attempt)
                print(f"Server {status}. Backing off {sleep_s:.1f}s (attempt {attempt+1}/{max_retries})…")
                time.sleep(sleep_s)
                attempt += 1
                continue
            raise
        except urllib.error.URLError as e:
            if attempt < max_retries:
                sleep_s = initial_backoff_s * (2 ** attempt)
                print(f"Network error: {e.reason}. Backing off {sleep_s:.1f}s (attempt {attempt+1}/{max_retries})…")
                time.sleep(sleep_s)
                attempt += 1
                continue
            raise


def fetch_bytes(url: str, headers: Optional[Dict[str, str]] = None) -> bytes:
    req = urllib.request.Request(url, headers=headers or {})
    with request_with_backoff(req) as resp:
        return resp.read()


def parse_rss_items(xml_data: bytes) -> List[ET.Element]:
    root = ET.fromstring(xml_data)
    channel = root.find("channel")
    items = channel.findall("item") if channel is not None else root.findall(".//item")
    return items


def extract_episode(item: ET.Element, index_fallback: int) -> Optional[Episode]:
    title_el = item.find("title")
    title_text = title_el.text.strip() if (title_el is not None and title_el.text) else f"Episode {index_fallback}"

    enclosure = item.find("enclosure")
    url: Optional[str] = enclosure.get("url") if enclosure is not None else None

    if not url:
        for tag in ("link", "guid"):
            el = item.find(tag)
            if el is not None and el.text:
                candidate = el.text.strip()
                if re.search(r"\.(mp3|m4a|aac|mp4|wav|ogg)(?:\?|$)", candidate.lower()):
                    url = candidate
                    break

    if not url:
        return None

    ext = detect_extension(url)
    return Episode(title=title_text, url=url, ext=ext)


def ensure_output_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def plan_downloads(items: Iterable[ET.Element]) -> List[Episode]:
    episodes: List[Episode] = []
    for idx, item in enumerate(reversed(list(items)), start=1):
        ep = extract_episode(item, index_fallback=idx)
        if ep is not None:
            episodes.append(ep)
    return episodes


def episode_filename(ep: Episode) -> str:
    base = sanitize_filename(ep.title)
    return f"{base}{ep.ext}"


# --------------------------
# Rate limiting & throttling
# --------------------------
class RateLimiter:
    """
    Simple time-based rate limiter: ensures at most N actions per minute.
    """
    def __init__(self, max_per_minute: float) -> None:
        self.max_per_minute = max_per_minute
        self._last_action_ts: float = 0.0

    def wait(self) -> None:
        if self.max_per_minute <= 0:
            return
        interval = 60.0 / self.max_per_minute
        now = time.time()
        elapsed = now - self._last_action_ts
        if elapsed < interval:
            time.sleep(interval - elapsed)
        self._last_action_ts = time.time()


def stream_download(
    url: str,
    dest: Path,
    headers: Optional[Dict[str, str]] = None,
    chunk_size: int = 262_144,
    max_bytes_per_sec: Optional[int] = MAX_BYTES_PER_SEC,
) -> None:
    """
    Stream a download to disk to avoid large memory usage, with optional throughput cap.
    """
    req = urllib.request.Request(url, headers=headers or {})
    with request_with_backoff(req) as resp, dest.open("wb") as out:
        bytes_this_second = 0
        second_start = time.time()
        while True:
            buf = resp.read(chunk_size)
            if not buf:
                break
            out.write(buf)
            if max_bytes_per_sec is not None:
                bytes_this_second += len(buf)
                now = time.time()
                # reset each second
                if now - second_start >= 1.0:
                    second_start = now
                    bytes_this_second = 0
                elif bytes_this_second >= max_bytes_per_sec:
                    sleep_s = 1.0 - (now - second_start)
                    if sleep_s > 0:
                        time.sleep(sleep_s)
                    second_start = time.time()
                    bytes_this_second = 0


def main() -> int:
    try:
        headers = default_headers()

        ensure_output_dir(OUT_DIR)

        print("Fetching feed…")
        xml_data = fetch_bytes(RSS_URL, headers=headers)

        items = parse_rss_items(xml_data)
        if not items:
            print("No <item> elements found in feed. Is the RSS URL correct?", file=sys.stderr)
            return 2

        episodes = plan_downloads(items)
        print(f"Found {len(episodes)} episodes. Starting from the earliest…")

        limiter = RateLimiter(MAX_DOWNLOADS_PER_MINUTE)

        for i, ep in enumerate(episodes, start=1):
            filename = episode_filename(ep)
            path = OUT_DIR / filename

            if path.exists() and path.stat().st_size > 0:
                print(f"[{i}] Already exists: {filename}")
                continue

            # Rate-limit before the next request
            limiter.wait()

            print(f"[{i}] Downloading: {ep.title}")
            try:
                stream_download(ep.url, path, headers=headers)
            except urllib.error.HTTPError as e:
                print(f"HTTP error for '{ep.title}': {e.code} {e.reason}", file=sys.stderr)
                if path.exists() and path.stat().st_size == 0:
                    path.unlink(missing_ok=True)
            except Exception as e:
                print(f"Error downloading '{ep.title}': {e}", file=sys.stderr)
                if path.exists() and path.stat().st_size == 0:
                    path.unlink(missing_ok=True)

            # Pause between episodes for extra politeness
            if PER_DOWNLOAD_SLEEP_SECONDS > 0:
                time.sleep(PER_DOWNLOAD_SLEEP_SECONDS)

        print("All done.")
        return 0

    except ET.ParseError as e:
        print(f"XML parse error: {e}", file=sys.stderr)
        return 3
    except Exception as e:
        print(f"Unexpected error: {e}", file=sys.stderr)
        return 5


if __name__ == "__main__":
    sys.exit(main())

```
