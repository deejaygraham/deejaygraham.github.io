---
permalink: 2018/06/03/microbit-portal-theme/
layout: post
title: Portal Theme on Microbit
tags: [ code, microbit ]
published: true
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

One feature of the microbit I haven't explored too much in the past was the
music module. This module lets you play simple tunes using a dsl for pitches, octaves and durations (and, of course, rests). You can read the details of the API <a href="https://microbit-micropython.readthedocs.io/en/latest/music.html">here</a>.

I thought it would be fun to write a program to play <a href="https://www.jonathancoulton.com/">Jonathan Coulton's</a> end theme from the game <a href="https://en.wikipedia.org/wiki/Portal_(video_game)">Portal</a>.  


```python

{% include 'code/python/microbit/portal-theme.py' %}

```

The challenge was in notating it correctly with the right timings and pitches. Having everything in one list makes it a little bit difficult to maintain and to work out where you are if there is a problem but it does give you a nice compact music format very similar to the <a href="https://sonic-pi.net/">sonic pi</a> dsl.
