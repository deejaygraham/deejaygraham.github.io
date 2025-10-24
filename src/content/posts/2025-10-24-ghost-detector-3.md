---
title: Ghost Detector 3
tags: [microbit, spooky]
---

<canvas id="mb1" width="721" height="565" data-microbit="99999:90909:99999:99999:90909"></canvas>

I had some feedback from trainers that the new improved ghost detector from 
last year was overly complicated and relied too much on the class construct 
which their students weren't working with, so could I make a version that 
was simpler and could store the number of ghosts logged over time? 

This gave me the opportunity to try out the microbit internal file system which 
I haven't played with very much up to this point


## Features

One thing I couldn't let go was the ghost image fading out as I think this adds 
some atmosphere to the piece that adds to the spookiness. The rest of the code 
is unchanged but without any of the really fancy graphics. We check for a ghost 
text file at start up and save the current score each time we find a ghost (caused 
by the internationally agreed method of finding cold spots) and, if the device is 
not re-flashed, the score is persisted until the device is shaken.


## Code

```python 
from microbit import *
import os 

def FadeOut():
    for frame in range(0, 9):
        for x in range(0, 5):
            for y in range(0, 5):
                value = display.get_pixel(x, y)

                if value > 0:
                    display.set_pixel(x, y, value - 1)
        sleep(100)

ghost_data_file = "ghost.txt"

def GhostScoreExists():
    files = os.listdir()
    for f in files:
        if f == ghost_data_file:
            return True
    return False

def SaveGhostScore(score):
    with open(ghost_data_file, 'w') as f:
        f.write(str(score))

def LoadGhostScore():
    with open(ghost_data_file, 'r') as f:
        score = f.read()
        return int(score)
    
# fade in 
display.show(Image.GHOST)
sleep(5_000)
FadeOut()

score = 0

if GhostScoreExists():
    score = LoadGhostScore()

display.scroll(str(score) + " ghosts")

start_temperature = temperature()
temperature_sensitivity = 1 # degree difference

while True:

    # clear out current score
    if accelerometer.was_gesture("shake"):
        score = 0
        SaveGhostScore(score)
        display.scroll(str(score) + " ghosts")
        
    display.clear()
    temperature_now = temperature()
    # have we had a drop in temp?
    if (start_temperature - temperature_now) > temperature_sensitivity:
        display.scroll('Boo!')
        display.show(Image.GHOST)
        sleep(5_000)
        FadeOut()
        score += 1
        SaveGhostScore(score)
        display.scroll(str(score) + " ghosts")

        sleep(3_000)

```
