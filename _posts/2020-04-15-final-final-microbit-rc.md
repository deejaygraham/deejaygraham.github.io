---
layout: post
title: Final, Final, Microbit RC
published: true
categories: [code, microbit]
hero: microbit
thumbnail: "/img/posts/thumbnails/microbit-420x255.png"
alttext: microbit bit bot
---

Following on from the last post about the remote control microbit powered bitbot, I think I mentioned all the way along that the car source code 
and functionality I would like to include is constantly butting up against the program size restriction that the microbit can accomodate. If you 
create too big a program, then after the flashing process finishes you will see a "memory allocation" error scrolling across the screen. 

After a bit of searching I found <a href="http://docs.micropython.org/en/latest/reference/constrained.html">this post</a> useful. It turns out that 
classes, code comments, long functions and long variable names all contribute to larger program sizes. 

One of the selling points for the code as I had always organized this project was the easy understandability of the classes for motor, led etc. It 
looked like I was going to have to abandon some of those and replace some variables if I wanted to continue to add functionality to the project.

## Handset

The handset code didn't change very much because that has always been small enough (about 100 lines) and all I needed was to add a couple of extra commands 
to send to the car. 
"/img/thumbnails/microbit-420x255.jpg"

### Commands

I remapped the A and B buttons to the headlights and horn commands respectively and moved the not very often used fast and slow commands to the 
edge connectors. Hitting the A button cycles the cars lights through on, off and auto settings, where auto means to use the microbit's light sensor to 
decide if it needs to turn on the headlights. Hitting the B button sounds a quick double toot on the horn to let people know you are coming. I also added 
a horn sound when the car starts reversing as a nod to safety and realism.


### Watchdog

I also noticed during testing that if I pulled the plug on the handset, the car stopped receiving messages but could continue to drive the motors, perhaps 
with disasterous results. I decided that a cut off would be useful if the two halves ever lost contact with each other. As well as the normal movement 
commands I added a watchdog 'hi' to send out to the car approximately every 5 seconds even when no control commands are being sent. 


```python

{% include code/python/microbit/bitbot-rc3-1.py %}

```

## Car

On to the car. After flattening out the functions from their original classes, I needed to some renaming to make their use more obvious and to 
organize them into a more coherent structure. First motor commands, then lights, then overall "car" commands. Notice the number of string and number 
literals I had to use to get the code shoehorned into the microbit. 


### Lights

The last version had an auto headlight feature using the light detector but this time I added a manual on and off override as well as adjusting the 
intensity of all the lights. 


### Horn

As mentioned above, the bitbot piezo horn is put to use to warn everyone when reversing and for tooting when the driver hits the B button on the handset.
Just like a real car!


### Watchdog

The final feature was implementing a more sophisticated run loop. The outer loop still runs forever but I added an inner loop to wait for initial contact, then run as long as the handset was in communication with the car. Either by sending a movement command or by the special 'hi' command.  We increment the watchdog count every time through the loop and reset the count when we get another message over the radio. If we go too long without contact, we drop out of the 
inner while loop, stop the motors and wait for contact to be established again at the top of the outer loop.


```python

{% include code/python/microbit/bitbot-rc3-2.py %}

```


I had anticipated the code for the car to be much longer in the non-class version but it turned out to be about 200 lines so well within manageable 
limits for future maintenance. Now that I have promised myself I am done with features, that shouldn't be  a concern :)
