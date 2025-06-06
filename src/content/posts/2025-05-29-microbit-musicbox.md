---
layout: post
title: Music Box
tags: [microbit, python, music]
---

Before I start work on the spooky version of this project, here's the nice version - a slow version of "Twinkle Twinkle" that could 
be played on a music box but is instead played on the microbit using the music API. I have slowed it down quite a bit from the default 120 bpm,
which felt far too fast, to 30 bpm which feels more like a small tinkly music box.

## Code

### music-box.py

```python
# Imports go at the top
from microbit import *
import music

twinkle_twinkle = [
    # Twinkle, twinkle, little star
    "C5:1",
    "C5:1",
    "G5:1",
    "G5:1",
    "A5:1",
    "A5:1",
    "G5:2",
    # How I wonder what you are
    "F5:1",
    "F5:1",
    "E5:1",
    "E5:1",
    "D5:1",
    "D5:1",
    "C5:2",
    # Up above the world so high
    "G5:1",
    "G5:1",
    "F5:1",
    "F5:1",
    "E5:1",
    "E5:1",
    "D5:2",
    # Like a diamond in the sky
    "G5:1",
    "G5:1",
    "F5:1",
    "F5:1",
    "E5:1",
    "E5:1",
    "D5:2",
    # Twinkle, twinkle, little star
    "C5:1",
    "C5:1",
    "G5:1",
    "G5:1",
    "A5:1",
    "A5:1",
    "G5:2",
    # How I wonder what you are
    "F5:1",
    "F5:1",
    "E5:1",
    "E5:1",
    "D5:1",
    "D5:1",
    "C5:2",
]

def draw_vertical_line(x):
    for y in range(5):
        display.set_pixel(x, y, 9)

def fade_out_display():
    for x in range(5):
        for y in range(5):
            brightness = display.get_pixel(x, y)
            display.set_pixel(x, y, max(0, brightness - 3))
            
display.show(Image.MUSIC_QUAVERS)
display.clear()

note_to_line = {
    'C': 0,
    'D': 0,
    'E': 1,
    'F': 2,
    'G': 3,
    'A': 4
}

music.set_tempo(bpm=30)

while True:
    for note in twinkle_twinkle:
        fade_out_display()
        note_name = note[0]
        if note_name == 'R':
            fade_out_display()
        else:
            x = note_to_line[note_name]
            draw_vertical_line(x)

        music.play(note)

```

## Visual

I added a visual to the playback, mapping the six pitches to the vertical lines on the display. Higher pitches are shown at the right side of the display 
and lower pitches at the left. I had to cheat a bit because there are 
six pitches but only 5 lines so C and D notes share the leftmost line. I also added a fade out effect to the screen to simulate something 
like a spectrum analyser showing which pitch was playing and it also looks a little bit like the "keys" (or whatever they are called) that 
are struck by the rotation of the music box barrel.
