---
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
