---
layout: post
title: Improved Music
tags: [microbit, python]
---

More on automatically generating music for the microbit. This time we are generating two melodies using some of 
the techniques from previous posts but now one in a higher register than the other and randomly switching 
between playing one melody or the other or interleaving them to give the illusion of two simultaneous 
tunes on one machine. 

## Code

Here we are using variations on a C scale and randomly picking between them at startup. We then generate 
two melody variations based on the notes in that scale. The melody generation code attempts to smooth out 
the large leaps that would ordinarily occur when note choice is entirely random but leaving the possibility 
to allow that every so often. Generating the melody ahead of playing it means that we can store and replay 
it multiple times so that a pleasant melody can be kept running for as long as required.

```python
import music
import random

music.set_tempo(ticks=4, bpm=120)

scales = {
    "C_major":    ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    "C_minor":    ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    "C_pentatonic": ['C', 'D', 'E', 'G', 'A'],
    "C_blues":    ['C', 'Eb', 'F', 'Gb', 'G', 'Bb'],
    "C_dorian":   ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'],
    "C_phrygian": ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    "C_lydian":   ['C', 'D', 'E', 'F#', 'G', 'A', 'B'],
    "C_mixolydian": ['C', 'D', 'E', 'F', 'G', 'A', 'Bb'],
    "C_locrian":  ['C', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb'],
}

low_octaves = [3, 4]
high_octaves = [5, 6]
num_bars = 12
rhythm_patterns = [
    [1, 1, 1, 1], [2, 1, 1], [1, 2, 1], [1, 1, 2], [4], [3, 1], [1, 3], [2, 2]
]

def generate_note_choices(scale_notes, octaves):
    return [note + str(octave) for octave in octaves for note in scale_notes]

def generate_melody(scale, num_bars, rhythm_patterns, rest_chance=0.2, step_chance=0.85):
    melody = []
    prev_idx = random.randint(0, len(scale) - 1)
    for _ in range(num_bars):
        rhythm = random.choice(rhythm_patterns)
        for duration in rhythm:
            if random.random() < rest_chance:
                melody.append('r:{}'.format(duration))
                continue
            if melody and not melody[-1].startswith('r') and random.random() < step_chance:
                options = []
                if prev_idx > 0:
                    options.append(prev_idx - 1)
                options.append(prev_idx)
                if prev_idx < len(scale) - 1:
                    options.append(prev_idx + 1)
                idx = random.choice(options)
            else:
                idx = random.randint(0, len(scale) - 1)
            note = '{}:{}'.format(scale[idx], duration)
            melody.append(note)
            prev_idx = idx
    return melody

scale_type = random.choice(list(scales.keys()))
scale = scales[scale_type]
print(scale_type)

low_notes = generate_note_choices(scale, low_octaves)
high_notes = generate_note_choices(scale, high_octaves)

low_melody = generate_melody(low_notes, num_bars, rhythm_patterns)
high_melody = generate_melody(high_notes, num_bars, rhythm_patterns)
song = [note for pair in zip(low_melody, high_melody) for note in pair]

while True:
    selection = random.random()
    if selection < 0.3:
        print('low')
        for _ in range(2):
            music.play(low_melody)
    elif selection < 0.7:
        print('high')
        for _ in range(2):
            music.play(high_melody)
    else:
        print('interleaved')
        music.play(song)

```
