---
layout: post
title: Learning By Ear
tags: [microbit, python, music]
---

In this project, I wanted to simulate the microbit playing multiple wrong versions of a tune and "learning" to play it properly 
over time. 

## Evolution 

I have experimented in the past with some genetic algorithms to evolve solutions and thinking about the haunted music box reminded 
me of this approach. I wrote an evolution algorithm in python 3 to take a target tune (in microbit's music DSL) then start with a 
number of randomly generated tunes of the same length. These are then evaluated against the original target in terms of how close each 
random note is to the original and how close the duration is to the original. We use the best values, with some mutation to hopefully 
get us closer to the target, to generate the next generation of the data and repeat the process. Over time and generations, the evolution 
should get us very close to the original tune. 

After completing that project and running it a few times, it became obvious that there may be a few problems with this approach. First, the 
problem space of textual evolution that I had used before was 2 * 26 - letters a-z and upper case, maybe with some punctuation involved. 
The problem space with a musical evolution was 12 * 9 * 4 - note names, octaves, note length. The length of the target tune also becomes 
a problem because I again picked "twinkle twinkle" and although there is a lot of repitition in the tune, the length is longer than a lot of 
textual evolution demonstrations, meaning a larger population in each generation and more generations to cycle through to get a satisfactory 
result.

That was all fine on my high-power laptop but moving to the microbit it became immediately clear that memory was going to be a problem. 
Even loading the original code caused it a problem and it would not run without immediately complaining about failing memory allocations.

## Simpler

This was a problem because this project was intended to run on the microbit, start with the first random tune and then gradually 
evolve into a closer and closer version of a recognizable tune. It would emerge, so to speak. 

This led me to a simpler version of the evolution algorithm where I start with a randomly generated tune of the same length, as before, but 
just the one copy this time. Each time through the evolution loop, I inspect the two tunes and if the candidate tune has a "bad" note, rather 
than correcting it, we pick another note at random. 

## Random Correction

This is done hopefully to make the tune more undestandable to the listener. As we inspect each note, we first look at the duration in the hope that 
if we can get closer to the rhythm of the tune, it might evoke something in the listener, even if the pitches are incorrect. If the duration is 
correct, we next inspect the octave value in hope of bringing the tune into the same range of the original tune. Finally we look at the note in 
the chromatic scale itself and try to correct that. If a note matches across those three attributes - it is a "good" note - we leave it unchanged. 
Eventually, as notes move about randomly, the hope is that they will eventually hit on the correct attributes and correct tune overall.

## Code

```python
from microbit import *
import random
import music

note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
octaves = [2, 3, 4, 5, 6, 7]
note_durations = [4, 3, 2, 1]

class Note():
    
    @classmethod
    def from_string(cls, text):
        note, duration = text.split(':')

        if len(note) == 2:
            # e.g. C5
            name = note[0]
            octave = note[1]
        else:
            # e.g. Gb4
            name = note[:-1]
            octave = note[-1]

        return cls(name, int(octave), int(duration))
        
    def __init__(self, name, octave, duration):
        self.name = name
        self.octave = octave
        self.duration = duration
        
    def __str__(self):
        return "{0}{1}:{2}".format(self.name, self.octave, self.duration)

    def __repr__(self):
        return "Note('{0}{1}:{2}')".format(self.name, self.octave, self.duration) 
       
def generate_piece_from_string(text):
    piece = []
    notes = text.split(',')
    for n in notes:
        piece.append(Note.from_string(n))
    
    return piece
    
def generate_piece_from_list(l):
    piece = []
    for n in l:
        piece.append(Note.from_string(n))
    
    return piece

def generate_random_piece(size):
    piece = []
    for _ in range(size):
        name = random.choice(note_names)
        octave = random.choice(octaves)
        duration = random.choice(note_durations)
        piece.append(Note(name, octave, duration))
        
    return piece
    
def mutate_piece(target, candidate):
    for i in range(len(target)):
        item1 = target[i]
        item2 = candidate[i]
    
        # let's sync rhythm first...
        if item2.duration == item2.duration:
            # then octave
            if item1.octave == item2.octave:
                # then name
                if item1.name == item2.name:
                    pass
                else:
                    item2.name = random.choice(note_names)
            else:
                item2.octave = random.choice(octaves)
        else:
            item2.duration = random.choice(note_durations) 
        
generations = 1000
destination = generate_piece_from_list(
[   "C5:1",
    "C5:1",
    "G5:1",
    "G5:1",
    "A5:1",
    "A5:1",
    "G5:2",
    # How I wonder what you are
    "F5:1",
    "F5:1",
    "E5:1",
    "E5:1",
    "D5:1",
    "D5:1",
    "C5:2",
    # Up above the world so high
    "G5:1",
    "G5:1",
    "F5:1",
    "F5:1",
    "E5:1",
    "E5:1",
    "D5:2",
    # Like a diamond in the sky
    "G5:1",
    "G5:1",
    "F5:1",
    "F5:1",
    "E5:1",
    "E5:1",
    "D5:2",
    # Twinkle, twinkle, little star
    "C5:1",
    "C5:1",
    "G5:1",
    "G5:1",
    "A5:1",
    "A5:1",
    "G5:2",
    # How I wonder what you are
    "F5:1",
    "F5:1",
    "E5:1",
    "E5:1",
    "D5:1",
    "D5:1",
    "C5:2"
])

twinkle_dsl = [str(item) for item in destination]

music.set_tempo(bpm=60)
music.play(twinkle_dsl)

guess = generate_random_piece(len(destination))

for generation in range(generations):
    print('attempt ' + str(generation))
    # print(",".join(str(item) for item in individual))
    music.play([str(note) for note in guess])
    sleep(500)
    mutate_piece(destination, guess)

```
