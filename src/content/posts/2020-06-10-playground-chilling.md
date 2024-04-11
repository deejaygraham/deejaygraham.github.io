---
layout: post
title: Circuit Playground Express Moods
published: true
categories: [code, playground]
thumbnail: "/img/thumbnails/playground-420x255.webp"
alttext: circuit playground
---

The latest programmable gadget I've been messing around with has been the <a href="https://learn.adafruit.com/adafruit-circuit-playground-express/overview">Adafruit 
Circuit Playground Express</a>, a device something like the marvellous microbit but with even more sensors, neopixels built in, and it can be programmed with c++ or 
Python.

![red](/img/posts/playground-chilling/red.webp)


## Mood

First off, I wanted to build an "easy" project, something visual, that would show off the neopixels built into the board. I hit on the idea of a "mood" light or a light 
that would cycle through the spectrum of colours, slowly shifting from one to another and cycling around indefinitely. 


## First

First off, the playground express doesn't come with Python pre-installed, it requires a bit of <a href="https://learn.adafruit.com/adafruit-circuit-playground-express/updating-the-bootloader">setup</a> before that can work. 

With the microbit, you can name a source file whatever you want and the editor (<a href="https://codewith.mu/">Mu</a>) will handle flashing the data onto the device. Things 
are a bit different with the express. You have to be connected to the device through the USB and you have to save the code into the top level directory as "code.py". Saving over 
the top of this file will reprogram the device to the new script. 

![top level](/img/posts/playground-chilling/circuitpy.webp)


## Second

Once that's done, to use the neopixels most easily, the express has <a href="https://learn.adafruit.com/welcome-to-circuitpython/circuitpython-libraries">a set of libraries</a> 
that you can copy into the lib folder. For neopixels and colour handling, the fancyled library comes in very useful and it's what I will use in this example.

![lib](/img/posts/playground-chilling/fancyled.webp)


## LEDs

![blue](/img/posts/playground-chilling/blue.webp)

So with that all in place we can begin writing our code. We need to import the circuit playground library to access the buttons and the express variant so we can 
talk to the Neopixels. The pixels are super bright by default so I tend to wind down the brightness at the start and use the a and b buttons to step it up and down 
as required. 


## HSV

To create a single colour, I elected to start with an <a href="https://en.wikipedia.org/wiki/HSL_and_HSV">HSV value</a> of 0 and map that to an RGB colour space. The neopixels 
require that that value be "packed" into a format that it can understand. The reason for picking an HSV value was because we can smoothly iterate through all the supported colours 
just be starting at zero and stepping through a fractional increment each time until we eventually roll over at the maximum, 1.0

![turqouise](/img/posts/playground-chilling/turq.webp)

Each time round the loop we calculate a new colour and update the pixels. The step size and the time between updates is controlled by variables at the top of the program. 


## Code 

```python

{% include 'code/python/playground/mood-lights.py' %}

```

![green](/img/posts/playground-chilling/green.webp)
