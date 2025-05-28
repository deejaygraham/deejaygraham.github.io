---
layout: post
title: Microbit Skinner Box
tags: [microbit, python]
---

More from the random behaviour posts (and inline with our current obsession with AI), I was reviewing some of the microbit docs and realised I had not played 
with any of the audio sample library, so here's a [Skinner Box](https://en.wikipedia.org/wiki/Operant_conditioning_chamber) that waits for a button press 
and then _might_ show a random image and play a random audio clip. The probability of getting a reaction can be improved by tweaking the variable. 

## Code

### skinner-box.py

```python
from microbit import *
import random
import music

images = [Image.ANGRY, Image.CONFUSED, Image.GHOST, Image.HEART, Image.HAPPY, Image.MEH, Image.SAD]
sounds = [Sound.GIGGLE, Sound.HAPPY, Sound.HELLO, Sound.MYSTERIOUS, Sound.SAD, Sound.SLIDE, Sound.SOARING]

probability = 0.3

while True:
    if button_a.was_pressed() or button_b.was_pressed():
        if random.random() < probability: 
            display.show(random.choice(images))
            audio.play(random.choice(sounds))

    display.show(Image.ASLEEP)
    sleep(1000)
```
