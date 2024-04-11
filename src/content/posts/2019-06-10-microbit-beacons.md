---
layout: post
title: Microbit Beacons
published: true
categories: [ code, microbit ]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
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


### Beacon

We'll start off with a simple beacon, broadcasting some text every half a second. 

```python

{% include 'code/python/microbit/hot-beacon.py' %}

```


### Receiver

Our receiver shouldn't care what the message is, just how strong the signal is. We convert the 0-255 scale into a percentage 
signal strength. 


```python

{% include 'code/python/microbit/hot-receiver.py' %}

```

Place the beacon somewhere out of the way (or have someone else place it) then walk around and try to find it based 
purely on signal strength. You can use the radio config option to change the radio power to suit the size of 
the space you are working in. 


## Simple Treasure Hunt

Now that we can send and receive messages from a single beacon, we can program several of them with unique ids, 
hide them around the local environment and use them as the basis for a simple treasure hunt. Each beacon can be 
given a text name or a number which it broadcasts. The treasure hunter has a receiver listening for any radio signal 
and completes the "hunt" by checking off each of the beacons that they find. 


### Beacon 

Here's a simple beacon with a hard-coded id. Each beacon will need a different id flashed onto it. 

```python

{% include 'code/python/microbit/simple-beacon.py' %}

```

Alternatively, a slightly fancier beacon can be programmed with a dynamic id using the a and b buttons like this:

```python

{% include 'code/python/microbit/programmable-beacon.py' %}

```

Each beacon is flashed with the same code and it's up to the person doing the hiding to program each one with a 
unique number before hiding them. 


## Full Treasure Hunt

Finally, instead of a simple id, we can embed clues to a treasure hunt trail in the beacons so that each beacon 
can be configured to broadcast one clue. By sending the beacon's id out with the clue, we can even program 
the receiver to accept the clues in sequence so that the hunter has to visit the beacons in the correct 
order to make sense of the clues. 


### Beacon 

```python

{% include 'code/python/microbit/treasure-hunt-beacon.py' %}

```


### Receiver

```python

{% include 'code/python/microbit/treasure-hunt-receiver.py' %}

```

There are lots of variations you can explore once the system is up and running:

* Change the receiver to remind you about the last clue
* Draw a starting image
* Draw an image to show when the beacon is broadcasting.
* Change the code to make a Pokemon Go collecting game. Instead of clues, beacons can 
broadcast an image of a Pokemon and the hunter has to collect them all. 

Adjust the power from each beacon to make it more challenging. If you are playing with more than 
one group in an area, consider changing the radio channel for each group so the clues belonging 
to each group don't interfere with each other.
