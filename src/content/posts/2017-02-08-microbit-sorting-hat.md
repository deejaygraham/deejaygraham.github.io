---
title: Microbit Sorting Hat
tags: [code, microbit, python]
---

Here's a variation on the microbit magic 8 ball example themed after a well-known wizard school franchise and the ritual of deciding who goes into which house. Rather 
than wearing a hat, you can shake the microbit and have it decide on which house you belong in. 

In common with the magic 8 ball, shaking the microbit is the trigger to invoking the program. First, the hat thinks for a while before picking a house at random, showing the 
house logo (more on that) and announcing the name of the house. 

## Code

```python
from microbit import *
import random

# Images for the sorting hat and the four hogwarts houses
hat = Image("07900:" "60750:" "07070:" "09090:" "99999")

# Snake
slytherin = Image("09999:" "90099:" "09940:" "40090:" "09940")

# Badger
hufflepuff = Image("99999:" "90909:" "90909:" "09090:" "00900")

# Claw
ravenclaw = Image("00900:" "00900:" "09990:" "90909:" "90909")

# Sword
gryffindor = Image("00009:" "00090:" "90900:" "09000:" "90900")

choices = [
    ["Slytherin", slytherin],
    ["Hufflepuff", hufflepuff],
    ["Ravenclaw", ravenclaw],
    ["Gryffindor", gryffindor],
]

thinking = [
    "Hmm. Difficult",
    "Very Difficult...",
    "So where shall I put you?",
    "Ah, right then",
    "Hmm, right",
    "Hmm",
    "Okay",
    "Well, I know just what to do with you...",
    "Right, Ok",
    "Not Slytherin, Eh?",
]


# Game loop
while True:

    display.show(hat)

    if accelerometer.was_gesture("shake"):
        display.clear()
        display.scroll(random.choice(thinking))
        sleep(1000)

        house = random.choice(choices)

        # House name...
        display.scroll(house[0])
        # House picture
        display.show(house[1])
        sleep(2000)
```

## Graphics

One of the biggest challenges with this program was coming up a representation of the sorting hat and the four houses that could be
rendered in 5x5 LEDs. The sorting hat wasn't too bad but I had to severely compromise on the houses. I ended up after much experimentation 
and some tweaking with a snake (slyterin), a badger's head (hufflepuff), a claw (ravenclaw) and a sword (gryffindor). None of these will 
win any prizes but they are at least distinct and recognizable (I hope) in 5x5.

### Hat
{% microbit "07900:60750:07070:09090:99999", "hat" %}

### Snake
{% microbit "09999:90099:09940:40090:09940", "slytherin" %}

### Badger
{% microbit "99999:90909:90909:09090:00900", "hufflepuff" %}

### Claw
{% microbit "00900:00900:09990:90909:90909", "ravenclaw" %}

### Sword
{% microbit "00009:00090:90900:09000:90900", "gryffindor" %}

