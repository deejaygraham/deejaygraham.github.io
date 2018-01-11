---
layout: post
title: Blinking C++
published: true
tags: [ code, microbit ]
---

Following hard on the heels of the last post, I decided to try to implement one of the
other canonical examples from the MicroPython world, blinking one of the LEDs on and off
repeatedly.

In MicroPython we would typically create a "forever" while loop and turn on the centre LED,
wait a while, turn it off, wait again and repeat. In C++, that translates pretty faithfully to:

<script src="https://gist.github.com/deejaygraham/76e2bf80980db73e3396ab233d360e60.js"></script>

Again, the way that the objects are built is very anti-Law-of-Demeter but at least keeps
all the components in a sort of logical structure. Changing pixel values is done by chaining
calls through objects: Microbit -> Display -> Image -> SetPixelValue.

The other thing to note is that in MicroPython the values 0..9 are used for LED off
and full brightness. In the C++ version, the values are in the range 0..255.
