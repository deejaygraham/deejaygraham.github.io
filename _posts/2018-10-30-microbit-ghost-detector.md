---
layout: post
title: Microbit Ghost Detector
categories: [ code, microbit ]
published: true
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.jpg"
alttext: microbit sorting hat
---

In time for Halloween, here's a ghost detector that uses the microbit temperature sensor to sense 
changes in room temperature - which we all know from watching supernatural tv shows - is a sure sign that 
there's a ghost somewhere nearby :)


```python

{% include code/python/microbit/ghost-detector.py %}

```

## Trick

You can use this code to play a trick on someone while telling them a creepy ghost story. 

The microbit starts off by reading the current temperature and then monitors the sensor 
for a colder temperature. It uses this to signal that it thinks a ghost is nearby. 

If you start off by holding the microbit in your hand while you tell the beginning of the ghost story, 
your hand can get it nice and warm. Then, when you put it down somewhere, it will cool down to normal 
room temperature in a few seconds. That drop in temperature should be enough to trigger the "ghost 
detector" as you finish your story.

To help with getting the starting temperature just right, you can press the "a" button once you think you have 
the microbit warm enough to make a difference. 
