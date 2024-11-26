---
permalink: 2024/11/25/microbit-snowglobe/
layout: post
title: Microbit Snowglobe
published: true
tags: [code, microbit, python]
---

Winter is here in the northern hemisphere and we have seen the first sprinkling of snow so naturally I started thinking about the microbit. Specifically, could I 
write a very simple snowglob simulator for the microbit? I have played with 
some of the vector physics in processing but didn't want to go that far with this 
and add lots of complexity that others might find hard to replicate - even just to 
type in and follow along. 

Here we start off with a snowglobe that contains 20 "flakes" of snow and they appear lying at the bottom of the screen as a line. When the microbit is shaken, the flakes are randomised into positions above the top of the screen and then allowed to "fall" back onto the bottom of the screen.  

## Snow 

Early versions of this had the flakes all falling at the same rate which meant I 
started to seriously consider if a simple physics engine might be needed but actually when I introduced a small delay between each flake falling, I think I got 
something that looks quite nice. 

I played around with some of the brightness of the pixels to try to simulate flakes that were nearer or farther away from the viewer. 

The decision to push all the flakes up to the top of the virtual screen means that the draw code is a little bit more intricate because calling ```set_pixel()``` with an x or y value outside of the 0..4 range causes an error in the runtime. I do think though that this added complexity is worth it for the effect it achieves.

## Code

```python
from microbit import *
import random

class Snowflake:
    def __init__(self):
        self.x = random.randint(0, 4)
        self.y = 4
        self.brightness = 9

    def draw(self):
        if self.y >= 0:
            display.set_pixel(self.x, self.y, 0)
            
        self.y = min(self.y + 1, 4)

        if self.y >= 0:
            brightness = self.brightness if self.y < 4 else 9
            display.set_pixel(self.x, self.y, brightness)

    def recycle(self):
        self.x = random.randint(0, 4)
        self.y = random.randint(-20, -1)
        self.brightness = random.randint(2, 9)


class SnowGlobe:

    def __init__(self):
        self.snow = []
        self.speed = 0
        for i in range(20):
            self.snow.append(Snowflake())

    def shake(self):
        self.speed = 50
        for flake in self.snow:
            flake.recycle()
            
    def draw(self):
        for flake in self.snow:
            sleep(self.speed)
            flake.draw()
            

globe = SnowGlobe()

snowflake = Image("90909:04940:49094:04940:90909")
display.show(snowflake)
sleep(2000)
display.clear()
        
while True:

    globe.draw()  
    
    if accelerometer.was_gesture("shake"):
        display.clear()
        globe.shake()

```

I'm not super happy with the starting snowflake graphic but it is difficult to 
create a nice sparkly snowflake in a 5x5 grid.

