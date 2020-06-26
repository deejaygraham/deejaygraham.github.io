---
layout: post
title: Autonomous Microbit Vehicle
published: true
categories: [code, microbit]
hero: microbit
thumbnail: "/img/posts/autonomous-microbit-vehicle/thumbnail-420x255.jpg"
alttext: autonomous vehicle
---

Another great facility built into the <a href="http://4tronix.co.uk/blog/?p=1490">BitBot</a> is that it comes with two
light sensors built into the underside so that we can sense changes in light reflection coming from the floor. The sensors
report a binary value depending on whether they are "seeing" a reflection (white) or no reflection (black). They are arranged
on separate sides of the vehicle chassis so that we can build a track using <a href="http://robotsquare.com/wp-content/uploads/2012/11/linefollowtiles.pdf">printable
squares</a> and use the sensors to keep us on the straight and narrow.



### Line Sensor

The two sensors are wired to two different digital input pins on the microbit and we can query each individually. If we can see
equal reflections from both sensors we assume we are travelling in a roughly straight line (or at least not hit an edge). 

![straddling the line](/img/posts/autonomous-microbit-vehicle/straddling.jpg)


When we see a difference in sensors we know we have hit an edge and need to correct by turning in the opposite direction.

![too far left](/img/posts/autonomous-microbit-vehicle/too-far-left.jpg)

![too far right](/img/posts/autonomous-microbit-vehicle/too-far-right.jpg)


```python

{% include code/python/microbit/bitbot-linesensor-1.py %}

```

### BitBot

Building the line sensors into the [BitBot class]({% link _posts/2019-05-16-microbit-motoring.md %}) we can switch it to autonomous
mode and watch while it "feels" its way around any sort of track we can devise.

```python

{% include code/python/microbit/bitbot-linesensor-2.py %}

```

### Demo

Here is the finished vehicle running around a test track at one of our work open days.

![starting off](/img/posts/autonomous-microbit-vehicle/autonomous-1.png)

![running round the track](/img/posts/autonomous-microbit-vehicle/autonomous-2.png)

Occasionally the vehicle would leave the track (I think the reflectivity of the sellotape holding the tiles together was to blame) and meander away, reading the colours of the floor tiles
and the varying surfaces under its wheels until it was eventually rescued.
