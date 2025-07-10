---
layout: post
title: Most Shared, Least Proud
tags: [microbit, python]
draft: true
---

I wanted to say something about a piece of code that I share very often but one of which is am least proud. I have been a STEM ambassador since 2015 and I first got involved as a project lead for series of events titled "Makers and Creators". These were events aimed at school children to show them the fun and creative side of computing, that it was not just databases and spreadsheets. This begain in the local area and then ran in other parts of the UK and Ireland in successive years. 

I developed 80% of the content for the original week-long event, ranging from 
simple python, programming minecraft of the Raspberry Pi, LEGO Mindstorms and 
physical computing on the BBC microbit. Most of the time, the sessions would consist of showing and explaining short code snippets to the students and having them copy down the code and run it on their own devices. 

The microbit is a challenge because of it's many constraints as a computing platform. The tiny computer packs a lot of functionality into a small space but 
limitations such as the 5x5 monochrome LED display force you to be creative 
in how you present information and interact with the device. 

The code I wrote for those sessions, and a lot of sessions I still lead with 
IT teachers today, is deliberately "bad" code. By bad I mean it might be inefficient, it might be non-pythonic in idiom, it might just be "not quite right" 
to the professional's eye and it might be just slightly wrong in the eyes of the 
student. This is a deliberate choice I made because I am never presenting this to 
confident, experienced coders and I am often sharing it with people who don't think they are clever enough to be programmers, or in some cases, don't know 
what that is even.

The code I write has to be easily explainable to a novice, building on other code 
they have just learned about very recently. I also want to write code that is in 
some way incomplete so that the student feels they can add to it and make it better on their own. That's when we know they are really getting it and starting to enjoy working with the code. 

Having a certain amount of professional pride in the code I write in my day job and hearing more than once from peers that the code I have written for this context is bad, I have to steel myself to share these snippets of code when explaining the STEM work I do.  

## The Shame
 
The one piece of code I get asked about most, and that excites the most excitement 
in the classroom, is when I introduce the microbit's capability to send and receive text over short distances using it's built-in radio. 

I chose to demonstrate this capability with what I called "Old-Time Twitter", imagining that the students were living a long time ago where the internet didn't exist, nobody had mobile phones, and we all communicated in line of sight with the people in a single room. 

The code let's the student set up a message to broadcast to everyone else in the vicinity. Pressing one of the buttons on the microbit sends that message out and can be picked up by those in the same room. The code also listens for messages from other microbits and displays those on it's tiny screen as they come in. 

```python
from microbit import *
import radio

radio.on()

# change this next line to your message
your_tweet = "hi"

while True:

    # send it?
    if button_a.was_pressed():
        radio.send(your_tweet)

    # listen for others
    received_tweet = radio.receive()

    if received_tweet:
        display.scroll(received_tweet)
```

## The Pride

In the classroom, this code snippet comes towards the end of a day which has had some frustration in it. The students learn to grown sensitive to syntax and spelling errors after many sad face icons and messages scrolling across the microbit's display to the effect: "syntax error: line 5 ...". Much hunting in the 
code and experimentation and re-typing to resolve the error, sometimes obvious, sometimes very subtle. 

Eventually everyone gets the code working is having fun, sending messages, changing the code to send a different message and trying to out-do the others. At this point, the pressure is off and I can relax for a moment to observe the messages bouncing back and forth around the room. 

In more than one session, this happy babble of messaging continues until someone reports another syntax error with a line number. The students all know that the interpreter works a line at a time and only fails if it tries to execute a line it doesn't understand. They know to go look at the line in the error message (and maybe the one before it) and check it carefully. Really carefully. 

Soon we notice that everyone is poring over their code, trying to find an error on the same line with the exact same error. Enter the super-villain to the story. We eventually work out that one of the students is pranking the others and is using their tweet to broadcast a fake syntax error to the other devices. After explaining this to the class, everyone gets the joke and rolls up their sleeves to start crafting something even more ingenious. THIS is when we know we are getting through and making new computer geeks who feel ownership of the device and their code and what opportunities for good (and bad) that they represent. 
