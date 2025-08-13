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
{% microbit frames, "blink" %}


## Code 

```python

from microbit import *

@run_every(s = 1)
def blink():
  pixel = display.get_pixel(0, 0)
  pixel = 9 if pixel == 0 else 0
  display.set_pixel(0, 0, pixel)

```

## Scanning

The ghost and dinosaur detectors I wrote a while ago feature a sweeping scanner animation to show that the microbit was 
waiting for something to happen, emulating a radar or something. That code could be adapted using run_every to maybe make it 
a bit nicer. This does rely on a few more global variables but doesn't require a class so possibly more understandable by students.

{% set frames = ["90000:90000:90000:90000:90000", "09000:09000:09000:09000:09000", "00900:00900:00900:00900:00900", "00090:00090:00090:00090:00090", "00009:00009:00009:00009:00009"] %}
{% microbit frames, "scanner", 150 %}

```python

show_scanner = True # Turn scanner animation on or off
scan_position = 2
scan_direction = 1

@run_every(ms = 150)
def sweep_scanner():

  if not show_scanner:
    return
  
  def draw_line(x, brightness):
    for y in range(5):
      display.set_pixel(x, y, brightness)

  global scan_position, scan_direction
  draw_line(scan_position, 0) # erase current line

  # edge detection
  if scan_position >= 4 or scan_position <= 0:
    scan_direction = -scan_direction

  # move scan line
  scan_position = max(0, min(4, scan_position + scan_direction))
  draw_line(scan_position, 9) # draw new line
  
```

Note there is no while loop or anything else unnecessary in the code, just a lovely blinking light in the top corner of the screen. 
