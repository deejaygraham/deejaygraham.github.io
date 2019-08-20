---
layout: post
title: Microbit with NeoPixels
published: true
categories: [code, microbit]
hero: microbit
---

The <a href="http://4tronix.co.uk/blog/?p=1490">BitBot</a> comes with a set of 12 programmable NeoPixel LEDs built along the
arms of the robot - 6 each side. Each one is individually addressable (0 .. 11) and programmable using standard RGB values.

### NeoPixels

Importing the neopixel library is a required step because it doesn't come in with the traditional blank microbit star import.
Then we can set colour using an rgb tuple.

```python

{% include code/python/microbit/bitbot-neopixels-1.py %}

```

We can set all pixels to the same colour easily too.

```python

{% include code/python/microbit/bitbot-neopixels-2.py %}

```

All changes to the pixel values have to be followed up with a call to show(). Pixel values also persist between calls to show()
so that turning off all LEDs is a good practice before changing which LEDs are shown.

```python

{% include code/python/microbit/bitbot-neopixels-3.py %}

```

### BitBot

We can add this NeoPixel functionality to the BitBot vehicle.
