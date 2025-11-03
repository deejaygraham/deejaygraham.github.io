---
title: Hourglass
tags: [microbit]
---

<canvas id="mb1" width="721" height="565" data-microbit="9:9:0:0:0|99099:9:00500:0:0|99099:9:0:0:00900|99009:9:0:0:00900|99009:9:00500:0:00900|99009:9:0:0:00990"></canvas>

Here's a small project to model a simple hourglass timer that animates "sand" pixels falling from the top, 
through the middle and filling up the bottom of the screen. 

This is a great starting point for teaching about the microbit's accelerometer and making the code more interactive. 
At the moment, I am waiting for a shake before I start the timer but this could be taken a lot further by inspecting 
the z value of the microbit to see which way it is stood - on the edge connector or upside down - and making the sand 
fall the correct way, either top to bottom (y increasing) or bottom to top (y decreasing). This makes the animation 
so much more believable rather than always having to be in the correct orientation.


## Code

The animation is driven by two lists of coordinates - one for which pixels will "drain" out of the top in what order, 
and how the pixels on the bottom will "fill" from the falling sand. 

```python 
from microbit import *

drain_order = [(2, 0), (3, 0), (1, 0), (4, 0), (0, 0), (4, 1), (0, 1), (1, 1), (3, 1), (2, 1)]
fill_order  = [(2, 4), (1, 4), (3, 4), (2, 3), (1, 3), (0, 4), (3, 3), (4, 4), (4, 3), (0, 3)]

centre_pixel = (2, 2)

while True:
    if accelerometer.was_gesture('shake'):
        # show all at top...
        for y in range(2):
            for x in range(5):
                display.set_pixel(x, y, 9)
        # now allow sand to drain out into the bottom
        for drain in drain_order:
            # drop pixel from top ...
            display.set_pixel(drain[0], drain[1], 4)
            # ... into centre ...
            display.set_pixel(centre_pixel[0], centre_pixel[1], 4)
            sleep(100)
            # ... into bottom
            display.set_pixel(centre_pixel[0], centre_pixel[1], 0)
            fill = fill_order.pop(0)
            display.set_pixel(fill[0], fill[1], 4)
            sleep(900)
```
