---
layout: post
title: Microbit Composition Support
tags: [microbit, python, music]
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

## Mini DSL 

With those functions in place, it becomes easier to validate the functioning of the slightly higher level functions that handle the microbit 
DSL and convert to and from midi.

```python
def parse_dsl_note(text):
    if len(text) > 3:
        raise SystemError('invalid note format')

    if len(text) == 2:
        # e.g. C5
        name = text[0]
        octave = int(text[1])
    else:
        # e.g. Gb4
        name = text[:-1]
        octave = int(text[-1])

    return name, octave

midi_rest = 128

def note_to_midi(text):
    if text == 'R':
        return midi_rest

    note_names = {
        'C': 0, 'C#': 1, 'Db': 1,
        'D': 2, 'D#': 3, 'Eb': 3,
        'E': 4,
        'F': 5, 'F#': 6, 'Gb': 6,
        'G': 7, 'G#': 8, 'Ab': 8,
        'A': 9, 'A#': 10, 'Bb': 10,
        'B': 11
    }

    name, octave = parse_dsl_note(text)

    return 12 * (octave + 1) + note_names[name]

def midi_to_note(midi):
    if midi == midi_rest:
        return 'R'

    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F',
                  'F#', 'G', 'G#', 'A', 'A#', 'B']
    
    note = note_names[midi_number % 12]
    octave = (midi_number // 12) - 1
    return "{0}{1}".format(note, octave)

```

A quick set of test cases output the expected values.

```cmd
print(note_to_midi('C1'), 'C1', '12')
print(note_to_midi('C4'), 'C4', '60')
print(note_to_midi('G#3'), 'G#3', '56')
print(note_to_midi('A4'), 'A4', '69')
print(note_to_midi('G9'), 'G9', '127')
```

## Rest

One horrible hack is the handling of rests ('R' character) in the midi conversions. Normal note values for midi values are in the range 0..127. Rests are 
not a thing in midi, they are implied by there not being a note played where in the microbit DSL, rests are explicit and have their own durations. 
For this reason, I have elected to represent a rest with a value of 128 - outside the normal midi note range - and include special handling for these values.
