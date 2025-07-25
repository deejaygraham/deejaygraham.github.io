---
title: Microbit Empathy
tags: [code, microbit, python]
---

Here's a small program using the radio to communicate between two or more microbits, cleverly titled Empathy. Each shows a static square on the display. When one microbit is shaken,
it broadcasts a message. Any microbit in earshot will then display a "shaken" image animation for a few seconds.

## Code

```python
from microbit import *
import radio
import random

centre_cube = Image("00000:" "09990:" "09990:" "09990:" "00000")

left_cube = Image("00000:" "99900:" "99900:" "99900:" "00000")

right_cube = Image("00000:" "00999:" "00999:" "00999:" "00000")

shake_frames = [centre_cube, left_cube, right_cube]

radio.on()

while True:

    display.show(centre_cube)

    # Shake to send a message
    if accelerometer.was_gesture("shake"):
        radio.send("shake")

    # Read any incoming messages.
    message = radio.receive()
    if message and message == "shake":
        for i in range(1, 5):
            display.show(shake_frames, delay=50)  # , delay=200, wait=False)
```
