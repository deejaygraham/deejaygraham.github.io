---
layout: post
title: Build Monitor on Raspberry Pi
categories: [ code, pi ]
published: true
---

I'm starting a small but slightly ambitious project, around integrating several bits of 
technology that I've never had fully working together so in the spirit of divide-and-conquer 
here's a quick snippet to create a <a href="https://en.wikipedia.org/wiki/Daily_build">build monitor</a> 
on a raspberry pi using some python code, the GPIO library and some basic electronics.


### Electronics

You will need a couple of electronics bits and bobs for this project:

* Raspberry Pi (running Raspbian or similar)
* Breadboard
* Red LED
* 330 Ohm Resistor
* Jumper Wires


### Wiring

The Raspberry Pi has specific pins on the connector set aside for power, ground and GPIO. Refer to the 
<a href="https://www.raspberrypi.org/documentation/usage/gpio/">GPIO documentation</a> to work out which 
pins you want to pick for power and IO (and change the code below if you decide to 
pick different output pins). The IO pins are subtly different on each version of the PI so if you aren't 
sure which Pi you have you can <a href="https://www.modmypi.com/blog/raspberry-pi-comparison-table">find the 
right version here</a>.


<img src="/img/posts/pi-build-monitor/pi-led-test.webp" alt="led circuit" />


### Code

```python

{% include code/python/pi/blinkenlights.py %}

```

Running the code, you should see the LED blinking on and off.


### Build Monitor

Now a build monitor is supposed to keep an eye on a build process and report on good builds 
by showing a green light and failed builds by showing a red light. 

We can add a second coloured LED to the circuit and attach it to a different output pin on the pi. So a 
good build (controlled by a variable for now) will show one LED and a bad build will turn that off and 
turn on the other LED.

```python

{% include code/python/pi/blinkenlights-build-monitor.py %}

```
