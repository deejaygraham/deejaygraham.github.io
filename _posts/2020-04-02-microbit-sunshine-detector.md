---
layout: post
title: Microbit Sunshine Detector
published: true
categories: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.jpg"
alttext: microbit sorting hat
---

A variation on the nightlight example is a simple, adjustable sunshine detector. 

Set the threshold level for brightness using the a and b buttons then the screen/light detector will flash a sun icon 
if enough light is falling on the screen. In dark environments, you can go down to a low threshold and in very light areas
you can adjust upwards so that you can tell the difference between light falling on an angle on the screen compared to 
shining fully on the face. 

```python

{% include code/python/microbit/sunshine-detector.py %}

```
I am going to include a snippet like this in the auto driving car so that it will turn its headlights on when it starts getting dark. 
Microbit safety first :)
