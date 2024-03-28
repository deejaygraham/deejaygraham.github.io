---
layout: post
title:  Make A Jazz Noise Here
published: true
categories: [code, microbit, python]
---

Inspired by the [Frank Zappa album of the same name](https://en.wikipedia.org/wiki/Make_a_Jazz_Noise_Here), here is a 
small microbit program that makes computer beeps and boops using the microbit music library.

It uses the notes of the C major scale and randomises the note chosen, the octave and duration for each note in attempt 
to make some free-form microbit "Jazz".

The early version of this program randomised each and every note but that was very discordant and hardly musical. I added 
in some reduced randomness by only changing the octave 10% of the time and changing the duration 50% of the time. 

While not remotely music, some small snatches of 2 or 3 notes played in succession do sound musical occasionally. The rest of 
the time, it's more like an elongated conversation with R2D2.

```python
from microbit import *
import random
import music

def format_note(name, octave, duration):
    return name + str(octave) + ':' + str(duration)
    
octaves = [1, 2, 3, 4, 5]
notes = ['c', 'd', 'e', 'R', 'f', 'g', 'a', 'b', 'R']
durations = [1, 2, 4, 8]

play = True
change_octave_pc = 10
change_duration_pc = 50

display.scroll('Make a Jazz Noise Here', delay=50)

octave = random.choice(octaves)
duration = random.choice(durations)

while True:
    
    if button_a.was_pressed():
        play = not play
    
    if play:
        note_name = random.choice(notes)
        
        if random.randint(0, 100) <= change_octave_pc:
            octave = random.choice(octaves)
            
        if random.randint(0, 100) <= change_duration_pc:
            duration = random.choice(durations)
        
        visualize = note_name != 'R'
        if visualize:
            x = random.randint(0, 4)
            y = 5 - octave
        
            display.set_pixel(x, y, 9) 
            
        note = format_note(note_name, octave, duration)
        music.play(note, wait=True)

        if visualize[:
            display.set_pixel(x, y, 0)

```

I added some code to visualize the notes as they were played by showing high notes higher up the screen and low notes at the bottom
with random positions to again emphasise the random nature of the "music".
