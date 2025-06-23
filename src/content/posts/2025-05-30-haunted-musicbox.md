---
layout: post
title: Haunted Music Box
tags: [microbit, python, music]
---

Back on microbit music but with a random slant on it, I present a haunted music box. As we all know, music boxes in horror films
can be triggered to scare the protagonist when they are snooping around "The Old House". For me there are a number of factors that 
make the spookiness: the triggering of the music without obvious human intervention; the music sounding familiar but somehow "not 
quite right".

## Trigger

In common with the ghost detector and other similar projects, I wondered about triggering this with changes in light, temperature etc. 

## Music

The spookiness in the music comes often from things like subtle changes in tempo over time - like an old tape player speeding up and slowing 
down during playing - and from some of the notes being out of place or slightly wrong and off key. 

Here for the first experiments, I am playing the music entirely straight until a spooky trigger happens. For simplicity, I am 
using the "A" button to toggle spooky mode. Then, we can change the tempo subtly 
over time and occasionally subsitute another note somewhere in the tune. I chose to stick with the original twinkle twinkle because it is 
so well known and any variation in the tune would be picked up easily by the listener.

## Code

### music-box.py

```python
from microbit import *
import music
import random

song = [
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

# map note name to vert. line on display
note_to_line = {"C": 0, "D": 0, "E": 1, "F": 2, "G": 3, "A": 4}


def draw_vertical_line(x):
    for y in range(5):
        display.set_pixel(x, y, 9)


def fade_out_display():
    for x in range(5):
        for y in range(5):
            brightness = display.get_pixel(x, y)
            display.set_pixel(x, y, max(0, brightness - 1))


display.show(Image.MUSIC_QUAVERS)
sleep(5000)
display.clear()

spooky = False
tempo = 30

music.set_tempo(bpm=tempo)

while True:
    for note in song:

        # switch on or off spooky mode
        # this could be done with
        # another trigger
        if button_a.was_pressed():
            spooky = not spooky
            display.show(Image.GHOST if spooky else Image.MUSIC_QUAVERS)
            sleep(2000)

        # substitute another note
        if spooky and random.random() < 0.1:
            note = random.choice(song)

        fade_out_display()
        note_name = note[0]

        if not note_name == "R":
            x = note_to_line[note_name]
            draw_vertical_line(x)

        music.play(note)
        fade_out_display()

        if spooky and random.random() < 0.2:
            delta = random.randint(-5, 5)
            tempo = max(10, tempo + delta)
            music.set_tempo(bpm=tempo)
```

## Improvements 

Later, I intend to work in raw pitches and try more subtle adjustments of pitch - think old-timey tape player 
or record player slowing down and speeding up by adjusting the playback speed and the pitch at the same time. That should add to the spookiness nicely.
