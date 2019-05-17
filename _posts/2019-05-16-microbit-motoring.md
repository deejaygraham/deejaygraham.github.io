---
layout: post
title: Microbit Motoring
published: true
categories: [ code, microbit ]
hero: microbit
---

For Christmas last year (I know, a long time ago), I got a <a href="http://4tronix.co.uk/blog/?p=1490">BitBot</a> as 
a present. This is a small robot - motors, lights, sensors, and power pack - you can plug a microbit into an 
be able to control the two motors independently, switch on lights and use the sensors to give the robot a bit of 
"intelligence".

The API for controlling the robots is a little confusing to keep in your head; I kept finding I had to turn the 
robot over to refresh my memory on which pin was connected where. This told me I need to write some abstractions to make 
motor control and using the BitBot a bit easier from client code. 

### Motors

I started by creating a Motor class to represent one of the left or right motors on the BitBot. Each is wired to two different 
output pins, for direction and speed, on the microbit but that detail will be handled by the next level of code up as you 
will see in a minute.


```python

{% include code/python/microbit/bitbot-motor-1.py %}

```


### BitBot

Now we can create a BitBot class which will, at it's simplest, let us display the direction we are moving in and move the 
motors together or independently to turn in a circle. 

```python

{% include code/python/microbit/bitbot-motor-2.py %}

```

### Program

The client program becomes a bit easier to read and understand

```python

{% include code/python/microbit/bitbot-motor-3.py %}

```
