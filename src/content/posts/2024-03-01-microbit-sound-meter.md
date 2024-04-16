---
permalink: 2024/03/01/microbit-sound-meter/
layout: post
title:  Microbit Sound Meter
published: true
categories: [code, microbit, python]
---

The new (to me) v2 of the microbit has a built-in microphone to allow it to "listen" to it's surroundings. 

This could be really useful for some things and the first thing that came to mind for me was a sound level meter of the 
kind that you see on hi-fis and sci-fi films featuring talking computers.

The microbit microphone can return garbage on the first time it's called so here I discard the first reading before going 
into a loop, reading a value, mapping it to one of five values representing five sound levels and displaying one of the 
five carefully crafted bitmaps ;). The microbit documentation mentions that there is a microbit.scale function that would do the same as my map_value function but I have had problems getting the ide to recognize that.

The values from the microphone are between 0 and 255 as you might expect but I haven't been able to find any 
spec on what that maps to in terms of dBm levels.

```python

from microbit import *

def map_value(value, fromMin, fromMax, toMin, toMax):
    scaledValue = float(value - fromMin) / float(fromMax - fromMin)
    return toMin + (scaledValue * (toMax - toMin))

very_loud = Image("99999:99999:99999:99999:99999")
loud = Image("00900:09990:99999:99999:99999")
moderate = Image("00000:00900:09990:99999:99999")
soft = Image("00000:00000:00900:09990:99999")
very_quiet = Image("00000:00000:00000:00900:99999")
silence = Image("00000:00000:00000:00000:00900")

sound_meter = [silence, very_quiet, soft, moderate, loud, very_loud]

microphone.sound_level() # discard
sleep(200)

while True:
    soundLevel = int(map_value(microphone.sound_level(), 0, 255, 0, 5))
    display.show(sound_meter[soundLevel])

```
