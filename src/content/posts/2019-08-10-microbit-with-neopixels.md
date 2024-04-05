---
layout: post
title: Microbit with NeoPixels
published: true
categories: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
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

### Microbit LEDs

We can add this NeoPixel functionality to the BitBot vehicle so that we can have headlights, reverse lights, brake lights...

```python

{% include code/python/microbit/bitbot-neopixels-4.py %}

```

I also added functions to light the left and right arms of the vehicle independently and two cool effects -
swiping a colour from the back LEDs all the way to the front one (and the reverse effect) just to show off.

### BitBot

We can add this code into the [BitBot class]({% link _posts/2019-05-16-microbit-motoring.md %}) like this:

```python

{% include code/python/microbit/bitbot-neopixels-5.py %}

```

### Rainbows

For reference, since the LEDs are all RGB programmable, we can set each one to a different colour of the rainbow.

| Colour | RGB          |
| ------ | ------------ |
| Red    | 255, 0, 0    |
| Orange | 255, 127, 0  |
| Yellow | 255, 255, 0  |
| Green  | 0, 255, 0    |
| Blue   | 0, 0, 255    |
| Indigo | 75, 0, 130   |
| Violet | 148, 90, 211 |
