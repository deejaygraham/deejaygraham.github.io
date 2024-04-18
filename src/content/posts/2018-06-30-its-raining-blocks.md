---
permalink: 2018/06/30/its-raining-blocks/
layout: post
title: It's Raining Blocks
tags: [ code, minecraft ]
published: true
hero: minecraft 
thumbnail: "/img/thumbnails/rpi-420x255.webp"
alttext: raspberry pi
---

A super simple rain simulator creates blocks at random positions in the sky and lets them fall to the ground under minecraft physics.

```python

{% include 'code/python/minecraft/rain.py' %}

```

The slightly weird thing about this is the "rain" is much more like a waterfall. A single block stays in place in the sky and 
just leaks water downwards until it reaches the ground and then just sort of pools. 

If you don't like water, you could substitute ice blocks or even lava, 
<a href="https://www.imdb.com/title/tt0118928/">Dante's Peak</a> style. Lava has different properties to water (no kidding!) in that 
it takes on a little bit more life and starts to bubble up and grow from wherever it was left.

This is a pretty "destructive" script in that it leaves a lot of messy blocks all over the world so you probably want to run it 
in a world that you don't mind throwing away afterwards.
