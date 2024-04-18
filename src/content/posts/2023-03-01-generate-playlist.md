---
permalink: 2023/03/01/generate-playlist/
layout: post
title:  Generate mp3 Playlists
published: true
tags: [code, python]
---

Dumping a simple script here for posterity and if I need to revisit sometime. Just playing with a new device for 
playing music back. The interface for playing single song is fine, but an album of songs isn't great; it tends to 
play them in random-ish order rather than sorting according to either the file name or the meta data. 

This is a bit frustrating, but luckily it does support playlists. Playlists, specifically m3u files, are not something 
I have needed in the past. Luckily the format is super simple, each line is the file name of a track and the tracks 
are played in the order they appear in the file. 

Of course, I had to write a script to run through my music folder and generate one playlist per album where I have the music 
organized by artist then subfolders containing each individual album. 

```python

import os
import glob 

music_folder = os.getcwd()
music_filter = '*.mp3'

for (path, subdirs, files) in os.walk(music_folder):
    os.chdir(path)
    relative_path = path.replace(music_folder + '/', '').replace('/', '\\') 
    print(relative_path)
    
    if glob.glob(music_filter) != []:
        track_list = []
        for mp3_name in glob.glob(music_filter):
            track_list.append(relative_path + '\\' + mp3_name)
        
        filename = os.path.split(path)[1] + '.m3u'
        
        playlist = open(filename, 'w')
        for track in sorted(track_list):
            playlist.write(track + '\n')
            
        playlist.close()
    
os.chdir(music_folder)

```

Here I am writing the m3u file into the same directory as the mp3s but I am adding a relative path to each file because 
the player I am now using requires m3u files to be in the root and music to be in folders. 


