---
permalink: 2024/10/20/microbit-birdsong/
layout: post
title: Microbit Bird Song

tags: [code, microbit, python]
---

Playing around with sounds on the microbit, I had an idea for a dawn chorus kind of thing. Originally it was an example using robot beeps and boops and R2D2-like chirps but I have settled on a slightly easier to understand version using just words to sound a little like birds in the trees. 

## Code

We can flash this code to several microbits and use the buttons to pick a different "bird" for each one then let them hoot and squawk away to themselves.

I added a sound check to perhaps allow each microbit to listen to the others and 
in the way that birds do, if they hear someone else cheeping nearby will increase 
their territorial cheeping to drown them out. 

```python

from microbit import *
import random
import speech

display.show(Image.DUCK)
sleep(1000)

# bird calls
cuckoo = ["cuckoo"]
tweet = ["tweet", "tweet tweet"]
cheep_cheep = ["cheep", "cheep cheep"]
hoot = ["hoo"]
twit_twoo = ["twit twoo", "two hoo", "hoo"]
parrot = ["polly want a cracker", "pretty polly", "squawk!"]

birds = [cuckoo, tweet, cheep_cheep, hoot, twit_twoo, parrot]
bird = 0

sound_threshold = 100  # 255 max
microphone.sound_level()  # discard first

while True:

    if button_a.was_pressed():
        bird = max(0, bird - 1)

    if button_b.was_pressed():
        bird = min(bird + 1, len(birds))

    if bird == len(birds):
        calls = random.choice(birds)
        call = random.choice(calls)
    else:
        calls = birds[bird]
        call = random.choice(calls)

    display.set_pixel(2, 2, 9)
    speech.say(call)
    display.set_pixel(2, 2, 0)

    # listen to surrounding noise
    if microphone.sound_level() >= sound_threshold:
        time_to_next_call = 500
    else:
        time_to_next_call = random.randint(500, 5000)

    sleep(time_to_next_call)

```

In retrospect, the voice synth on the microbit isn't very good for creating understandable words (unless you know what it's trying to say). I think this would be improved by 
using the music API and trying to replicate at least the pitches of birdsong, if not the identical noises.
