---
layout: post
title: Beeps and Boops
tags: [microbit, python]
---

It's often an internal joke between software folk that what we do is "make the computer go 'beep' and 'boop'".

Since the microbit can make all kinds of musical noises, I thought it might be fun to try to emulate a couple of 
well-known sequences of beeps and boops. First, a very popular robot from a well-known star conflict themed 
sci-fi franchise. 

## Are Two?

The beats per minute were cranked up for this and the register of the notes was increased to help emulate the 
squeaks you would expect from this robot. 

```python
import music
import random
from microbit import *

music.set_tempo(ticks=4, bpm=240)  

chromatic = ['C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6',
             'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7']

display.show(Image("09990:99999:55555:99999:99999"))

while True:
    wait = random.randint(0, 10000)
    sleep(wait)

    sequence = []
    for _ in range(random.randint(10, 32)):  
        if random.random() < 0.2:
            sequence.append('r:1')
        else:
            note = random.choice(chromatic)
            duration = random.choice([1, 1, 2])  
            sequence.append('{}:{}'.format(note, duration))
    
    music.play(sequence)
```

In a similar soundscape is the next one. 


## Modem

Anyone who was around at the beginning of the domestic internet might remember the noises 
a 56k dial-up modem made when connecting online at the start of a session. 

```python

import music
import random
from microbit import sleep

music.set_tempo(ticks=4, bpm=240)  

modem_freqs = [
    440,  # A4
    600,  # F#5
    800,  # G#5
    1000, # B5
    1200, # D6
    1400, # F6
    1600, # G#6
    1800, # A#6
    2000, # B6
    2200, # C#7
    2400, # D#7
    2600, # F7
    2800, # G7
    3000, # G#7
    3200, # A7
]

sequence = []
for _ in range(40):
    freq = random.choice(modem_freqs)
    duration = random.choice([50, 100, 150, 200])  # Short, rapid tones
    sequence.append((freq, duration))
    if random.random() < 0.1:
        sequence.append((0, 100))  # 0 Hz = rest

for freq, duration in sequence:
    if freq == 0:
        sleep(duration)
    else:
        music.pitch(freq, duration)

```
