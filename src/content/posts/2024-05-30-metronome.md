---
title: Microbit Metronome
tags: [code, microbit, python]
---

My current obsession, and the subject of an upcoming post, is with midi and timing 
on the microbit if that is even possible. As a sort of wind up to that project, I 
wrote a small program to act as a metronome with as accurate a timing as I could manage. 

Some of the existing programs for metronomes on the microbit rely on the music parsing interface and at high speeds, there is a noticeable drift in calling for 
the microbit to interpret, say, an 'A6' message for 1/16th note then fill in the rest of the time with an 'R' rest. This is even more noticeable if there is any other processing to do within the loop.

```python
from microbit import *
import music

tempo_step_size = 5
tempo = 60

tick_frequency = 1760  # super high version of A
tick_duration_milliseconds = 20
display.scroll(str(tempo))

while True:

    down = button_a.was_pressed()
    up = button_b.was_pressed()

    if down and up:
        display.scroll(str(tempo))

    if down:
        tempo = max(10, tempo - tempo_step_size)

    if up:
        tempo = min(tempo + tempo_step_size, 255)

    music.pitch(tick_frequency, tick_duration_milliseconds)
    wait = ((60 / tempo) * 1000) - tick_duration_milliseconds
    sleep(int(wait))
```

Here, I've tried to take up as little time as possible in outputting a pitch. 
A above middle C is 440 but that was too low so I just kept shifting it up in octaves (doubling the frequency) until it sounded right. 

The microbit allows finer control using the pitch API and then manually calculating how long to wait before repeating by using a standard temp to time 
calculation, remembering to subtract the time that the 'tick' took up.

Lastly, while playing with this and adjusting the tempo, I found if I was querying the button pushes separately for each test it became very difficult to change the 
tempo, hence I check once for each time round the loop then use the boolean result several times.
