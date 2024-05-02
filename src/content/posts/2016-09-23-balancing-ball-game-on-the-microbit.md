---
permalink: 2016/09/23/balancing-ball-game-on-the-microbit/
layout: post
title: Balancing Ball - Writing a Game for the BBC Micro:bit
tags: [code, microbit]
published: true
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

After getting a little more familiar with the <a href="http://www.microbit.co.uk/">BBC Micro:bit</a> I decided
the best way to learn something about the true capabilities of the platform was to write some code, and
what better way to do that than by creating a fun game?

The micro:bit has a built in led display on one side of the PCB which makes it a good
starting platform for development but that in also brings it's own challenges. The display
is only 5 x 5 pixels. In that case, Quake is probably not going to be on the list of game options.

### The Game

Top of my list of things to experiment with was the built-in accelerometer so I decided
to code a simple ball balancing game, similar to a more elaborate version I had on
an old phone of mine a few years ago.

The idea is that the "ball" (the glowing pixel on the screen) starts off in the middle of the board and moves left or right,
forward or back as the board is tipped one way or the other, as reported by the accelerometer.

The point of the game is to get the ball back into the centre of the board by gently tipping the
board backwards and forwards and adjusting your movements in response to how the ball "rolls around"
on the display. When you do the ball back into the centre, you are rewarded with a smiley face and
the game starts again.

### The Ball

To try and make this game easily readable for learning I tried to stay away from using classes or
anything too exotic. The ball coordinates, an x-y pair, are modelled as a simple list containing two
values. Of course, the big disadvantage with this is that all of the functions to move and draw the ball
have to know the order of the coordinates to be able to use them correctly.

### Tipping Point

The microbit accelerometer has some sophisticated capabilities to be able to recognise named gestures
such as 'shake' but I was only interested in the devices orientation in space for this game so the
<code>accelerometer.get_x()</code> and <code>accelerometer.get_y()</code> functions were
just what I needed. There's also a similar function to report the z reading if you want it. Each value is reported as a  
positive or negative value 0..360.

### Code

Here's the code for the game:

```python
# Balance ball game for microbit

from microbit import *

table_edge = 4
table_centre = 2

def keep_ball_on_table(ball):
    # bounds of led grid
    ball[0] = min(ball[0], table_edge)
    ball[0] = max(ball[0], 0)
    ball[1] = min(ball[1], table_edge)
    ball[1] = max(ball[1], 0)

    return ball

# Accelerometer
def tilt_is_slight(tilt):
    return abs(tilt) < 50

def tilt_is_left(tilt):
    return tilt < 0

def tilt_is_right(tilt):
    return tilt > 0

def tilt_is_up(tilt):
    return tilt > 0

def tilt_is_down(tilt):
    return tilt < 0

# drawing
refresh_in_milliseconds = 50

PIXEL_ON = 9
PIXEL_OFF = 0

def hide_ball_at(point):
    display.set_pixel(point[0], point[1], PIXEL_OFF)

def show_ball_at(point):
    display.set_pixel(point[0], point[1], PIXEL_ON)

display.clear()

# start in centre
ball = [ table_centre, table_centre ]

#light up the centre dot...
show_ball_at(ball)

while True:

    sleep(refresh_in_milliseconds)

    hide_ball_at(ball)

    x_tilt = accelerometer.get_x()
    y_tilt = accelerometer.get_y()

    if tilt_is_slight(x_tilt):
        ball[0] = ball[0] # nothing
    elif tilt_is_left(x_tilt):
        ball[0] -= 1
    elif tilt_is_right(x_tilt):
        ball[0] += 1

    if tilt_is_slight(y_tilt):
        ball[1] = ball[1] # nothing
    elif tilt_is_left(y_tilt):
        ball[1] -= 1
    elif tilt_is_right(y_tilt):
        ball[1] += 1

    ball = keep_ball_on_table(ball)

    # calibraton
    #display.scroll(str(x_tilt) + " " + str(y_tilt))
    show_ball_at(ball)

    if ball[0] == table_centre and ball[1] == table_centre:
        sleep(1000)
        display.show(Image.HAPPY)
        sleep(2000)
        display.clear()
        
```
