---
layout: post
title: Microbit Composition Support
tags: [microbit, python]
---

Ahead of some code I am writing to do more complex music generation for the microbit, I am capturing some useful support functions
that I will be using but stand on their own in the general area of converting between various formats we use in music notation and 
playback.

## Midi and Frequency

The microbit has support for two ways to create beeps and boops: using raw frequencies, measured in Hz, which is quite fiddly; using the 
built-in DSL which is note name, optional octave, colon, optional duration.

To help in converting between these two formats, I wrote two functions to use the midi numbering system (0 - 127) to serve as an intermediate 
format.

```python

def frequency_to_midi(freq):
    return int(round(69 + 12 * math.log2(freq / 440.0)))

def midi_to_frequency(midi):
    if midi < 0 or midi > 127:
        raise SystemError('Invalid midi value')
    
    return 440 * math.pow(2, (midi - 69) / 12.0)

```

With those functions in place, it becomes easier to validate the functioning of the slightly higher level functions that handle the microbit 
DSL.

```python
def parse_note_octave(note):
    if len(note) > 3:
        raise SystemError('invalid note value')

    if len(note) == 2:
        # e.g. C5
        name = note[0]
        octave = int(note[1])
    else:
        # e.g. Gb4
        name = note[:-1]
        octave = int(note[-1])

    return name, octave

def note_to_midi(note_octave):
    
    note_names = {
        'C': 0, 'C#': 1, 'Db': 1,
        'D': 2, 'D#': 3, 'Eb': 3,
        'E': 4,
        'F': 5, 'F#': 6, 'Gb': 6,
        'G': 7, 'G#': 8, 'Ab': 8,
        'A': 9, 'A#': 10, 'Bb': 10,
        'B': 11
    }

    note, octave = parse_note_octave(note_octave)

    return 12 * (octave + 1) + note_names[note]
```

A quick set of test cases output the expected values.

```cmd
print(note_to_midi('C1'), 'C1', '12')
print(note_to_midi('C4'), 'C4', '60')
print(note_to_midi('G#3'), 'G#3', '56')
print(note_to_midi('A4'), 'A4', '69')
print(note_to_midi('G9'), 'G9', '127')
```
