---
draft: true
layout: post
title: Haunted Music Box
tags: [microbit, python]
---

Back on microbit music but with a random slant on it, I present a haunted music box. As we all know, music boxes in horror films
can be triggered to scare the protagonist when they are snooping around "The Old House". For me there are a number of factors that 
make the spookiness: the triggering of the music without obvious human intervention; the music sounding familiar but somehow "not 
quite right".

## Trigger

In common with the ghost detector and other similar projects, I wondered about triggering this with changes in light, temperature etc. 

## Music

The spookiness in the music comes often from things like subtle changes in tempo over time - like an old tape player speeding up and slowing 
down during playing - and from some of the notes being out of place or slightly wrong and off key. 

## Code

### music-box.py

```python
# Imports go at the top
from microbit import *
import music 
import random 

# Code in a 'while True:' loop repeats forever
m = ['C4:4', 'R', 'D4', 'E4', 'F4']

three_blind_mice = [ "E4:1", "D4:1", "C4:2", # Three blind mice
"E4:1", "D4:1", "C4:2", # Three blind mice
"G4:1", "F4:1", "E4:1", "D4:1", # See how they run
"G4:1", "F4:1", "E4:1", "D4:1", # See how they run
"A4:1", "G4:1", "F4:1", "E4:1", # They all ran after
"D4:2", "C4:2", # the farmer's wife
"E4:1", "D4:1", "C4:2", # Three blind mice (repeat)
"R:4" # Rest at the end
]


baa_baa_black_sheep = ["G4:1", "G4:1", "D4:1", "D4:1", "E4:1", "E4:1", "D4:2", # Baa baa black sheep
"E4:1", "E4:1", "C4:1", "C4:1", "B3:1", "B3:1", "A3:2", # Have you any wool?
"D4:1", "D4:1", "C4:1", "C4:1", "B3:1", "B3:1", "A3:2", # Yes sir, yes sir
"G4:1", "G4:1", "D4:1", "D4:1", "E4:1", "E4:1", "D4:2", # Three bags full
"R:4" # Rest at the end
]
change_tempo_probability = 50
change_tempo_up_probability = 50
tempo_delta = 5
change_note_probability = 30

def modify_tempo(tempo):
    if random.randint(0, 100) <= change_tempo_probability:
       if random.randint(0, 100) <= change_tempo_up_probability:
           tempo += tempo_delta
       else:
           tempo -= tempo_delta
           
    return tempo

def modify_note(note, notes):
    if random.randint(0, 100) <= change_note_probability:
        return random.choice(notes)

    return note
    
#m = baa_baa_black_sheep 

index = 0
tempo = 120

# loop around
while True:

    # gradually drift out and back in again
    # play 
    # maybe change tempo?
    tempo = modify_tempo(tempo)
    music.set_tempo(bpm=tempo, ticks=4) # 6/8

    # change note?
    note = modify_note(m[index], m)
    display.set_pixel(2, 2, 9)
    music.play(note, wait=True)

    index += 1
    if index >= len(m):
        index = 0

    display.set_pixel(2, 2, 0)

```
