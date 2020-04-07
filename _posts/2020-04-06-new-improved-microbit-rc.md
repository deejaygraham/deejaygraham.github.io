---
layout: post
title: New, Improved, Microbit RC
published: true
categories: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.jpg"
alttext: microbit sorting hat
---

I've been refinining some of my code from the original remote control car I built using the <a href="http://4tronix.co.uk/blog/?p=1490">BitBot</a> kit 
across several posts last year.

Things like the remote steering, general handling of the car, some nice features like using the neopixels to signal braking and reversing.

Thinking about it over the last few months I came up with some interesting features and had to work around some limitations. The code is still split between 
two programs, the car itself and the remote control. 
 
## Car

### Motor

First, there were a couple of functions that weren't being used in the motor class so I removed those. 

```python

{% include code/python/microbit/bitbot-rc2-1.py %}

```

### Memories

All the way through the updates, I have been struggling to fit all the car code onto the microbit without running into memory allocation 
errors. It seems that organizing code into classes and having comments, whitespace and long variable names all contribute to added memory requirements. As I 
went along I took the opportunity to remove some nice-to-have constants and replace them with literals, cut out unused code and did my best to 
remove anything extraneous to leave me some space for extra features. 


### Neopixels

Next, I added the neopixels in as a permanent addition to the car with forward headlights, reverse and brake lights and "blinkers" for left and right 
indication, even though they don't blink they way they would in a real car.

```python

{% include code/python/microbit/bitbot-rc2-2.py %}

```
I also tried to improve the code for each of the light functions by adding a way of turning off each set of lights instead of creating two function for each 
light arrangement. Setting the "colour" of a led to be (0, 0, 0) turns the led off.


### BitBot

The bitbot class draws together the motors, neopixels and is responsible for managing its current direction and speed. 

I moved the speed controls into the bitbot class because that seemed a better split for the code and meant I had less to get wrong in the main application and again fewer variables which helps with memory over all. 


#### Lights 

I added a direction member to the class so that a single function (update_lights) can be responsible for handling all the lights that I am interested in. The rear two lights serve as brake and reverse lights, switching from red (braking or stopped) to white (reverse). Steering left or right is indicated by two of the 
corresponding leds on the side lighting up in orange.

Finally, the headlights are automatically controlled by using the light sensor on the microbit display. With not enough light falling on the car, it will turn 
on it's headlights automatically. This is where the ability to pass a flag to turn off the lights came into its own. 

```python

{% include code/python/microbit/bitbot-rc2-3.py %}

```

The steering has changed in this version. It used to turn in a circle left or right by rolling forward on one wheel and in reverse on the other. Now I have kept it moving in the same direction but decreased the turning side to half speed which means that controlling where to turn is a bit more predictable. 


```python

{% include code/python/microbit/bitbot-rc2-4.py %}

```

```python

{% include code/python/microbit/bitbot-rc2-5.py %}

```

```python

{% include code/python/microbit/bitbot-rc2-6.py %}

```

```python

{% include code/python/microbit/bitbot-rc2-7.py %}

```

```python

{% include code/python/microbit/bitbot-rc2-8.py %}

```
