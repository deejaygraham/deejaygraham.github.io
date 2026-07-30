---
title: Local Podcast Serving
tags: [python, macos]
---

Over a long time I have built up a library of audiobooks as mp3s but I've never really found a good audiobook application that works with the way I want to 
have things setup on my home network. I store the mp3s on a NAS and applications for iOS don't seem to work well with this without making at least one copy 
of the files as well as forgetting my place if I don't stop at the end of one file. 

So I decided to try an experiment - host the mp3s as before but generate a podcast feed for each book and have [Overcast](https://overcast.fm) 
treat them as podcast episodes. This should mean I can keep my place in the book in the player and get episodes in the order I want.

The idea is to process a folder of audiobooks, with each book in it's own sub-folder, and generate a feed rss xml file for each one. Then overcast can be pointed
at one or other of these feeds and handle it just as it would a "real" podcast hosted out on the internet.

## Feed Generator

The feed generator can be run to regenerate all feeds or when there is a new audiobook that you want to make available. 

```python
import socket
import json
from pathlib import Path
from email.utils import formatdate
from xml.sax.saxutils import escape
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

def get_server_ip_address():
  s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

  try:
      s.connect(("8.8.8.8", 80))
      ip = s.getsockname()[0]
  finally:
      s.close()

  return ip

def generate_feed(podcast_dir, baseUrl):
    metadata = json.loads(
        (podcast_dir / "podcast.json").read_text()
    )

    episodes = []

    for mp3 in sorted(
        podcast_dir.glob("*.mp3"),
        key=lambda p: p.stat().st_mtime,
        reverse=True
    ):
        url = (
            f"{baseUrl}/"
            f"{podcast_dir.name}/"
            f"{mp3.name}"
        )

        size = mp3.stat().st_size

        episodes.append(f"""
        <item>
          <title>{escape(mp3.stem)}</title>
          <guid>{url}</guid>
          <pubDate>
            {formatdate(mp3.stat().st_mtime, usegmt=True)}
          </pubDate>
          <enclosure
             url="{url}"
             length="{size}"
             type="audio/mpeg" />
        </item>
        """)

    feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>{escape(metadata["title"])}</title>
<description>{escape(metadata["description"])}</description>
<link>{baseUrl}</link>

{''.join(episodes)}

</channel>
</rss>
"""
    
    feedname = "feed.xml"
    (podcast_dir / feedname).write_text(
        feed,
        encoding="utf-8"
    )

    feedpath = f"{podcast_dir}/{feedname}"
    print(f"Generated {feedpath}")
    return feedpath


ROOT = Path(".")
PORT = 8000
ip = get_server_ip_address()
hostname = socket.gethostname()
BASEURL = f"http://{ip}:{PORT}"
BASE_URL = f"http://{hostname}:{PORT}"

feeds = []

for directory in ROOT.iterdir():
    if (
        directory.is_dir()
        and (directory / "podcast.json").exists()
    ):
        feeds.append(generate_feed(directory, BASEURL))

for feed in feeds:
    print(feed)
    
# Start web server
server = ThreadingHTTPServer(
         ("0.0.0.0", PORT),
         SimpleHTTPRequestHandler)

try:
    print(f"Serving from {BASE_URL}")
    server.serve_forever()
except KeyboardInterrupt:
    print("\nShutting down server...")
finally:
    server.shutdown()
    server.server_close()

print("Server stopped")

```

One enhancement to make things more podcast-like is to add some metadata for each audiobook in a podcast.json file withe mp3s:

```json
{
  "title": "My Wonderful Audiobook",
  "description": "This audiobook is now a podcast",
  "author": "Albert Einstein"
}
```
