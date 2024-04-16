---
permalink: 2019/09/13/psychic-microbit-night-light.html
layout: post
title: Psychic Microbit Night Light
published: true
categories: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

I've always been envious of the block-based platforms for microbit because they seemed to be able to use the display
as a light meter to read the ambient light level in the room. I always thought this wasn't available in the python
library until I noticed <a href="https://microbit-micropython.readthedocs.io/en/latest/display.html?#microbit.display.read_light_level">this in the documents</a>.

Excellent, I can use the light meter to add some more interactivity to a coding activity.

## Experiments

An early idea for an experiment was to create a simple burglar alarm. The idea was to "arm" a device in a darkened room, or
a closed box, that you want to protect. Monitor the light level and if it goes up beyond a specific threshold, then sound an
alarm, display a message, whatever. Something like this:

```python

{% include 'code/python/microbit/burglar-alarm.py' %}

```

The print statement is useful in the REPL for working out a suitable light level threshold for triggering.

Leading on from that, I thought I could create something of the exact opposite of that - a nightlight that turns on the display
when the light level gets too low. Unfortunately this is where the dual function of the display as an input and output device
shows a weakness. When it's dark enough to turn on, lighting the display LEDs causes the amblient light level to rise which
in turn switches off the nightlight, which, now that it's momentarily dark again, tries to turn on.

One way around that is to make it a one-way function so that it will not turn off again once it turns on (not super useful), or
maybe to use the digital IO pins to signal to an electronic circuit to turn on. We could also implement some hysteresis in the
system so that the slightly raised light level caused by turning on the LEDs doesn't make the program think it's now light/morning
and it should turn off again.

## Psychic Nightlight

Rather than those reasonable options I decided to go for the psychic option. Split the nightlight into to halves. A sensor which can be
placed on a window sill and maybe monitor outside light and a second unit which will act inside the room as the actual nightlight
(and won't be close enought to the sensor to trigger itself back off again). The two units will communicate via radio with the
nightlight just reacting to commands to turn on or off based on what it is sent by the sensor unit. Hence the nightlight psychically
knows what the outside light is like without actually seeing it.

## Sensor

```python

{% include 'code/python/microbit/psychic-nightlight-sensor.py' %}

```

I also added a configurable darkness level so we can adjust for variations throughout the year.

## Nightlight

```python

{% include 'code/python/microbit/psychic-nightlight.py' %}

```
