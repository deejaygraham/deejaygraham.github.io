---
title: Extract Music from MP3
tags: [python, music]
---

I discovered a python package [librosa](https://librosa.org/doc/latest/index.html) that does audio and signal processing and that you 
can use to work out pitches of an audio track. I thought I would try it with the Captain Laserbeam Distress call from 
Thrilling Adventure Hour. 

First, we install the package with pip.

```shell
pip install librosa
```

Then we can load the file, use piptrack to extract pitches, separated into frames, then attempt to find the dominant (no pun intended) 
pitch in each of those frames. 

```python
import librosa

filename = 'Captain Laser Beam Distress Call.mp3'  
y, sr = librosa.load(filename)

pitches, magnitudes = librosa.piptrack(y=y, sr=sr)

pitch_values = []
for i in range(pitches.shape[1]):
    index = magnitudes[:, i].argmax()
    pitch = pitches[index, i]
    if pitch > 0:
        pitch_values.append(pitch)

notes = librosa.hz_to_note(pitch_values)

print("Detected notes:")
print(notes[:20])
```

Lastly, we work backwards from frequency values to more readable pitch values of note and octave. 

This sort of worked but piptrack seemed not to be suited to the file I was using. So I went with the pyin method instead 
after first doing some preprocessing on the data to remove cruft with hpss. 

```python
import librosa
import numpy as np
import winsound
import time

AUDIO_FILE = 'Captain Laser Beam Distress Call.mp3'  

HOP_LENGTH = 256
MIN_NOTE_DURATION = 0.05  # seconds
MIN_CONFIDENCE = 0.70

NOTE_NAMES = {
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

def midi_to_note(midi_number):
    names = [
        "C", "C#", "D", "D#", "E", "F",
        "F#", "G", "G#", "A", "A#", "B"
    ]

    octave = (midi_number // 12) - 1
    name = names[midi_number % 12]

    return f"{name}{octave}"

def note_to_frequency(note):
    octave = int(note[-1])
    name = note[:-1]

    midi = (octave + 1) * 12 + NOTE_NAMES[name]

    return 440.0 * (2 ** ((midi - 69) / 12))


def play_note(note, duration=300):
    frequency = round(note_to_frequency(note))
    winsound.Beep(frequency, duration)

# -------------------------------------------------------
# Load audio
# -------------------------------------------------------

y, sr = librosa.load(
    AUDIO_FILE,
    sr=None,
    mono=True
)

print(f"Sample rate: {sr} Hz")
print(f"Duration: {len(y) / sr:.2f} seconds")


# -------------------------------------------------------
# Separate harmonic part
# -------------------------------------------------------

harmonic, _ = librosa.effects.hpss(y)


# -------------------------------------------------------
# Detect fundamental frequency
# -------------------------------------------------------

f0, voiced_flag, voiced_prob = librosa.pyin(
    harmonic,
    sr=sr,

    # Adjust these if you know the expected range
    fmin=librosa.note_to_hz("C3"),
    fmax=librosa.note_to_hz("C7"),

    frame_length=2048,
    hop_length=HOP_LENGTH
)


times = librosa.times_like(
    f0,
    sr=sr,
    hop_length=HOP_LENGTH
)


# -------------------------------------------------------
# Decide which frames contain a reliable pitch
# -------------------------------------------------------

is_note = (
    voiced_flag
    & ~np.isnan(f0)
    & (voiced_prob >= MIN_CONFIDENCE)
)


# -------------------------------------------------------
# Find contiguous voiced regions
#
# False False True True True False True True False
#             |---------|       |-----|
#                note 1          note 2
# -------------------------------------------------------

regions = []

start = None

for i, voiced in enumerate(is_note):

    if voiced and start is None:
        # Note begins
        start = i

    elif not voiced and start is not None:
        # Note ends
        regions.append((start, i))
        start = None


# Handle final note if audio ends while voiced
if start is not None:
    regions.append((start, len(is_note)))


# -------------------------------------------------------
# Analyse each note region
# -------------------------------------------------------
events = []

for start_frame, end_frame in regions:
    start_time = times[start_frame]

    if end_frame < len(times):
        end_time = times[end_frame]
    else:
        end_time = len(y) / sr

    duration = end_time - start_time

    # Ignore tiny glitches
    if duration < MIN_NOTE_DURATION:
        continue

    region_f0 = f0[start_frame:end_frame]

    # Remove anything invalid
    region_f0 = region_f0[~np.isnan(region_f0)]

    if len(region_f0) == 0:
        continue

    # Median is deliberately used rather than mean
    # so unstable attack/decay frames have less influence.
    frequency = np.median(region_f0)

    midi_float = librosa.hz_to_midi(frequency)
    midi_note = int(round(midi_float))

    note_name = midi_to_note(midi_note)

    # Difference from perfect equal-tempered pitch
    cents = (midi_float - midi_note) * 100

    events.append({
        "note": note_name,
        "midi": midi_note,
        "frequency": frequency,
        "cents": cents,
        "start": start_time,
        "end": end_time,
        "duration": duration
    })

print()
print("Detected notes")
print("-" * 72)

for i, event in enumerate(events, start=1):
    print(
        f"{i:2}. "
        f"{event['note']:4} "
        f"{event['frequency']:8.2f} Hz  "
        f"{event['cents']:+6.1f} cents  "
        f"start {event['start']:6.3f}s  "
        f"duration {event['duration']:6.3f}s"
    )

melody = [event["note"] for event in events]

print()
print("Melody:")
print(melody)

for note in melody:
    print(note, round(note_to_frequency(note)), "Hz")
    play_note(note, 300)

    # Small gap between notes
    time.sleep(0.05)

```

In this version I also added a super basic playback, i.e. not taking account of timing, mechanism so that I can try to validate 
the output and compare it against what is in the original source.

