#!/usr/bin/env python3

"""
Music Metadata Checker
Scans a music library organized by Artist/Album/Files structure
and identifies missing metadata and album art.

Requirements:
pip install mutagen pillow

Usage:
python check-album-metadata.py /path/to/music/folder
"""

import os
import sys
import json
import csv
from pathlib import Path
from collections import defaultdict
from datetime import datetime

try:
    from mutagen import File
    from mutagen.id3 import ID3NoHeaderError
    from mutagen.mp3 import MP3
    from mutagen.flac import FLAC
    from mutagen.mp4 import MP4
    from mutagen.oggvorbis import OggVorbis
    from PIL import Image
    import io
except ImportError as e:
    print(f"Missing required library: {e}")
    print("Please install with: pip install mutagen pillow")
    sys.exit(1)

class MusicMetadataChecker:
    def __init__(self, root_path):
        self.root_path = Path(root_path)
        self.supported_formats = {'.mp3', '.flac', '.m4a', '.ogg', '.wma'}
        self.issues = []
        self.stats = {
            'total_files': 0,
            'total_albums': 0,
            'files_with_issues': 0,
            'albums_with_issues': 0
        }
        
    def extract_metadata(self, file_path):
        """Extract metadata from audio file"""
        try:
            audio_file = File(file_path)
            if audio_file is None:
                return None
                
            metadata = {
                'title': None,
                'artist': None,
                'album': None,
                'albumartist': None,
                'date': None,
                'genre': None,
                'track': None,
                'has_artwork': False,
                'artwork_count': 0
            }
            
            # Handle different file formats
            if isinstance(audio_file, MP3):
                metadata.update(self._extract_id3_metadata(audio_file))
            elif isinstance(audio_file, FLAC):
                metadata.update(self._extract_flac_metadata(audio_file))
            elif isinstance(audio_file, MP4):
                metadata.update(self._extract_mp4_metadata(audio_file))
            elif isinstance(audio_file, OggVorbis):
                metadata.update(self._extract_ogg_metadata(audio_file))
                
            return metadata
            
        except Exception as e:
            return {'error': str(e)}
    
    def _extract_id3_metadata(self, audio_file):
        """Extract metadata from MP3 ID3 tags"""
        metadata = {}
        
        # Basic tags
        metadata['title'] = str(audio_file.get('TIT2', [''])[0]) if audio_file.get('TIT2') else None
        metadata['artist'] = str(audio_file.get('TPE1', [''])[0]) if audio_file.get('TPE1') else None
        metadata['album'] = str(audio_file.get('TALB', [''])[0]) if audio_file.get('TALB') else None
        metadata['albumartist'] = str(audio_file.get('TPE2', [''])[0]) if audio_file.get('TPE2') else None
        metadata['date'] = str(audio_file.get('TDRC', [''])[0]) if audio_file.get('TDRC') else None
        metadata['genre'] = str(audio_file.get('TCON', [''])[0]) if audio_file.get('TCON') else None
        metadata['track'] = str(audio_file.get('TRCK', [''])[0]) if audio_file.get('TRCK') else None
        
        # Check for artwork
        artwork_tags = ['APIC:', 'APIC:Cover (front)', 'APIC:Cover (back)']
        artwork_count = sum(1 for tag in artwork_tags if tag in audio_file.tags)
        metadata['has_artwork'] = artwork_count > 0
        metadata['artwork_count'] = artwork_count
        
        return metadata
    
    def _extract_flac_metadata(self, audio_file):
        """Extract metadata from FLAC files"""
        metadata = {}
        
        metadata['title'] = audio_file.get('TITLE', [None])[0]
        metadata['artist'] = audio_file.get('ARTIST', [None])[0]
        metadata['album'] = audio_file.get('ALBUM', [None])[0]
        metadata['albumartist'] = audio_file.get('ALBUMARTIST', [None])[0]
        metadata['date'] = audio_file.get('DATE', [None])[0]
        metadata['genre'] = audio_file.get('GENRE', [None])[0]
        metadata['track'] = audio_file.get('TRACKNUMBER', [None])[0]
        
        # Check for artwork
        metadata['has_artwork'] = len(audio_file.pictures) > 0
        metadata['artwork_count'] = len(audio_file.pictures)
        
        return metadata
    
    def _extract_mp4_metadata(self, audio_file):
        """Extract metadata from MP4/M4A files"""
        metadata = {}
        
        metadata['title'] = audio_file.get('\xa9nam', [None])[0]
        metadata['artist'] = audio_file.get('\xa9ART', [None])[0]
        metadata['album'] = audio_file.get('\xa9alb', [None])[0]
        metadata['albumartist'] = audio_file.get('aART', [None])[0]
        metadata['date'] = audio_file.get('\xa9day', [None])[0]
        metadata['genre'] = audio_file.get('\xa9gen', [None])[0]
        metadata['track'] = str(audio_file.get('trkn', [None])[0]) if audio_file.get('trkn') else None
        
        # Check for artwork
        metadata['has_artwork'] = 'covr' in audio_file
        metadata['artwork_count'] = len(audio_file.get('covr', [])) if 'covr' in audio_file else 0
        
        return metadata
    
    def _extract_ogg_metadata(self, audio_file):
        """Extract metadata from OGG files"""
        metadata = {}
        
        metadata['title'] = audio_file.get('TITLE', [None])[0]
        metadata['artist'] = audio_file.get('ARTIST', [None])[0]
        metadata['album'] = audio_file.get('ALBUM', [None])[0]
        metadata['albumartist'] = audio_file.get('ALBUMARTIST', [None])[0]
        metadata['date'] = audio_file.get('DATE', [None])[0]
        metadata['genre'] = audio_file.get('GENRE', [None])[0]
        metadata['track'] = audio_file.get('TRACKNUMBER', [None])[0]
        
        # OGG artwork is complex, simplified check
        metadata['has_artwork'] = False  # Would need more complex implementation
        metadata['artwork_count'] = 0
        
        return metadata
    
    def check_file(self, file_path):
        """Check a single file for metadata issues"""
        if file_path.suffix.lower() not in self.supported_formats:
            return None
            
        self.stats['total_files'] += 1
        metadata = self.extract_metadata(file_path)
        
        if metadata is None or 'error' in metadata:
            issue = {
                'type': 'file',
                'path': str(file_path),
                'artist_folder': file_path.parent.parent.name,
                'album_folder': file_path.parent.name,
                'filename': file_path.name,
                'issues': ['Cannot read file or unsupported format'],
                'metadata': metadata
            }
            self.issues.append(issue)
            self.stats['files_with_issues'] += 1
            return issue
        
        issues_found = []
        
        # Check for missing essential metadata
        if not metadata.get('title'):
            issues_found.append('Missing title')
        if not metadata.get('artist'):
            issues_found.append('Missing artist')
        if not metadata.get('album'):
            issues_found.append('Missing album')
        if not metadata.get('track'):
            issues_found.append('Missing track number')
        if not metadata.get('has_artwork'):
            issues_found.append('Missing album art')
        
        # Optional but recommended metadata
        if not metadata.get('date'):
            issues_found.append('Missing date/year')
        if not metadata.get('genre'):
            issues_found.append('Missing genre')
        
        if issues_found:
            issue = {
                'type': 'file',
                'path': str(file_path),
                'artist_folder': file_path.parent.parent.name,
                'album_folder': file_path.parent.name,
                'filename': file_path.name,
                'issues': issues_found,
                'metadata': metadata
            }
            self.issues.append(issue)
            self.stats['files_with_issues'] += 1
            return issue
        
        return None
    
    def check_album_folder(self, album_path):
        """Check all files in an album folder"""
        self.stats['total_albums'] += 1
        album_issues = []
        
        audio_files = [f for f in album_path.iterdir() 
                      if f.is_file() and f.suffix.lower() in self.supported_formats]
        
        if not audio_files:
            album_issues.append('No audio files found')
            
        # Check for common album art files
        art_files = [f for f in album_path.iterdir() 
                    if f.is_file() and f.suffix.lower() in {'.jpg', '.jpeg', '.png', '.bmp'}]
        
        has_external_art = len(art_files) > 0
        files_with_embedded_art = 0
        
        for audio_file in audio_files:
            file_issue = self.check_file(audio_file)
            if file_issue and 'Missing album art' not in file_issue['issues']:
                files_with_embedded_art += 1
        
        # Album-level checks
        if not has_external_art and files_with_embedded_art == 0:
            album_issues.append('No album art (embedded or external)')
        
        if album_issues:
            issue = {
                'type': 'album',
                'path': str(album_path),
                'artist_folder': album_path.parent.name,
                'album_folder': album_path.name,
                'issues': album_issues,
                'file_count': len(audio_files),
                'art_file_count': len(art_files)
            }
            self.issues.append(issue)
            self.stats['albums_with_issues'] += 1
    
    def scan_library(self):
        """Scan the entire music library"""
        print(f"Scanning music library: {self.root_path}")
        
        if not self.root_path.exists():
            print(f"Error: Path does not exist: {self.root_path}")
            return
        
        # Assume structure: Artist/Album/Files
        for artist_folder in self.root_path.iterdir():
            if not artist_folder.is_dir():
                continue
                
            print(f"Scanning artist: {artist_folder.name}")
            
            for album_folder in artist_folder.iterdir():
                if not album_folder.is_dir():
                    continue
                    
                print(f"  Album: {album_folder.name}")
                self.check_album_folder(album_folder)
    
    def generate_report(self, output_format='txt'):
        """Generate a report of issues found"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        if output_format == 'json':
            report_file = f"music_issues_report_{timestamp}.json"
            with open(report_file, 'w', encoding='utf-8') as f:
                json.dump({
                    'stats': self.stats,
                    'issues': self.issues,
                    'scan_date': datetime.now().isoformat()
                }, f, indent=2, ensure_ascii=False)
        
        elif output_format == 'csv':
            report_file = f"music_issues_report_{timestamp}.csv"
            with open(report_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(['Type', 'Artist', 'Album', 'Filename', 'Issues', 'Path'])
                
                for issue in self.issues:
                    writer.writerow([
                        issue['type'],
                        issue['artist_folder'],
                        issue['album_folder'],
                        issue.get('filename', ''),
                        '; '.join(issue['issues']),
                        issue['path']
                    ])
        
        else:  # txt format
            report_file = f"music_issues_report_{timestamp}.txt"
            with open(report_file, 'w', encoding='utf-8') as f:
                f.write("MUSIC LIBRARY METADATA REPORT\n")
                f.write("=" * 50 + "\n\n")
                
                f.write(f"Scan Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write(f"Library Path: {self.root_path}\n\n")
                
                f.write("STATISTICS:\n")
                f.write(f"Total Files Scanned: {self.stats['total_files']}\n")
                f.write(f"Total Albums Scanned: {self.stats['total_albums']}\n")
                f.write(f"Files with Issues: {self.stats['files_with_issues']}\n")
                f.write(f"Albums with Issues: {self.stats['albums_with_issues']}\n\n")
                
                if self.issues:
                    f.write("ISSUES FOUND:\n")
                    f.write("-" * 30 + "\n\n")
                    
                    for issue in self.issues:
                        f.write(f"Type: {issue['type'].upper()}\n")
                        f.write(f"Artist: {issue['artist_folder']}\n")
                        f.write(f"Album: {issue['album_folder']}\n")
                        
                        if issue['type'] == 'file':
                            f.write(f"File: {issue['filename']}\n")
                        
                        f.write(f"Issues: {', '.join(issue['issues'])}\n")
                        f.write(f"Path: {issue['path']}\n")
                        f.write("-" * 50 + "\n\n")
                else:
                    f.write("No issues found! Your music library metadata looks good.\n")
        
        print(f"\nReport generated: {report_file}")
        return report_file

def main():
    if len(sys.argv) != 2:
        print("Usage: python music_checker.py <music_folder_path>")
        print("Example: python music_checker.py /path/to/music")
        print("         python music_checker.py \\\\server\\music")
        sys.exit(1)
    
    music_path = sys.argv[1]
    checker = MusicMetadataChecker(music_path)
    
    print("Starting music library scan...")
    checker.scan_library()
    
    print(f"\nScan complete!")
    print(f"Files scanned: {checker.stats['total_files']}")
    print(f"Albums scanned: {checker.stats['total_albums']}")
    print(f"Issues found: {checker.stats['files_with_issues']} files, {checker.stats['albums_with_issues']} albums")
    
    # Generate reports in multiple formats
    checker.generate_report('txt')
    checker.generate_report('csv')
    checker.generate_report('json')

if __name__ == "__main__":
    main()
