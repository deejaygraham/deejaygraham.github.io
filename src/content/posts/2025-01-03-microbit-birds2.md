---
title: Microbit Bird Song2
tags: [code, microbit, python]
---

In the previous post about getting microbits singing to each other I mentioned that using the speech API wasn't a good choice due to the limitations of 
it's enunciation. Here's a better version using the music DSL to better emulate the beeps and boops of a microbit bird flock.

## Code

### Frogs

In the early development of this, I discovered a good way to emulate a set of bullfrogs croaking away is to stick with a "C1:1" note and 
repeat that every loop.

```python
from microbit import *
import music

while True:

    music.play("C1:1")
    sleep(1000)
```

Flashing this to several devices was really effective in giving the frog vibe. 

### Birds

Here each bird starts off with it's own song generated at the start, then randomly sings part or all of the song each time around the loop. The length, 
note and octave are randomly assigned, each bird picks an octave then notes stay around that particular register so we don't get too many jarring songs 
with notes from extreme low and high octaves playing together. 

```python
from microbit import *
import random
import music

display.show(Image.DUCK)

note_names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
base_octave = random.randint(2, 8)
note_lengths = [1, 2, 4, 8]
song = []

for x in range(random.randint(1, 8)):
    note_name = random.choice(note_names)
    octave = base_octave + random.randint(-1, 1)
    length = random.choice(note_lengths)
    song.append("{}{}:{}".format(note_name, octave, length))

sound_threshold = 100  # 255 max
microphone.sound_level()  # discard first

while True:

    display.set_pixel(2, 2, 9)

    for x in range(random.randint(1, len(song))):
        music.play(song[x])

    display.set_pixel(2, 2, 0)

    # listen to surrounding noise
    if microphone.sound_level() >= sound_threshold:
        time_to_next_call = 500
    else:
        time_to_next_call = random.randint(1000, 5000)

    sleep(time_to_next_call)
```

Having several microbits in this bird orchestra still feels a bit like starting a 90s dialup modem but some songs can be genuinely nice or at least interesting. One thing that helped the musicality is keeping the note lengths to the more standard 1, 2, 4, and 8 note durations rather than just a 
random number between 1 and 8.

## Update

After playing around with this in actual demonstrations, I added a new refinement which was to separate the calls into different kinds of "bird". Randomly we pick either a low frequency "owl", 
a medium frequency "songbird" or a high frequency "cheep".

```python
from microbit import *
import random
import music

def generate_song(song_length, note_names, note_lengths, base_octave):
    song = []
    
    for x in range(song_length):
        note_name = random.choice(note_names)
        octave = base_octave + random.randint(-1, 1)
        length = random.choice(note_lengths)  
        song.append("{}{}:{}".format(note_name, octave, length))
    
    return song
    
display.show(Image.DUCK)

note_names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
note_lengths = [1, 2, 4, 8]
song = []

bird = random.randint(1, 3)

if bird == 1:
    # low voiced owl?
    song = generate_song(2, note_names, note_lengths, 2)
    display.show(Image.ASLEEP)
    music.set_tempo(bpm=60)
elif bird == 2:
    # song bird
    song = generate_song(random.randint(1, 8), note_names, note_lengths, random.randint(2, 8))
    display.show(Image.MUSIC_QUAVER)
else: 
    # high voiced cheep
    song = generate_song(2, note_names, note_lengths, 7)
    display.show(Image.DUCK)
    music.set_tempo(bpm=180)
    
sound_threshold = 100  # 255 max
microphone.sound_level()  # discard first

while True:

    display.set_pixel(2, 2, 9)

    for x in range(random.randint(1, len(song))):
        music.play(song[x])

    display.set_pixel(2, 2, 0)

    # listen to surrounding noise
    if microphone.sound_level() >= sound_threshold:
        time_to_next_call = 500
    else:
        time_to_next_call = random.randint(1000, 5000)

    sleep(time_to_next_call)

```

I separated out a new function to generate a full song with a given song length and a given octave basis. 
