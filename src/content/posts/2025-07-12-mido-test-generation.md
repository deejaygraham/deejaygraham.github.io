---
title: Mido Test Generator
tags: [midi, python]
---

Tinkering around with midi files again but this time in python, I discovered a new library - [mido](https://mido.readthedocs.io/en/stable/) - for 
midi file processing. I wanted a way to generate a simple test file that I could verify by ear and would be recognizable but would be just good enough 
for experimentation.

## SubHeadline

Mido seems super easy to use for this purpose, defined a MidiFile object, add a track, then fill up with track with note data. I opted to 
create a simple C major scale, just big enough to be minimally useful and following a predictable sequence so we can be sure if something 
is in the wrong place in the code, if the notes are increasing in the file, but the code is decreasing, say.

## Code

```python
from mido import Message, MidiFile, MidiTrack

outputFileName = 'test_scale.mid'
root = 60 # middle C (MIDI note 60) 
ticks = 480 # 480 ticks = 1 quarter note

major_scale_spelling = [0, 2, 2, 1, 2, 2, 2, 1]
notes = []

# generate the scale
for distance in major_scale_spelling:  # C D E F G A B C
    if len(notes) == 0:
        notes.append(root + distance)
    else:
        notes.append(notes[-1] + distance)

print(notes)

midiFile = MidiFile()
track = MidiTrack()
midiFile.tracks.append(track)

for note in notes:
    track.append(Message('note_on', note=note, velocity=64, time=0))
    track.append(Message('note_off', note=note, velocity=64, time=ticks)) 

midiFile.save(outputFileName)
print("Saved as " + outputFileName)
```
