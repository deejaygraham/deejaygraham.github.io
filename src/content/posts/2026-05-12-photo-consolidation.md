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

```terminal
python3 -m pip install --user pillow
```

## Code

```python 
#!/usr/bin/env python3
import argparse
import hashlib
import logging
import os
import re
import shutil
import sys

from datetime import datetime
from pathlib import Path

from PIL import Image, ExifTags

JPG_EXTS = {".jpg", ".jpeg"}
EXIF_NAME_TO_ID = {v: k for k, v in ExifTags.TAGS.items()}

def setup_logging(verbose: bool):
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(level=level, format="%(asctime)s %(levelname)s %(message)s")

def parse_exif_datetime(exif) -> datetime | None:
    """
    Prefer DateTimeOriginal; then DateTimeDigitized; then DateTime.
    EXIF format is usually 'YYYY:MM:DD HH:MM:SS'
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
    macOS-only: returns filesystem creation/birth time if available.
    - On macOS, os.stat_result has st_birthtime.
    - On other platforms/filesystems it may not exist -> None.
    """
    try:
        st = path.stat()
        # st_birthtime exists on macOS; may not exist elsewhere.
        bt = getattr(st, "st_birthtime", None)
        if bt is None:
            return None
        return datetime.fromtimestamp(bt)
    except Exception as e:
        logging.debug("Birthtime read failed for %s: %s", path, e)
        return None

def photo_datetime(path: Path) -> datetime:
    """
    Hybrid fallback order:
    1) EXIF DateTimeOriginal (photo taken)
    2) macOS st_birthtime (file created)
    3) st_mtime (modified)
    """
    # 1) EXIF
    try:
        with Image.open(path) as img:
            exif = img.getexif()
            if exif:
                dt = parse_exif_datetime(exif)
                if dt:
                    return dt
    except Exception as e:
        logging.debug("EXIF read failed for %s: %s", path, e)

    # 2) macOS creation time
    if sys.platform == "darwin":
        bt = get_macos_birthtime(path)
        if bt:
            return bt

    # 3) modified time fallback
    return datetime.fromtimestamp(path.stat().st_mtime)

def sha256_file(path: Path, chunk_size: int = 1024 * 1024) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(chunk_size), b""):
            h.update(chunk)
    return h.hexdigest()

def normalize_sources(sources: list[str]) -> list[str]:
    # Normalize input for case-insensitive matching
    return [s.strip().lower() for s in sources if s.strip()]

def matches_sources(path: Path, sources: list[str]) -> bool:
    """
    Match if the full path contains one of the provided source tokens.
    - Case-insensitive substring match by default.
    - Regex supported if source is wrapped like /.../
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

def iter_jpgs(root: Path, sources: list[str]) -> list[Path]:
    out = []
    for p in root.rglob("*"):
        if p.is_file() and p.suffix.lower() in JPG_EXTS:
            if matches_sources(p, sources):
                out.append(p)
    return out

def build_dest_hash_index(dest_root: Path) -> set[str]:
    """
    Build hashes for existing destination files to prevent duplicates across runs.
    Can be slow for very large libraries, but very effective.
    """
    idx = set()
    if not dest_root.exists():
        return idx

    logging.info("Indexing destination for dedupe (hashing existing JPGs)...")
    for p in dest_root.rglob("*"):
        if p.is_file() and p.suffix.lower() in JPG_EXTS:
            try:
                idx.add(sha256_file(p))
            except Exception as e:
                logging.debug("Failed hashing %s: %s", p, e)
    logging.info("Indexed %d existing destination photos", len(idx))
    return idx

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

def copy_one(src: Path, dest_year_dir: Path, dedupe_index: set[str], dry_run: bool) -> bool:
    h = sha256_file(src)
    if h in dedupe_index:
        logging.info("SKIP duplicate (hash): %s", src)
        return False

    dest_year_dir.mkdir(parents=True, exist_ok=True)

    # If a same-named file exists, compare hashes; else create unique name
    tentative = dest_year_dir / src.name
    if tentative.exists():
        try:
            existing_hash = sha256_file(tentative)
            if existing_hash == h:
                logging.info("SKIP already exists identical: %s -> %s", src, tentative)
                dedupe_index.add(h)
                return False
        except Exception:
            pass

    dest_path = ensure_unique_name(dest_year_dir, src.name)
    logging.info("%s %s -> %s", "DRYRUN copy" if dry_run else "COPY", src, dest_path)

    if not dry_run:
        shutil.copy2(src, dest_path)  # preserves timestamps

    dedupe_index.add(h)
    return True

def main():
    ap = argparse.ArgumentParser(description="Copy JPGs from USB backup folders to NAS organized by year.")
    ap.add_argument("--source", required=True, help="USB root folder, e.g. /Volumes/USB_DRIVE")
    ap.add_argument("--dest", required=True, help="NAS destination root, e.g. /Volumes/VolumeXX/photo")
    ap.add_argument("--source-name", action="append", default=[],
                    help="Source folder identifier to include (repeatable). Substring match or regex /.../.")
    ap.add_argument("--skip-dest-index", action="store_true",
                    help="Skip hashing existing destination (faster startup, weaker dedupe across runs).")
    ap.add_argument("--dry-run", action="store_true", help="Print actions without copying.")
    ap.add_argument("--verbose", action="store_true", help="Verbose logging.")
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
        logging.info("Including only photos matching source identifiers: %s", sources)
    else:
        logging.info("No source identifiers provided; scanning all JPG/JPEG files.")

    dedupe_index = set()
    if not args.skip_dest_index:
        dedupe_index = build_dest_hash_index(dest_root)

    candidates = iter_jpgs(source_root, sources)
    logging.info("Found %d JPG/JPEG candidates", len(candidates))

    copied = 0
    skipped = 0

    for p in sorted(candidates):
        try:
            dt = photo_datetime(p)
            year_dir = dest_root / str(dt.year)
            if copy_one(p, year_dir, dedupe_index, args.dry_run):
                copied += 1
            else:
                skipped += 1
        except Exception as e:
            logging.error("Failed processing %s: %s", p, e)

    logging.info("Done. Copied=%d Skipped=%d", copied, skipped)

if __name__ == "__main__":
    main()

```

Because the photos are scattered across all creation, I added subfolders to search through to find images rather than scanning the entire drive. 

```terminal

python3 copy_photos_by_year.py \
  --source "/Volumes/YourUSB" \
  --dest "/Volumes/VolumeXX/photo" \
  --source-name "My Camera" \
  --source-name "Laptop 5" \
  --source-name "Tablet" \
  --dry-run

```
