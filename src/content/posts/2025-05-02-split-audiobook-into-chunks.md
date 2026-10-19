---
title: Split Audiobook into Chunks
tags: [books, code]
---

The Swiss Army Knife of media files has always been and continues to be [ffmpeg](https://www.ffmpeg.org) but it is so powerful and has so 
many options and switches, as a command line tool, that it's user interface can be a bit difficult to use and to remember. 

In this case, I had a large audiobook in one single mp3 file that I wanted to split into more manageable smaller files so that 
I can more easily use them loaded onto a phone or dedicated mp3 player. 

```shell
ffmpeg -i audiobook.mp3 -f segment -segment_time 1800 -c copy output_%03d.mp3
```

Here I am taking audiobook.mp3 and splitting it by segment on a hard limit of 1800 seconds (30 minutes) and creating new files 
like output_000.mp3, output_001.mp3 ...
