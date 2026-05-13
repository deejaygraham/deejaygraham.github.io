---
title: Photo Consolidation
tags: [python, macos]
---

Like a lot of people who have been messing about with computers and technology for a long time, I have a few old hard drives 
lying around acting as backups from previous, now defunct machines. As they gather dust, I am aware that some of their content 
is not interesting but occasionally there are backups of precious photos from family holidays or days out. 

Rather than leaving them to eventually demagnitise and lose those photos, I wanted to mount each drive as a USB drive and 
copy their content over to a photo folder on my home NAS, split by year the photos were taken. 

I wrote a script to copy the images and make sure that possible duplicates were preserved in the event of name clashes so we 
don't accidentally overwrite a pre-existing "good" photo by a blurry "bad" photo that happens to have the same name but 
came from a different device - camera, tablet, phone etc. That seems safer and offers the option later to go through and delete 
any actual duplicates or bad photos we don't want to keep.

## Pre-requisites

I am using the [Pillow](https://pillow.readthedocs.io/en/stable/index.html) library to extract the EXIF information from 
the images to more reliably categorise them by year they were taken. 

```shell
python3 -m pip install --user pillow
```

## Code

```python 
#!/usr/bin/env python3
"""
Copy still photos (JPG/JPEG/PNG) from a USB backup to a NAS folder organized by year,
including iPhone Live Photos by also copying paired .MOV files (same folder, same stem).

Features:
- Hybrid date fallback:
    1) EXIF DateTimeOriginal for JPG/JPEG (best for camera photos)
    2) macOS birth time (st_birthtime) if available
    3) filesystem modified time (st_mtime)
- Optional filtering by "source" folder tokens (e.g., "My Camera", "Laptop 5", "Tablet")
- De-dupe by SHA-256
- Destination de-dupe index caching in local SQLite to avoid re-hashing SMB/NAS files each run
- Progress output (Option A) while building destination de-dupe index
- Dry-run mode
"""

import argparse
import hashlib
import logging
import os
import re
import shutil
import sqlite3
import sys
import time
from datetime import datetime
from pathlib import Path

from PIL import Image, ExifTags

# ---------- What to collect ----------
STILL_EXTS = {".jpg", ".jpeg", ".png"}   # Still images to collect
LIVE_VIDEO_EXTS = {".mov"}              # Live Photo companion videos
ALL_EXTS = STILL_EXTS | LIVE_VIDEO_EXTS

# EXIF is typically meaningful for these (PNG usually not)
EXIF_CAPABLE = {".jpg", ".jpeg", ".tif", ".tiff"}

# ---------- EXIF helpers ----------
EXIF_NAME_TO_ID = {v: k for k, v in ExifTags.TAGS.items()}


# ---------- Logging ----------
def setup_logging(verbose: bool):
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(level=level, format="%(asctime)s %(levelname)s %(message)s")


# ---------- Hashing ----------
def sha256_file(path: Path, chunk_size: int = 1024 * 1024) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(chunk_size), b""):
            h.update(chunk)
    return h.hexdigest()


# ---------- Date extraction ----------
def parse_exif_datetime(exif) -> datetime | None:
    """
    Prefer DateTimeOriginal; then DateTimeDigitized; then DateTime.
    Common EXIF formats:
      - "YYYY:MM:DD HH:MM:SS"
      - sometimes "YYYY-MM-DD HH:MM:SS"
    """
    for key in ("DateTimeOriginal", "DateTimeDigitized", "DateTime"):
        tag_id = EXIF_NAME_TO_ID.get(key)
        if tag_id and tag_id in exif:
            val = exif.get(tag_id)
            if isinstance(val, bytes):
                try:
                    val = val.decode(errors="ignore")
                except Exception:
                    continue
            if isinstance(val, str):
                val = val.strip()
                for fmt in ("%Y:%m:%d %H:%M:%S", "%Y-%m-%d %H:%M:%S"):
                    try:
                        return datetime.strptime(val, fmt)
                    except ValueError:
                        pass
    return None


def get_macos_birthtime(path: Path) -> datetime | None:
    """
    macOS-only: filesystem creation time (birth time) if available.
    """
    try:
        st = path.stat()
        bt = getattr(st, "st_birthtime", None)  # exists on macOS
        if bt is None:
            return None
        return datetime.fromtimestamp(bt)
    except Exception as e:
        logging.debug("Birthtime read failed for %s: %s", path, e)
        return None


def photo_datetime_hybrid(path: Path) -> datetime:
    """
    Hybrid fallback order:
      1) EXIF (JPG/JPEG/TIFF)
      2) macOS birth time (creation time)
      3) modified time
    """
    ext = path.suffix.lower()

    # 1) EXIF where applicable
    if ext in EXIF_CAPABLE:
        try:
            with Image.open(path) as img:
                exif = img.getexif()
                if exif:
                    dt = parse_exif_datetime(exif)
                    if dt:
                        return dt
        except Exception as e:
            logging.debug("EXIF read failed for %s: %s", path, e)

    # 2) macOS birth time
    if sys.platform == "darwin":
        bt = get_macos_birthtime(path)
        if bt:
            return bt

    # 3) modified time
    return datetime.fromtimestamp(path.stat().st_mtime)


# ---------- Filtering by source tokens ----------
def normalize_sources(sources: list[str]) -> list[str]:
    return [s.strip().lower() for s in sources if s.strip()]


def matches_sources(path: Path, sources: list[str]) -> bool:
    """
    If sources provided, require the file path contains at least one token.
    Tokens can be regex if wrapped /.../ (case-insensitive).
    """
    if not sources:
        return True

    p_str = str(path).lower()
    for s in sources:
        if s.startswith("/") and s.endswith("/") and len(s) > 2:
            rx = s[1:-1]
            if re.search(rx, str(path), flags=re.IGNORECASE):
                return True
        else:
            if s in p_str:
                return True
    return False


# ---------- File discovery ----------
def iter_files(root: Path, sources: list[str]) -> list[Path]:
    out: list[Path] = []
    for p in root.rglob("*"):
        if p.is_file() and p.suffix.lower() in ALL_EXTS:
            if matches_sources(p, sources):
                out.append(p)
    return out


# ---------- Live Photo pairing ----------
def find_live_companion_mov(still_path: Path) -> Path | None:
    """
    For IMG_1234.JPG, look for IMG_1234.MOV/.mov in the same folder.
    """
    for ext in (".MOV", ".mov"):
        candidate = still_path.with_suffix(ext)
        if candidate.exists():
            return candidate
    return None


# ---------- Destination name collision handling ----------
def ensure_unique_name(dest_dir: Path, name: str) -> Path:
    dest = dest_dir / name
    if not dest.exists():
        return dest

    stem = Path(name).stem
    suf = Path(name).suffix
    i = 1
    while True:
        candidate = dest_dir / f"{stem}_{i:03d}{suf}"
        if not candidate.exists():
            return candidate
        i += 1


# ---------- SQLite hash cache for destination ----------
def default_cache_path_for_dest(dest_root: Path) -> Path:
    """
    Create a per-destination cache path to avoid collisions if you use multiple NAS mounts.
    """
    # stable identifier from absolute dest path
    ident = hashlib.sha1(str(dest_root).encode("utf-8")).hexdigest()[:10]
    return Path("~/.cache/photo_dedupe").expanduser() / f"hashcache_{ident}.sqlite"


def cache_init(conn: sqlite3.Connection):
    conn.execute("""
        CREATE TABLE IF NOT EXISTS file_hashes (
            rel_path TEXT PRIMARY KEY,
            size INTEGER NOT NULL,
            mtime REAL NOT NULL,
            sha256 TEXT NOT NULL,
            last_seen_run INTEGER NOT NULL
        )
    """)
    conn.execute("CREATE INDEX IF NOT EXISTS idx_last_seen ON file_hashes(last_seen_run)")
    conn.commit()


def build_dest_hash_index_cached(
    dest_root: Path,
    cache_path: Path,
    progress_every: int = 500,
    commit_every: int = 1000,
    rebuild: bool = False,
    prune: bool = True,
) -> set[str]:
    """
    Build dedupe hash index for destination using a local SQLite cache to avoid
    re-hashing unchanged files over SMB.

    Cache key: relative path (to dest_root)
    Change detection: (size, mtime)
    """
    idx: set[str] = set()
    if not dest_root.exists():
        return idx

    cache_path.parent.mkdir(parents=True, exist_ok=True)
    logging.info("Scanning destination to build dedupe index (with cache): %s", cache_path)

    # Build file list for %/ETA
    files: list[Path] = []
    for p in dest_root.rglob("*"):
        if p.is_file() and p.suffix.lower() in ALL_EXTS:
            files.append(p)

    total = len(files)
    if total == 0:
        logging.info("No existing destination files found to index.")
        return idx

    run_id = int(time.time())

    conn = sqlite3.connect(str(cache_path))
    try:
        # Speed-friendly PRAGMAs (fine for a rebuildable cache)
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("PRAGMA synchronous=NORMAL;")
        conn.execute("PRAGMA temp_store=MEMORY;")
        conn.execute("PRAGMA cache_size=-20000;")  # ~20MB (negative means KB)
        conn.execute("PRAGMA busy_timeout=5000;")

        cache_init(conn)

        if rebuild:
            logging.warning("Rebuilding hash cache: forcing re-hash of all destination files.")
            conn.execute("DELETE FROM file_hashes")
            conn.commit()

        # Prepared cursors/statements
        cur_get = conn.cursor()
        cur_upsert = conn.cursor()
        cur_seen = conn.cursor()

        sql_get = "SELECT size, mtime, sha256 FROM file_hashes WHERE rel_path = ?"
        sql_seen = "UPDATE file_hashes SET last_seen_run = ? WHERE rel_path = ?"
        sql_upsert = """
            INSERT INTO file_hashes(rel_path, size, mtime, sha256, last_seen_run)
            VALUES(?,?,?,?,?)
            ON CONFLICT(rel_path) DO UPDATE SET
                size=excluded.size,
                mtime=excluded.mtime,
                sha256=excluded.sha256,
                last_seen_run=excluded.last_seen_run
        """

        logging.info("Indexing %d destination files (rehash only if changed)...", total)

        start = time.time()
        hashed = 0
        reused = 0
        pending_writes = 0

        conn.execute("BEGIN")
        for i, p in enumerate(files, start=1):
            try:
                st = p.stat()
                size = int(st.st_size)
                mtime = float(st.st_mtime)

                rel_path = str(p.relative_to(dest_root))

                row = cur_get.execute(sql_get, (rel_path,)).fetchone()
                if row is not None:
                    cached_size, cached_mtime, cached_sha = row
                    if int(cached_size) == size and float(cached_mtime) == mtime:
                        # unchanged -> reuse cached hash
                        idx.add(cached_sha)
                        cur_seen.execute(sql_seen, (run_id, rel_path))
                        reused += 1
                        pending_writes += 1
                    else:
                        # changed -> rehash
                        sha = sha256_file(p)
                        idx.add(sha)
                        cur_upsert.execute(sql_upsert, (rel_path, size, mtime, sha, run_id))
                        hashed += 1
                        pending_writes += 1
                else:
                    # new -> hash + cache
                    sha = sha256_file(p)
                    idx.add(sha)
                    cur_upsert.execute(sql_upsert, (rel_path, size, mtime, sha, run_id))
                    hashed += 1
                    pending_writes += 1

            except Exception as e:
                logging.debug("Failed indexing %s: %s", p, e)

            # Batch commits for speed
            if pending_writes >= commit_every:
                conn.commit()
                conn.execute("BEGIN")
                pending_writes = 0

            # Option A progress
            if i % progress_every == 0 or i == total:
                now = time.time()
                elapsed = now - start
                rate = i / elapsed if elapsed > 0 else 0.0
                remaining = total - i
                eta = remaining / rate if rate > 0 else 0.0

                eta_h = int(eta // 3600)
                eta_m = int((eta % 3600) // 60)
                eta_s = int(eta % 60)
                pct = (i / total) * 100

                logging.info(
                    "Indexing: %d/%d (%.1f%%) — %.1f files/s — ETA %02d:%02d:%02d (reused=%d, hashed=%d)",
                    i, total, pct, rate, eta_h, eta_m, eta_s, reused, hashed
                )

        conn.commit()

        if prune:
            conn.execute("BEGIN")
            conn.execute("DELETE FROM file_hashes WHERE last_seen_run <> ?", (run_id,))
            conn.commit()

        logging.info("Destination index ready: %d hashes (reused=%d, hashed=%d)", len(idx), reused, hashed)
        return idx

    finally:
        conn.close()


# ---------- Copy with dedupe ----------
def copy_one(src: Path, dest_dir: Path, dedupe_index: set[str], dry_run: bool) -> bool:
    """
    Copy src into dest_dir with SHA-256 dedupe and safe collision handling.
    Returns True if copied, False if skipped.
    """
    h = sha256_file(src)
    if h in dedupe_index:
        logging.info("SKIP duplicate (hash): %s", src)
        return False

    dest_dir.mkdir(parents=True, exist_ok=True)

    tentative = dest_dir / src.name
    if tentative.exists():
        # If same filename exists, skip if identical; else use a unique name.
        # (Only hashes the colliding dest file — typically rare.)
        try:
            if sha256_file(tentative) == h:
                logging.info("SKIP already exists identical: %s -> %s", src, tentative)
                dedupe_index.add(h)
                return False
        except Exception:
            pass

    dest_path = ensure_unique_name(dest_dir, src.name)
    logging.info("%s %s -> %s", "DRYRUN copy" if dry_run else "COPY", src, dest_path)

    if not dry_run:
        shutil.copy2(src, dest_path)  # preserves timestamps

    dedupe_index.add(h)
    return True


# ---------- Main ----------
def main():
    ap = argparse.ArgumentParser(
        description="Copy photos from USB to NAS by year, include iPhone Live Photo MOVs, with SMB hash caching."
    )
    ap.add_argument("--source", required=True, help="USB root folder, e.g. /Volumes/USB_DRIVE")
    ap.add_argument("--dest", required=True, help="NAS destination root, e.g. /Volumes/VolumeXX/photo")

    ap.add_argument(
        "--source-name",
        action="append",
        default=[],
        help="Include only files whose path contains this token (repeatable). Regex if wrapped /.../.",
    )

    ap.add_argument("--dry-run", action="store_true", help="Print actions without copying.")
    ap.add_argument("--verbose", action="store_true", help="Verbose logging.")
    ap.add_argument("--skip-dest-index", action="store_true",
                    help="Skip building destination dedupe index (faster start, weaker dedupe across runs).")

    # Hash cache options
    ap.add_argument("--hash-cache", default=None,
                    help="Path to local SQLite hash cache (default: per-destination under ~/.cache/photo_dedupe/)")
    ap.add_argument("--rebuild-hash-cache", action="store_true",
                    help="Force re-hashing all destination files and rebuild the cache.")
    ap.add_argument("--no-prune-hash-cache", action="store_true",
                    help="Do not prune cache entries for missing destination files.")
    ap.add_argument("--progress-every", type=int, default=500,
                    help="Progress report interval while indexing destination (default: 500)")
    ap.add_argument("--commit-every", type=int, default=1000,
                    help="SQLite commit interval while indexing destination (default: 1000)")

    args = ap.parse_args()
    setup_logging(args.verbose)

    source_root = Path(args.source).expanduser().resolve()
    dest_root = Path(args.dest).expanduser().resolve()

    if not source_root.exists():
        raise SystemExit(f"Source not found: {source_root}")
    if not dest_root.exists():
        raise SystemExit(f"Destination not found (is NAS mounted?): {dest_root}")

    sources = normalize_sources(args.source_name)

    logging.info("Source root: %s", source_root)
    logging.info("Dest root:   %s", dest_root)
    if sources:
        logging.info("Including only paths matching: %s", sources)
    else:
        logging.info("No source-name filters set; scanning all matching files under source.")

    # Build destination dedupe hash index (with caching)
    dedupe_index: set[str] = set()
    if not args.skip_dest_index:
        cache_path = (
            Path(args.hash_cache).expanduser().resolve()
            if args.hash_cache
            else default_cache_path_for_dest(dest_root)
        )
        dedupe_index = build_dest_hash_index_cached(
            dest_root=dest_root,
            cache_path=cache_path,
            progress_every=max(1, args.progress_every),
            commit_every=max(1, args.commit_every),
            rebuild=args.rebuild_hash_cache,
            prune=not args.no_prune_hash_cache,
        )
    else:
        logging.warning("Skipping destination dedupe index. Dedupe will only work within this run.")

    # Scan source
    candidates = iter_files(source_root, sources)
    stills = [p for p in candidates if p.suffix.lower() in STILL_EXTS]
    logging.info("Found %d still candidates (JPG/JPEG/PNG)", len(stills))

    copied = 0
    skipped = 0
    paired_mov_copied = 0

    for p in sorted(stills):
        try:
            dt = photo_datetime_hybrid(p)
            year_dir = dest_root / str(dt.year)

            if copy_one(p, year_dir, dedupe_index, args.dry_run):
                copied += 1
            else:
                skipped += 1

            # Live Photo pairing: if JPG/JPEG, copy paired MOV into same year folder
            if p.suffix.lower() in {".jpg", ".jpeg"}:
                mov = find_live_companion_mov(p)
                if mov:
                    if copy_one(mov, year_dir, dedupe_index, args.dry_run):
                        paired_mov_copied += 1

        except Exception as e:
            logging.error("Failed processing %s: %s", p, e)

    logging.info(
        "Done. Copied stills=%d, Skipped stills=%d, Paired MOVs copied=%d",
        copied, skipped, paired_mov_copied
    )


if __name__ == "__main__":
    main()

```

Because the photos are scattered across all creation, I added subfolders to search through to find images rather than scanning the entire drive. 

```shell

python3 copy_photos_by_year.py \
  --source "/Volumes/YourUSB" \
  --dest "/Volumes/VolumeXX/photo" \
  --source-name "My Camera" \
  --source-name "Laptop 5" \
  --source-name "Tablet" \
  --dry-run

```
