---
layout: post
title: Microbit Spying
tags: [microbit, python]
---

Reading about something entirely unrelated today I stumbled on a wikipedia 
article about [Numbers Stations](https://en.wikipedia.org/wiki/Numbers_station), 
a radio broadcast of seemingly random numbers that were believed to be used to 
communicate secret messages to spies under cover somewhere in the world. 

The example on the website broadcasts an "announcing" tune then a person 
reads out five numbers and repeats them. So, I decided to make a numbers station 
of my own for the microbit. 

The tune in the example is called "The Lincolnshire Poacher" and I managed to 
find some [sheet music for it](https://cdss.org/publications/listen/song-of-the-month/may-2020-the-lincolnshire-poacher/) in F#. It took me a couple of minutes to transcribe it into the microbit music DSL and from there it was pretty much plain sailing. The tune is broadcast three times then the secret code 
is repeated twice. 


## Code

```python
from microbit import *
import random
import speech
import music

tune = [
    # O tis my delight on
    "B4:2", "A:1", "G:2", "G:1", "G:1", "F#:1",
    # a shin-y night in the sea-
    "E:1", "D:2", "C:1", "B3:1", "D4:1", "D:1", "G:2",
    # -son of the year
    "G:1", "A:2", "F#:1", "G:2"
]
music.set_tempo(bpm=60)
zero_to_nine = list(range(10))

while True:
    # pick a five number "code" at random
    code = []
    for x in range(5):
        code.append(random.choice(zero_to_nine))

    # play tune
    display.show(Image.MUSIC_QUAVERS)
    sleep(1000)

    for x in range(3):
       music.play(tune)
       sleep(500)
    
    # broadcast secret code
    display.show(Image.PACMAN)
    for x in range(2):
        for number in code:
            speech.say(str(number), pitch=40, speed=90, throat=110, mouth=105)
            sleep(500)
        sleep(1000)

    # wait for next one
    display.show(Image.ASLEEP)
    sleep(random.randint(10_000, 60_000))

```

Apparently codes were broadcast daily or perhaps hourly but for our 
example I am picking a new set of codes every 10 to 60 seconds. 

I played around with some of the speech settings but could not reliably 
get anywhere close to the diction of the person in the wikipedia example. 
