---
title: Microbit Choir
tags: [code, microbit, python]
---

WIP - Early experiment in creating a choir for three or more microbits.

## Code

```python
from microbit import *
import radio
import music


def separate_note(note):
    return note.split(":")


def note_to_midi(note):
    note_map = {
        "C": 0,
        "C#": 1,
        "D": 2,
        "D#": 3,
        "E": 4,
        "F": 5,
        "F#": 6,
        "G": 7,
        "G#": 8,
        "A": 9,
        "A#": 10,
        "B": 11,
    }

    # Extract the note and octave from the input
    if len(note) == 2:
        note_name = note[0]
        octave = int(note[1])
    elif len(note) == 3:
        note_name = note[:2]
        octave = int(note[2])
    else:
        raise ValueError("Invalid note format")

    # Calculate the MIDI value
    midi_value = note_map[note_name] + (octave + 1) * 12
    return midi_value


def midi_to_note_name(midi_value):
    note_names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

    note_name = note_names[midi_value % 12]
    octave = (midi_value // 12) - 1

    return "{}{}".format(note_name, octave)


def is_rest(note):
    return note == "R" or note == "r"


def harmonize(note, interval):
    parts = separate_note(note)

    if is_rest(parts[0]):
        return note

    root = note_to_midi(parts[0])
    harmony = root + interval
    harmony_note = midi_to_note_name(harmony)

    if len(parts) == 2:
        return "{}:{}".format(harmony_note, parts[1])

    return harmony_note


def harmonize_all(notes, interval):

    if interval == 0:
        return notes

    harmonized = []

    for note in notes:
        harmony = harmonize(note, interval)
        harmonized.append(harmony)

    return notes


def encode_notes_message(notes):
    commalist = ",".join(score)
    return "NOTES={}".format(commalist)


def decode_notes_message(message):
    _, notes = message.split("=")
    return notes.split(",")


# notes are
score = ["C4:4", "D4:4", "E4:4", "F4:4", "G4:4", "A4:4", "B4:4"]

# choir leader
leader = False
# position = 0

# harmonizer
semi_tones = 0

display.scroll("Harmony")
radio.on()

while True:

    wallpaper = Image.SQUARE if leader else Image.MUSIC_CROTCHET
    display.show(wallpaper)

    if accelerometer.was_gesture("shake"):
        leader = not leader

    if leader:

        # send out notes
        # send out go signal
        if button_a.was_pressed():
            # upload
            display.show(Image.ARROW_N)
            message = encode_notes_message(score)
            radio.send(message)
            sleep(2000)

        if button_b.was_pressed():
            display.show(Image.ARROW_N)
            message = "PLAY"
            radio.send(message)
            sleep(2000)

    else:

        # harmonizer
        if button_a.was_pressed():
            semi_tones = max(0, semi_tones - 1)
        if button_b.was_pressed():
            semi_tones = min(semi_tones + 1, 12)

        # is this a set of notes?
        # is this a control signal
        message = radio.receive()

        if message:
            # download
            display.show(Image.ARROW_S)
            if message.startswith("NOTES"):
                score = decode_notes_message(message)
            elif message.startswith("PLAY"):
                harmony = harmonize_all(score, semi_tones)
                music.play(harmony)


# print(harmonize('C5', 12))
```
