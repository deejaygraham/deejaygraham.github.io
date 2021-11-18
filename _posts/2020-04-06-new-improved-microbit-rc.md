---
layout: post
title: New, Improved, Microbit RC
published: true
categories: [code, microbit]
hero: microbit
thumbnail: "/img/posts/new-improved-microbit-rc/thumbnail-420x255.webp"
alttext: microbit bit bot
---

I've been refinining some of my code from the original remote control car I built using the <a href="http://4tronix.co.uk/blog/?p=1490">BitBot</a> kit 
across several posts last year.

Things like the remote steering, general handling of the car, some nice features like using the neopixels to signal braking and reversing.

Thinking about it over the last few months I came up with some interesting features and had to work around some limitations. The code is still split between 
two programs, the car itself and the remote control. 
 
## Car

The first part of this two part project is the code that drives the "car", the microbit plugged into the extension board and driving the left and right 
motors attached to the rear wheels. 


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

The bitbot class draws together the motors, neopixels and is responsible for managing its own direction and speed. 

I moved the speed controls into the bitbot class because that seemed a better split for the code and meant I had less to get wrong in the main application and again fewer variables which helps with memory over all. 


#### Lights 

![microbit headlights](/img/posts/new-improved-microbit-rc/headlights.webp)


I added a direction member to the class so that a single function (update_lights) can be responsible for handling all the lights that I am interested in. The rear two lights serve as brake and reverse lights, switching from red (braking or stopped) to white (reverse). Steering left or right is indicated by two of the 
corresponding leds on the side lighting up in orange.

![microbit reversing](/img/posts/new-improved-microbit-rc/rc-reverse.webp)

Finally, the headlights are automatically controlled by using the light sensor on the microbit display. With not enough light falling on the car, it will turn 
on it's headlights automatically. This is where the ability to pass a flag to turn off the lights came into its own. 

```python

{% include code/python/microbit/bitbot-rc2-3.py %}

```


#### Steering 

The steering has changed in this version. It used to turn in a circle left or right by rolling forward on one wheel and in reverse on the other. Now I have kept it moving in the same direction but decreased the turning side to half speed which means that controlling where to turn is a bit more predictable. 

### First Contact

A small but nice feature I added into this version is a sort of handshake that the controller and car do when they both startup. Often I have found the car 
running away with the first few commands from the controller while the person is still getting used to picking up and holding the microbit in the right way 
ready to drive.

![microbit ping](/img/posts/new-improved-microbit-rc/rc-ping.webp)


I created two new functions, one to wait for a radio ping from the controller and one to show that contact had been made. When the bitbot starts up, it now 
shows a flashing central pixel to make it clear it is waiting for the handshake to take place. This is just a loop that waits for 'hello' to be broadcast 
and echoes it back. Then, we pause for a few seconds to show a heart icon, which is the slightly less international symbol of 'I have heard you and agree to work 
with you' of this ad-hoc protocol. 

![microbit heart](/img/posts/new-improved-microbit-rc/rc-heart.webp)


```python

{% include code/python/microbit/bitbot-rc2-4.py %}

```

### Driving

Following the handshake comes the main loop which interprets the single letter commands coming from the handset controller and forwards to the bitbot class to 
drive the car. This loop is now a lot simpler than in earlier versions.

```python

{% include code/python/microbit/bitbot-rc2-5.py %}

```


## Handset

The complementary program on the "handset" microbit has been less rigourously overhauled. 


### Contact

![microbit ping](/img/posts/new-improved-microbit-rc/handset-ping.webp)

Again, we have a similar pinging mechanism from the handset, broadcasting hello and waiting for a response from the car before starting. I used the same blinking 
LED in the centre of the display and the matching heart icon after the handshake has completed. 

```python

{% include code/python/microbit/bitbot-rc2-6.py %}

```

![microbit heart](/img/posts/new-improved-microbit-rc/handset-heart.webp)


### Commands

![microbit stop](/img/posts/new-improved-microbit-rc/handset-stop.webp)

I left the command variables in the handset program since this is a much smaller program and hadn't shown any signs of running out of memory. I think the variables do make the code easier to understand. 

```python

{% include code/python/microbit/bitbot-rc2-7.py %}

```

I split out the forward/backward and side tilt values even though they ended up being the same. I had a lot of test driving and experimented with a few settings 
to see which felt most natural when just trying to control the car without it being too sensitive to hand movements in either direction. The values I came up 
with seem to work well to allow for some margin of error and to respond to intentional but natural hand movements for driving.


### Driving

I struggled a little with coming up with the right form of algorithm for which command to send when the device is tilted. In testing I found that I was trying to corner but because the controller was not completely flat on the forward axis, the handset would ignore the steering command and send a forward or reverse command instead. I ended up just looking at which of the non-zero tilts was the greatest and using that to decide which one to send out to the car.


```python

{% include code/python/microbit/bitbot-rc2-8.py %}

```

![microbit reverse](/img/posts/new-improved-microbit-rc/handset-reverse.webp)

Finally, I tightened up the sleep timing on the handset controller to make communcation between the devices a little bit more responsive.


### Conclusion

I think this is the final version of this project, I can't think of any other improvements I want to make. Also, all the way along I have found memory allocation 
errors when flashing my preferred intermediate version of the code and had to modify to bring it back under the memory limit for the device. I think this is probably the biggest project you could run on a microbit with classes. It may be possible to totally devolve the solution into one big while loop to save on memory but I am very happy with the level of functionality and most of how the code looks now. 
