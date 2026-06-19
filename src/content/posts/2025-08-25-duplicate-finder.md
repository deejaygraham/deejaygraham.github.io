---
title: Finding Duplicates
tags: [code, microbit, python]
---

I have several spare hard drives which contain multiple back up copies of the same files - pdfs, photos, etc. - in different nested 
folders. I wanted to write a python script I can run to find which are duplicates based on name, date, hash> I want to rationalise the files 
on my NAS drives and want to decide which ones I want to keep and which to delete.

I was writing this "blind" on a Windows machine but needed to run it on an iMac under macos, and also against a number of portable hard drives
so I was not sure how the script would perform against this combination of OS and drive technologies (I had SDD and HDDs in my stack of backups). 
I decided to provide more finding options so that I can tweak them when running the script and experiment which is the best performance 
or accuracy for each drive type.

## Duplication

There are several ways to detect duplicate files: by name, by file size, by content (hash). Obviously, different files can have the same name 
and different files can have the same file size. Naming is relatively fast but can be hit-and-miss. Alternatively, generating a hash of the file 
content is more robust but is expensive to perform for every file if there are a lot of files on a drive. 

I added multiple detection methods so that I could mix and match. The default method matches on size and then attempts to calculate a hash for 
files that are potential duplicates of one another. 

The output details file size and modification date to help in deciding which are duplicates and which could be the most up to date version of a file. 
An important feature I discovered early on (as we always do with handling a lot of files on disk) was better error handling, I needed the script to 
continue working even if some files are locked, corrupt or inaccessible.

## Options

The default detection method is what I expect to be the most efficient, it checks file size first, then hashes only potential duplicates

```bash
python duplicate_finder.py /path/to/your/drive 
```

I added name only checking if things got too slow but expected there to be many false hits

```bash
python duplicate_finder.py /path/to/your/drive --method name
```

Identifying by name and size should be more accurate and maybe the best compromise depending on the conditions.

```bash
python duplicate_finder.py /path/to/your/drive --method size-name
```

Fully identifying by hash is going to be the most accurate but also the slowest so I save this for any drives I 
discover have low content count or are super fast

```bash
python duplicate_finder.py /path/to/your/drive --method hash --hash-algo sha256
```

## Code


### duplicates_finder.py

