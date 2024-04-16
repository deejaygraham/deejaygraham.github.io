---
permalink: 2019/05/30/micro-debugging/
layout: post
title: Debugging Microbit Sensors
published: true
categories: [microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

The <a href="https://codewith.mu/">mu editor</a> is really coming along nicely with some great
features. The REPL feature (Read - Evaluate - Print - Loop), where you can connect to a microbit over usb and run commands
directly in a console window, has never seemed that useful to me. I find introducing students to
the thought process of debugging their code in their own minds (or rubber-ducking) a better way
to get some concepts solidified in their thinking.

### Sensors

One way the REPL is useful though is in calibrating your code against the microbit's sensors. The
documentation for the temperature or magnetic field sensors or the accelerometer don't give you a good
sense of how these behave in reality. How the amount of tilt in the device in your hands maps to the
value you read from the accelerometer, how linear it is or how it feels is difficult to appreciate
until you can manipulate the device and see what the values look like at specific times.

One approach I used to use was to pepper my code with traditional "debug" calls to display.scroll with each value I was
collecting. That is difficult because the scroll is difficult to read, one or two characters at a time, and
takes a while to progress across the screen so that a reading has changed by the time the last scrolled
character has finished. The REPL allows us to use print() which is echoed back on your local machine, not the microbit.
If we don't have to wait on the slow display scrolling data to surface interesting readings, we can more quickly
develop code using those sensors.

### REPL

First, flash a program to the microbit. Say, one to collect magnetic field sensor data, being careful to
use print statements to pass the data back.

```python

{% include 'code/python/microbit/microbit-repl-temp.py' %}

```

Wait a little while for flashing to finish and the microbit to re-establish communication with your computer.
Open the REPL (see below) and reset the microbit using the button on the back.

![repl](/img/posts/micro-debugging/repl.webp)

You should now see data scrolling up the screen from your program's print statements. You will need to close the REPL window
before you can flash a new program to the microbit.

### Thermometer

Using this new found knowledge we can calibrate a thermometer where each pixel can represent so many degrees of
temperature.

```python

{% include 'code/python/microbit/microbit-temp-sensor.py' %}

```

Count the pixels to know how warm (or cold) it is.

### OS Matters

If you are running mu on the Mac or on Linux, the REPL will work out of the box. If you are running it on Windows you
will probably need to install an mbed device driver.
