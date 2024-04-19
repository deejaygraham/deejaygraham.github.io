---
permalink: 2020/10/22/microbit-musicians/
layout: post
title: Microbit Musicians
published: true
tags: [code, microbit, music]
hero: microbit
thumbnail: /img/posts/microbit-musicians/thumbnail-420x255.webp
alttext: microbit
---

Today I have been playing with some ideas around creating my own little microbit orchestra. This has come around because of the announcement of the 
new microbit v2, soon to be available, which has some refreshed hardware and now contains a built in speaker.

### Orchestra

My eventual goal (in a later post) was to create code for several microbits with different roles in the orchestra. I am imagining several microbits 
which will be the "musicians" and a coordinating role of the "conductor". The musicians will be able to play whatever music is given to them. The 
conductor which coordinate and keep all the musicians in time with each other and be able to set the pace of the overall piece. 

I would like to have as much of the behaviour of both roles set by external configuration rather than hardcoding of information within each program. 
For example, I would like the role of the musicians to be defined by a local file - e.g. violin.txt, cello.txt, bass.txt - and the music they play be 
defined by another local file - e.g. score.txt - or to be allocated to each role by the conductor using radio. This way the data could be loaded 
onto the conductor role and distributed throughout the orchestra with each role only listening for and downloading their parts over the radio.


### Score

First goal in this process is to be able to load abitrary music from a source other than the hard-coded program and then play it using the microbit 
music API.

I picked loading a local text file for the microbit temporary storage as the first step since it seemed to be the easiest and needed least interaction with 
other systems. Files are loaded onto the microbit using the files button in the mu editor and the 
<a href="https://microbit-micropython.readthedocs.io/en/v1.0.1/filesystem.html">docs</a> warn that any temporary files are discarded when the microbit is 
next flashed. I found that this discarding was a bit hit-and-miss, sometimes the file would be removed after flashing, sometimes not. Anyway, it's best to 
keep a backup on your development machine so it can be copied over as needed. 

I opted for a very simple file format. The music is stored in the file using the <a href="">microbit music DSL</a> with one line per bar of music and each note 
separated from the others by a comma.


#### score.txt 

```txt

{% include 'code/python/microbit/score.txt' %}

```

Here I've taken the microbit documentation example of the beginning of Beethoven's fifth symphony as a test file. 


### Musician

Because of the problem with temporary files not being guaranteed to exist all the time, I opted for a hard-coded file name to check and use the microbit os module 
to list out local files and check if the expected file is available. It's worth remembering the source code for the program also appears in the list of files 
as main.py so it's good to remember not to assume the file you place there is the only one reported back to you.

After the file is loaded, we look at each line in the file, split the notes on the commas and add each note, stripped of surrounding whitespace, to a notional bar.
Each bar is then added to the overall score. Once the whole file has been read, I change the displayed icon to a musical theme and play the available score on a loop. 

Loading simple tunes into the file and resetting makes for an annoying test after a few minutes of constant repetition but as I build out the capabilities and 
include more microbits in the orchestra, the beauty of more sophisticated pieces, spread out across a few more ought to come to the fore.

### Code

```python

{% include 'code/python/microbit/load-music-file.py' %}

```

Next will be assignment of roles for each musician and coordinating the piece from a central conductor.
