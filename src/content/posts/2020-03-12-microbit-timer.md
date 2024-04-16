---
permalink: 2020/03/12/microbit-timer/
layout: post
title: Microbit Timer
published: true
categories: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

If Siri and all the other "smart" devices can set a timer and let us know when the time is up, why can't we with the microbit? Here's a code sample which does just that. 

The code is built in two halves of functionality, setting the right duration for the timer and doing the actual timing. 

We start off waiting for a time to be set and the "a" and "b" buttons are used to increment and decrement the 
time. Guards are there to stop us going to far up or down below one second. 

Shaking the device starts the timer and we display an animated clock moving once per second for twelve seconds in a full revolution (rather than the usual 60). 

Once we get to the full time, we stop the timer and display a smiley face. 

```python

{% include 'code/python/microbit/microbit-timer.py' %}

```
