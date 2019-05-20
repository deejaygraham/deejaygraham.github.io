---
layout: post
title: RC Microbit
published: true
categories: [ code, microbit ]
hero: microbit
---

Building on the Motor and BitBot classes, I decided to build a remote control for the bitbot so I can drive it 
using the radio rather than using hard-coded commands. 


### Remote Control

I decided on single command characters for each direction and to record the last action so that we don't spam 
the receiver with a stream of too many commands when nothing has really changed. 

Tilting the remote control forwards and backwards will send 'forward' and 'back' commands and tilting left and 
right will move as you would expect. With the microbit held in two hands, game controller style, and the usb port facing away from you, x tilt is left and right and y tilt is forwards and back. 

I applied a threshold to the tilt because it's difficult to maintain the 
remote at exactly zero x and y tilt due to natural wobble in your hands. Because the bitbot will continue in one direction until given another command, I made pressing a button or flattening the controller the command 
for 'stop'.

```python

{% include code/python/microbit/bitbot-rc-1.py %}

```


### BitBot

The hard work is mostly done by the remote and the motor control classes from last time. In the bitbot, we just 
check for a new command and react to it with directions.

```python

{% include code/python/microbit/bitbot-rc-2.py %}

```

Helpful in debugging the tilting directions and thresholds, and in making sure the remote and the bitbot were in sync, I made sure 
that both units displayed icons corresponding to the command they were sending or receiving. Arrows for each direction and a square for stop.
