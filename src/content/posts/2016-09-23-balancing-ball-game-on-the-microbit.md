---
permalink: 2016/09/23/balancing-ball-game-on-the-microbit.html
layout: post
title: Balancing Ball - Writing a Game for the BBC Micro:bit
categories: [ code, microbit ]
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

<script src="https://gist.github.com/deejaygraham/d680fffddd3e9752b51834684d0939af.js"></script>
