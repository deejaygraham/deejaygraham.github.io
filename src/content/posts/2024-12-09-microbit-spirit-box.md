---
title: Microbit Spirit Box
tags: [code, microbit, python]
---

Thinking about the new DDD North conference coming up in February got me thinking about my last talk - "How to be Psychic" - 
which was about evolutionary design rather than actual psychic powers. Part of the conceit of that talk was taking the 
role of someone who has supernatural powers to create easily changed software designs and I managed to work 
in references to Harry Houdini and modern day ghost hunters. 

This got me thinking about a good way to showcase some of the microbits capabilities - using all (or most) of the sensors 
available to build a "Spirit Box" or [Ghost Box](https://en.wikipedia.org/wiki/Ghost_hunting#Methods_and_equipment)

The idea is for external forces (ghosts) to try to communicate through this piece of technology, saying words in answer 
to questions from the ghost hunter. 

## Code

Here we use temperature, sound, light and just general randomness to decide which (if any) words to return to the main 
code where we then make a random choice and say that word. 

```python
# Spirit Box - monitor a selection of sensor inputs
# and say a random word if one of the sensors is
# triggered

from microbit import *
import random
import speech


# Has the temperature changed?
def temperature_trigger():
    temp_now = temperature()

    if temp_now < starting_temp:
        return ["Cold", "Freezing"]
    elif temp_now > starting_temp:
        return ["Warm", "Hot"]
    return None


# Is there a light source?
def light_trigger():
    if display.read_light_level() > light_threshold:
        return ["Light", "Bright", "See"]
    return None


# Is there a sound ?
def sound_trigger():
    if microphone.sound_level() > sound_threshold:
        return default_word_list
    return None


# Randomly return a word sometimes
def random_trigger():
    if random.randint(1, 100) <= word_probability:
        return default_word_list
    return None


word_probability = 25
light_threshold = 100
sound_threshold = 100
starting_temp = temperature()
default_word_list = ["Hello", "Yes", "No", "Maybe", "Goodbye", "Help", "Spirit", "Here"]
triggers = [temperature_trigger, light_trigger, sound_trigger, random_trigger]

display.scroll("Spirit Box")
display.show(Image.GHOST)

while True:

    for trigger in triggers:
        words = trigger()

        if words:
            word = random.choice(words)
            speech.say(word)
            sleep(random.randint(500, 5000))

    sleep(random.randint(1000, 5000))
```

The thresholds set up at the start of the program were chosen mostly at random so may need tuning when using this for a 
teaching exercise. Of course, more triggers and words can be added.
