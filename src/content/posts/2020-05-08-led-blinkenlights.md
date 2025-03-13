---
title: Microbit LED blinkenlights
tags: [code, microbit]
hero: microbit
thumbnail: /img/posts/led-blinkenlights/thumbnail-420x255.webp
alttext: microbit
---

I found some old bits of electronics hiding in a box in storage the other day so I was reminded of my past electronics history but also inspired to
make a couple of simple circuits that would work with the digital IO on the microbit.

### LEDs

A lot of electronics work without an externally visible sign that anything is going on. An LED is one of the most simple electronic devices that
does something that someone can actually see and appreciate that there is work happening. The standard circuit for an LED to work looks like this.

![led circuit](/img/posts/led-blinkenlights/led-circuit.webp)

The battery provides the voltage, the LED will light up when current is flowing through it in the right direction and the resistor is there to make sure
that the LED doesn't try to take up too much current and blow itself up.

LEDs have a long leg (positive) and a short leg (negative) that can be used when orienting them in a circuit. If the LED is soldered down, the legs are usually
cut to the same length. Luckily, the body of the LED also has a flat side to it which also marks the negative end of the device.

![led package](/img/posts/led-blinkenlights/led-package.webp)

If the LED is connected up the "wrong" way round, no current will flow and the light won't be lit but the circuit won't break.

### Experimentation

Now that we have the basics straight, we need to think about how to do this with a microbit in control. A digital IO pin on the edge connector can be connected to
our circuit in place of the top of the battery part of the circuit and the other end of the circuit attached to the GND pin on the edge connector.

![microbit io](/img/posts/led-blinkenlights/microbit1.webp)

Here I have attached two wires to the edge connector, to pin 1 and to the gnd pin.

A "breadboard" is a sort of staging area for circuits to be constructed while being developed before the design is committed to a more permanent form, say as
a printed circuit (PCB). In the picture below, I connected the wire from pin 1 to the left hand + column on the breadboard and the gnd wire to the right hand -
column. In between we have the LED connected between the + and a slot in the middle of the breadboard. The resistor connects to that and to the - column to
complete the circuit.

![breadboard](/img/posts/led-blinkenlights/breadboard1.webp)

### Code

```python

{% include 'code/python/microbit/digital-io-led.py' %}

```

As a debugging aid, I elected to wrap the digital IO functionality in a function so that I could blink the central LED on the internal display at the
same time as I was turning on and off the output pin.

Here's the working circuit:

![circuit gif](/img/posts/led-blinkenlights/led-green.gif)

Now I have my wiring and breadboard and breakout edge connector to hand, I'll try to post some more electronics projects.

### Traffic Lights

From one LED to a number of them is a matter of replicating what we have already done and assigning each LED to a different out. To take the traffic light
example where we cycle between green, red, amber and back to green, each LED has to be assigned to a workable digital io pin (see <a href="https://microbit-micropython.readthedocs.io/en/latest/pin.html" >here for reference</a>) on a separate portion of the breadboard.

```python

{% include 'code/python/microbit/traffic-lights.py' %}

```
