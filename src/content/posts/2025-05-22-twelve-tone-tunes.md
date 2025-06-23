---
layout: post
title: Twelve Tone Tunes
tags: [microbit, python, music]
---

Have you ever wondered what it would be like to make a microbit sound like R2D2 as a 56k dial-up modem? If you have, then you are in luck!
[Twelve Tone Composition](https://en.wikipedia.org/wiki/Twelve-tone_technique) is a technique that lends itself quite well to the randomness 
available on the microbit. 

For an example of this, here is Ruth Crawford Seeger’s String Quartet 1931:

{% youtube JvbuUzDRVes %}

Of course our version is not going to sound as nice as this. 

## Code

The code first generates [a tone row](https://jdsferra.github.io/posts/2024-11-07-Matrix-Generator/) - a random shuffling of the 
chromatic scale - and also the derivatives from that. We do this up front just for the comparartive heavy lifting to do in this part. 
It's here where we also assign octave and duration for each note in the initial tone row so that the later transformations more closely match 
the original tone row and is closer to the spirit of the technique. Earlier versions of this code set random octaves and durations each 
time around so that the music was much more random overall. I think I like the newer version better. 
I incorporate a random rests in the initial tone row to break things up. 

```python
from microbit import *
import random
import music

chromatic_scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]


def generate_tone_row(notes):
    shuffled_notes = sorted(notes, key=lambda _: random.random())
    note_values = [4, 4, 3, 2, 2, 1, 1]
    octaves = [4, 5, 6]
    rest_probability = 0.2

    tone_row = []
    for note in shuffled_notes:
        # ensure we don't start with a rest
        if random.random() < rest_probability and len(tone_row) > 0:
            duration = random.choice(note_values)
            formatted_rest = "R:{0}".format(duration)
            tone_row.append(formatted_rest)

        duration = random.choice(note_values)
        octave = random.choice(octaves)
        formatted_note = "{0}{1}:{2}".format(note, octave, duration)
        tone_row.append(formatted_note)

    return tone_row


def retrograde(row):
    return row[::-1]


def split_note(text):
    note_octave, duration = text.split(":")
    if len(note_octave) == 2:
        note_name = note_octave[0]
        octave = note_octave[1]
    else:
        note_name = note_octave[0:2]
        octave = note_octave[-1]

    return note_name, octave, duration


def inversion(row, notes):
    inversion = []

    first_note = row[0]
    first_note_name, _, _ = split_note(first_note)
    first_note_index = notes.index(first_note_name)

    for note in row:
        # skip over rests...
        if note.startswith("R"):
            inversion.append(note)
        else:
            note_name, octave, duration = split_note(note)
            new_note = notes[
                (first_note_index - (notes.index(note_name) - first_note_index)) % 12
            ]
            inversion.append("{0}{1}:{2}".format(new_note, octave, duration))

    return inversion


prime = generate_tone_row(chromatic_scale)
r = retrograde(prime)
i = inversion(prime, chromatic_scale)
ri = retrograde(i)
rows = [prime, r, i, ri]

music.set_tempo(bpm=60)

while True:
    row = random.choice(rows)
    for note in row:
        print(note)
        music.play(note)
```
