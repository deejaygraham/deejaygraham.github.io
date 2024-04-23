---
permalink: 2024/02/10/microbit-supercomputer/
layout: post
title:  Microbit Super Computer
published: true
tags: [code, microbit, python]
---

A slightly larger microbit application today with an homage to the [Connection Machine](https://en.wikipedia.org/wiki/Connection_Machine)
super computer that featured in the movie Jurassic Park. More particularly, a microscopic recreation of the LED blinkenlights 
from the CM-5 LED front panel. The wikipedia page shows a gif of one of the "random" patterns that the front panel could show while 
the machine was working.

I have read that the CM-5 used to have several modes for the LED display and that the patterns generated, while looking random, 
were actually carefully curated and based on a specific algorithm. Here I've gone for a slightly simpler approach
generating an initial image and then moving the top and bottom halves of the image in different directions y using the shift_right 
and shift_left functions on image. New stripes of pixels are created to fill in the gap created by each shift and the new image
is recomposed by bit blitting (not a thing I've done since my younger days as a windows programmer) part of the bottom image
onto the top image to create a sort of sliding conveyor belt effect.

{% highlight "python" %}

# Randomly generate an evolving pixel 
# pattern reminiscent of the Connection Machine
# LED front panel 

from microbit import *
import random

pixel_on = 9
pixel_off = 0
pc_chance_on = 60
speed = 300

# Generate a random series of pixels in a 
# vertical strip down the display
def generate_random_strip(image, on_percent, stripe):
    for y in range(0, 5):
        on = random.randint(0, 100)
        brightness = pixel_on if on <= on_percent else pixel_off
        image.set_pixel(stripe, y, brightness)
        
    return image
    
def generate_random_image(on_percent):
    image = Image()
    for x in range(0, 5):
        image = generate_random_strip(image, on_percent, x)
           
    return image 
    
display.scroll('CM-5')

frame = generate_random_image(pc_chance_on)
display.show(frame)

while True:
    top = generate_random_strip(frame.shift_right(1), pc_chance_on, 0)
    bottom = generate_random_strip(frame.shift_left(1), pc_chance_on, 4)
    from_x = 0
    from_y = 2
    from_width = 5
    from_height = 3
    to_x = 0
    to_y = 2
    top.blit(bottom, from_x, from_y, from_width, from_height, to_x, to_y)
    frame = top
    display.show(frame)
    sleep(speed)

{% endhighlight %}


