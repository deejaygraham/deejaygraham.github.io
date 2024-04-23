---
permalink: 2017/11/12/blinkenlights/
layout: post
title: microbit Blinkenlights
tags: [ code, microbit ]
published: true
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

A tiny snippet of code often used when the microbit is not showing anything
specifically on the screen but you want to indicate that something is happening
in the background - like it's broadcasting on radio.

{% highlight "python" %}

{% include 'code/python/microbit/blinkenlights.py' %}

{% endhighlight %}

It turns the centre pixel of the display on and off at a frequency decided by the polling interval. 
