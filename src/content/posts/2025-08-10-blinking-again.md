---
layout: post
title: Blinking Again
tags: [microbit, python]
---

I freely admit a lot of my understanding and use of Python has been on a self-taught and need-to-know basis but one function in the 
[docs](https://microbit-micropython.readthedocs.io/en/v2-docs/) interested me and mentioned something I wasn't aware was a thing 
in Python and particularly in MicroPython. Decorators on functions are common in other languages but for some reason I have never 
come across them in working with the microbit until, that is, I noticed the 
[run_every function]([https://microbit-micropython.readthedocs.io/en/v2-docs/](https://microbit-micropython.readthedocs.io/en/v2-docs/microbit.html#microbit.run_every))

Unsurprisingly, it is described in the docs as a decorator that can run code on a timed interval. Awesome, so that means I can super simplify 
my original blinkenlights code.

{% set frames = ["90000:00000:00000:00000:00000", "00000:00000:00000:00000:00000"] %}
{% microbit frames %}


## Code 

```python

from microbit import *

@run_every(s = 1)
def blink():
  pixel = display.get_pixel(0, 0)
  pixel = 9 if pixel == 0 else 0
  display.set_pixel(0, 0, pixel)

```

Note there is no while loop or anything else unnecessary in the code, just a lovely blinking light in the top corner of the screen. 
