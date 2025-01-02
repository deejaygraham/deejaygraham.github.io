---
permalink: 2025/01/02/microbit-bee-game/
layout: post
title: Microbit Bee Game
published: true
tags: [code, microbit, python]
---

A slight variation on the treasure hunt game I posted about a long while ago. This is a game for three sets of players or can work with two "NPC" players and the bees played by humans. 

## The Setup

The idea is for there to be several flowers hidden of in view with pollen to collect, a hive which acts as a repository for the pollen and feeds the bees, and a number of bees whose job it is
to collect pollen from the flowers and transport it back to the hive. 


## Code

The flower is the simplest of programs, it simply sends a "pollen" message out by radio every so often and has the radio power turned down so that the bees need to be quick close to be able to 
pick it up. The flowers can be hidden or they can be decorated with cardboard flowers if they are in plain sight. Using cardboard on top of the microbit does not harm the radio signal. If the radio signal
is too strong or too weak, that can be tweaked in the radio config at the start of the program. 

### Flower.py

```python
from microbit import *
import radio

display.scroll('flower')
display.show(Image.HAPPY)

radio.on()
radio.config(power=2)

while True:
    radio.send('pollen')
    sleep(1000)

```

If needed, you could introduce a finite amount of pollen produced per minute or simply increase the sleep time so that a bee takes longer to fill up with pollen.


### Hive.py

The hive listens for radio messages from bees and increases it's collection of pollen each time a message is received from a bee. For greater realism, I have added a process which 
consumes the pollen to model bees and larvae consuming what is brought in by the workers. There is also a meter showing how full the hive is currently.

```python
from microbit import *
import radio

def show_pollen_level(pollen):
    count = 0
    # draw from bottom up
    for y in range(4, -1, -1):
        # draw from left to right
        for x in range(5):
            count += 1
            if pollen >= count:
                display.set_pixel(x, y, 9)
                
            
display.scroll('hive')

pollen = 0
MAX_POLLEN = 25
CONSUMPTION_SPEED = 5000

radio.on()

time1 = running_time()

while True:

    if accelerometer.was_gesture('shake'):
        pollen = 0

    # receive pollen from a bee
    message = radio.receive()
    
    if message and message == 'pollen':
        pollen = min(pollen + 1, MAX_POLLEN)

    if pollen == 0:
        display.show(Image.SAD)
    else:
        display.clear()
        show_pollen_level(pollen)

    # consume some of the pollen in the hive
    time2 = running_time()
    if time2 - time1 >= CONSUMPTION_SPEED:
        pollen = max(pollen - 1, 0)
        time1 = time2
    
```

### Bee.py

The most complicated program is the bee which collects pollen from the flowers using the radio and sends chunks of pollen to the hive by using the buttons. There is a simple 
meter for the bee to show how much pollen they have collected. Crucially, the bee can only hold 5 units of pollen at a time, while the hive can hold 25 units. 

```python
from microbit import *
import radio

def show_pollen_level(pollen):
    count = 0
    for y in range(4, -1, -1):
        count += 1
        if pollen >= count:
            for x in range(5):
                display.set_pixel(x, y, 9)


display.scroll("bee")

pollen = 0
MAX_POLLEN = 5

radio.on()

while True:

    if accelerometer.was_gesture("shake"):
        pollen = 0

    # download pollen to the hive
    if button_a.was_pressed() or button_b.was_pressed():
        if pollen > 0:
            radio.send("pollen")
            pollen = max(pollen - 1, 0)

    # receive pollen from the flower
    message = radio.receive()

    if message and message == "pollen":
        pollen = min(pollen + 1, MAX_POLLEN)

    show_pollen_level(pollen)

```
