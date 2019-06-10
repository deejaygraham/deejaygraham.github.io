---
layout: post
title: Microbit Beacons
published: true
categories: [ code, microbit ]
hero: microbit
---

Radio on the microbit is one of it's best features for interactivity between learners. Here I'll show a couple of examples of 
using the radio to create static beacons (and may be hidden) to broadcast information that can be picked up by someone 
moving around the space with a suitably coded receiver.

### Hot and Cold

As well as simple receiving text messages over the radio, the microbit also supports a 
<a href="https://microbit-micropython.readthedocs.io/en/latest/radio.html#radio.receive_full">full mode</a> which 
returns not just the message text but also the signal strength and a timestamp. We can use the signal strength to get a 
measure of how close or far away we are from a beacon. Signal strength is measured in decibels but comes to us as a 
score from 0 (strongest) down to -255 (weakest).

We'll start off with a simple beacon, broadcasting some text every half a second. 

```python

{% include code/python/microbit/hot-beacon.py %}

```

Our receiver shouldn't care what the message is, just how strong the signal is. We convert the 0-255 scale into a percentage 
signal strength. 


```python

{% include code/python/microbit/hot-receiver.py %}

```

Place the beacon somewhere out of the way (or have someone else place it) then walk around and try to find it based 
purely on signal strength. You can use the radio config option to change the radio power to suit the size of 
the space you are working in. 


