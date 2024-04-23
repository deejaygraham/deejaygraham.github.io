---
permalink: 2020/11/30/silent-night-for-the-microbit/
layout: post
title: Silent Night for the Microbit
published: true
tags: [code, microbit, music]
hero: microbit
thumbnail: /img/posts/silent-night-for-microbit/thumbnail-420x255.webp
alttext: microbit
---

Since it's almost December, I thought of transcribing a classic tune for the microbit using the code 
from [a previous post](/2020/10/30/transcribing-sheetmusic-for-the-microbit/). I transcribed the music from standard notation to microbit notation and uploaded the 
file to the microbit as score.txt.

This was a uncomplicated arrangement so it didn't take very long to do but sounds very satisfying coming from the 
tiny speaker.


### Silent Night

In normal microbit code:

silent-night.py
{% highlight "python" %}

{% include 'code/python/microbit/silent-night.py' %}

{% endhighlight %}

... and using the technique from the [last post](/2020/10/30/transcribing-sheetmusic-for-the-microbit/)

silent-night.txt
{% highlight "txt" %}

{% include 'code/python/microbit/silent-night.txt' %}

{% endhighlight %}

The advantage with the second apparoach is that the music isn't hardcoded and can be changed by copying 
a new file with different content onto the microbit and resetting it.


### Transcription Process

After some playing with this, I found I was following this process when translating:

* Create a text file with as many lines in it as there are bars in the music
* Work out each note in each bar and fill in each line corresponding to that bar's number
* Look for repeated sections which can be copied from other lines in the file
* Work out lengths of each note and fill those in with the rests checking to make sure that 
the duration of each bar adds up to the same total every time
* Look at note pitches and identify where notes cross into different octaves. E.g Middle C is C4 and the next C 
above that is C5. Fill in pitches.
* Copy the file across to the microbit and let it play through
* Follow along with the sheet music and listen for anywhere the sound isn't correct
* Fix the notation and repeat until done
