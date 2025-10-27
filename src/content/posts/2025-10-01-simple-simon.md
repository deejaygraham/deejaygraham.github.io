---
title: Simple Simon Game
tags: [microbit, code]
---

I haven't posted a game in a while so here's a very simple recreation of the ["Simon" game](https://en.wikipedia.org/wiki/Simon_(game)) 
which uses the two buttons on the front of the microbit and the touch logo but could be broken out into a full electronic 
project to have four lights and four buttons. LEDs could be driven from the edge connector with some 
extra components and the buttons could be read into the digital inputs.

For now and simplicity, we only have the two buttons (A and B) and the logo and three musical notes to deal with although I have provided some 
abstraction for the original four coloured buttons - green, red, blue and yellow. The button pushes available in this 
reduced version means that the sequence is also limited to random choices between those buttons. The game starts 
with a single note and adds a random note to the sequence for each round. The delay between notes gets less
every round to make things harder. 

## Code

```python
from microbit import *
import random
import music

# Original Buttons Green, Red, Blue, Yellow
BLUE = 'B'
GREEN = 'G'
RED = 'R'
YELLOW = 'Y'

# buttons = [BLUE, YELLOW, RED, GREEN]
buttons = [BLUE, YELLOW, RED] # We only use these buttons 
notes = ['E4', 'C#', 'A', 'E3']
question = Image('09990:90009:00990:00000:00900')

def blue_button_was_pushed():
    return button_a.was_pressed()

def blue_button():
    display.show(Image.ARROW_W)
    music.play(notes[0])

def yellow_button_was_pushed():
    return button_b.was_pressed()

def yellow_button():
    display.show(Image.ARROW_E)
    music.play(notes[1])
    
def red_button_was_pushed():
    return pin_logo.is_touched()

def red_button():
    display.show(Image.ARROW_N)
    music.play(notes[2])

def green_button_was_pushed():
    return False # not implemented yet

def green_button():
    display.show(Image.ARROW_S)
    music.play(notes[3])

def generate_random_sequence(length):
    return[random.choice(buttons) for i in range(length)]

def play_sequence(sequence, delay):
    for item in sequence:
        if item == BLUE:
            blue_button()
        elif item == YELLOW:
            yellow_button()
        elif item == RED:
            red_button()
        elif item == GREEN:
            green_button()

        sleep(delay)
        display.clear()

playing = True
sequence_length = 1
space_between_notes = 1_500

while playing:
    simon_sequence = generate_random_sequence(sequence_length)
    player_sequence = []

    play_sequence(simon_sequence, space_between_notes)
    display.show(question)
    
    # wait for sufficient input
    while len(player_sequence) < len(simon_sequence):
        if blue_button_was_pushed():
            blue_button()
            player_sequence.append(BLUE)
        elif yellow_button_was_pushed():
            yellow_button()
            player_sequence.append(YELLOW)
        elif red_button_was_pushed():
            red_button()
            player_sequence.append(RED)
        elif green_button_was_pushed():
            green_button()
            player_sequence.append(GREEN)
            
        sleep(200)

    # check the sequence matches
    if simon_sequence == player_sequence:
        display.show(Image.HEART)
        music.play(music.POWER_UP)
        sequence_length += 1
        space_between_notes = max(100, space_between_notes - 50)
        sleep(2_000)
    else:
        display.show(Image.SAD)
        music.play(music.POWER_DOWN)
        playing = False
```
