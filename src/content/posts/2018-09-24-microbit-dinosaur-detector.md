---
layout: post
title: Microbit Dinosaur Detector
categories: [ code, microbit ]
published: true
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

It's been a while since I posted a microbit sample so here's one that would work well on the set of Jurassic Park, a dinosaur detector. 

As you will know from the film, the way you know the T-Rex is approaching is by standing a glass of water on the dashboard of your 
stranded Jeep. As the dinosaur approaches, the vibrations from it's stamping cause ripples in the water so you know when to panic. 

The accelerometer in the microbit works well as a crude vibration detector. We note the current x and y orientation of the microbit at 
start up and watch for a change. 

```python

{% include 'code/python/microbit/dinosaur-detector.py' %}

```

The "pinger" is a battlestar galactica style roving pixel to show that the microbit is alive and monitoring 
it's environment for dinosaurs. The water ripple animation is there in place of the dashboard water and the giraffe icon is the closest 
stock image I could get to a sauropod.  

This is the first time I'm trying a version of one of these examples using classes instead of exclusively inline code. I think the 
behaviour of the detector and the scanning "pinger" warranted a little bit extra verbosity to make the main loop a bit more compact. 