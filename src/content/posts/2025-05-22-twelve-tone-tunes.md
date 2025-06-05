---
layout: post
title: Twelve Tone Tunes
draft: true
tags: [microbit, python]
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
Then we pick one of the variations of that tone row each time around the loop, assign a random octave and duration to each note and then play it. 
I incorporate a random rest at some points through each iteration to break things up. 

```python
from microbit import * 
import random
import music

chromatic_scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
note_values = [4, 4, 3, 2, 2, 1, 1]
octaves = [4, 5, 6]
rest_probability = 0.2

def generate_tone_row(notes):
    shuffled_notes = sorted(notes, key=lambda _: random.random())

    tone_row = []
    for note in shuffled_notes:
        if random.random() <rest_probability:
            # generate a rest ...
            duration = random.choice(note_values)
            rest = 'R:{0}'.format(duration)
            print(rest)
            music.play(rest)
            
        # generate a note
        duration = random.choice(note_values)
        octave = random.choice(octaves)
        n = '{0}{1}:{2}'.format(note, octave, duration)
        print(n)
    return tone_row

def retrograde(row):
    return row[::-1]

def inversion(row, notes):
    first_note = notes.index(row[0])
    return [notes[(first_note - (notes.index(note) - first_note)) % 12] for note in row]

def retrograde_inversion(row, notes):
    return retrograde(inversion(row, notes))

tone_row = generate_tone_row(chromatic_scale)

rows = [
    tone_row,
    retrograde(tone_row),
    inversion(tone_row, chromatic_scale),
    retrograde_inversion(tone_row, chromatic_scale)
]

music.set_tempo(bpm = 60)

while True:
    row = random.choice(rows)
    
    print('------')
    # now generate a random octave and duration for each note. 
    # Do we put a rest before it ???
    # generate a measure from this...
    # now put that into the measure generator...
    for note in row:
        if random.random() < 0.2:
            # generate a rest ...
            duration = random.choice(note_values)
            rest = 'R:{0}'.format(duration)
            print(rest)
            music.play(rest)
            
        # generate a note
        duration = random.choice(note_values)
        octave = random.choice(octaves)
        n = '{0}{1}:{2}'.format(note, octave, duration)
        print(n)
        music.play(n)

```

## Mini DSL 