```python
#!/usr/bin/env python3

import os
import hashlib
import argparse
from collections import defaultdict
from pathlib import Path
import time

def get_file_hash(filepath, hash_algo='md5', chunk_size=8192):
    hash_obj = hashlib.new(hash_algo)
    try:
        with open(filepath, 'rb') as f:
            while chunk := f.read(chunk_size):
                hash_obj.update(chunk)
        return hash_obj.hexdigest()
    except (IOError, OSError) as e:
        print(f"Error reading {filepath}: {e}")
        return None

def find_duplicates_by_name(root_path):
    """Find files with same name (case-insensitive)"""
    print("Finding duplicates by name...")
    file_map = defaultdict(list)
    
    for root, dirs, files in os.walk(root_path):
        for file in files:
            filepath = os.path.join(root, file)
            name_key = file.lower()  # Case-insensitive
            file_map[name_key].append(filepath)
    
    # Return only files that have duplicates
    return {name: paths for name, paths in file_map.items() if len(paths) > 1}

def find_duplicates_by_size_and_name(root_path):
    """Find files with same name and size"""
    print("Finding duplicates by size and name...")
    file_map = defaultdict(list)
    
    for root, dirs, files in os.walk(root_path):
        for file in files:
            filepath = os.path.join(root, file)
            try:
                size = os.path.getsize(filepath)
                key = (file.lower(), size)
                file_map[key].append(filepath)
            except OSError as e:
                print(f"Error accessing {filepath}: {e}")
    
    return {f"{name} ({size} bytes)": paths for (name, size), paths in file_map.items() if len(paths) > 1}

def find_duplicates_by_hash(root_path, hash_algo='md5'):
    """Find files with identical content (by hash)"""
    print("Calculating file hashes... This may take a while for large files.")
    file_map = defaultdict(list)
    processed = 0
    
    for root, dirs, files in os.walk(root_path):
        for file in files:
            filepath = os.path.join(root, file)
            file_hash = get_file_hash(filepath, hash_algo)
            
            if file_hash:
                file_map[file_hash].append(filepath)
                processed += 1
                if processed % 100 == 0:
                    print(f"Processed {processed} files...")
    
    return {hash_val: paths for hash_val, paths in file_map.items() if len(paths) > 1}

def find_smart_duplicates(root_path):
    """Smart duplicate detection: same size first, then hash only those"""
    print("Phase 1: Grouping files by size...")
    file_map = defaultdict(list)
    
    for root, dirs, files in os.walk(root_path):
        for file in files:
            filepath = os.path.join(root, file)
            try:
                size = os.path.getsize(filepath)
                file_map[size].append(filepath)
            except OSError as e:
                print(f"Error accessing {filepath}: {e}")
    
    # Only hash files that have the same size
    potential_duplicates = {size: paths for size, paths in file_map.items() if len(paths) > 1}
    
    print("Phase 2: Calculating hashes for potential duplicates...")
    file_map = defaultdict(list)
    
    for size, paths in potential_duplicates.items():
        print(f"Checking {len(paths)} files of size {size} bytes...")
        for filepath in paths:
            file_hash = get_file_hash(filepath)
            if file_hash:
                file_map[file_hash].append(filepath)
    
    return {hash_val: paths for hash_val, paths in file_map.items() if len(paths) > 1}

def display_results(duplicates, title):
    """Display duplicate results in a readable format"""
    print(f"\n{'='*60}")
    print(f"{title}")
    print(f"{'='*60}")
    
    if not duplicates:
        print("No duplicates found!")
        return
    
    total_groups = len(duplicates)
    total_files = sum(len(paths) for paths in duplicates.values())
    
    print(f"Found {total_groups} groups of duplicates containing {total_files} files total\n")
    
    for i, (key, paths) in enumerate(duplicates.items(), 1):
        print(f"Group {i} ({len(paths)} files):")
        for j, path in enumerate(paths, 1):
            try:
                size = os.path.getsize(path)
                mtime = time.ctime(os.path.getmtime(path))
                print(f"  {j}. {path}")
                print(f"     Size: {size:,} bytes | Modified: {mtime}")
            except OSError as e:
                print(f"  {j}. {path} (Error: {e})")
        print()

def main():
    parser = argparse.ArgumentParser(description='Find duplicate files')
    parser.add_argument('path', help='Root directory to search')
    parser.add_argument('--method', choices=['name', 'size-name', 'hash', 'smart'], 
                       default='smart', help='Method to find duplicates')
    parser.add_argument('--hash-algo', choices=['md5', 'sha1', 'sha256'], 
                       default='md5', help='Hash algorithm to use')
    
    args = parser.parse_args()
    
    if not os.path.isdir(args.path):
        print(f"Error: {args.path} is not a valid directory")
        return
    
    print(f"Searching for duplicates in: {args.path}")
    
    if args.method == 'name':
        duplicates = find_duplicates_by_name(args.path)
        display_results(duplicates, "DUPLICATES BY NAME")
        
    elif args.method == 'size-name':
        duplicates = find_duplicates_by_size_and_name(args.path)
        display_results(duplicates, "DUPLICATES BY NAME AND SIZE")
        
    elif args.method == 'hash':
        duplicates = find_duplicates_by_hash(args.path, args.hash_algo)
        display_results(duplicates, f"DUPLICATES BY {args.hash_algo.upper()} HASH")
        
    elif args.method == 'smart':
        duplicates = find_smart_duplicates(args.path)
        display_results(duplicates, "DUPLICATES BY CONTENT (SMART METHOD)")

if __name__ == "__main__":
    main()
```
