---
title: Simple Simon Game
tags: [microbit, code]
---

I haven't posted a game in a while so here's a very simple recreation of the ["Simon" game](https://en.wikipedia.org/wiki/Simon_(game)) 
which uses the two buttons on the front of the microbit but could be broken out into a full electronic 
project to have four lights and four buttons. LEDs could be driven from the edge connector with some 
extra components and the buttons could be read into the digital inputs.

For now and simplicity, we only have the two buttons and two musical notes to deal with. The game starts 
with a single note and adds a random note to the sequence for each round. The delay between notes gets less
every round to make things harder. 

## Code

```python
from microbit import *
import random
import music

buttons = ['A', 'B']
notes = ['E', 'A']

def button_a_pushed():
    display.show(Image.ARROW_W)
    music.play(notes[0])

def button_b_pushed():
    display.show(Image.ARROW_E)
    music.play(notes[1])
    

def generate_random_sequence(length):
    return[random.choice(buttons) for i in range(length)]

def play_sequence(sequence, delay):
    for item in sequence:
        if item == 'A':
            button_a_pushed()
        elif item == 'B':
            button_b_pushed()

        sleep(delay)
        display.clear()

playing = True
sequence_length = 1
space_between_notes = 1_500

while playing:
    simon_sequence = generate_random_sequence(sequence_length)
    player_sequence = []

    play_sequence(simon_sequence, space_between_notes)

    # wait for sufficient input
    while len(player_sequence) < len(simon_sequence):
        if button_a.was_pressed():
            button_a_pushed()
            player_sequence.append('A')
        elif button_b.was_pressed():
            button_b_pushed()
            player_sequence.append('B')
        sleep(200)

    # check the sequence matches
    if simon_sequence == player_sequence:
        display.show(Image.HEART)
        music.play(music.POWER_UP)
        sequence_length += 1
        space_between_notes = max(100, space_between_notes - 50)
        sleep(2_000)
    else:
        # no match, end the game
        display.show(Image.SAD)
        music.play(music.POWER_DOWN)
        playing = False
```
