---
layout: post
title: Microbit Mentalism
categories: [ code, microbit ]
published: true
---

I was due to give a talk to some educators about using the BBC microbit in the computer science syllabus and was having a hard time coming up with a demonstration of the capabilities of the device, something that was short, memorable and showed off the full range of what it could do. Finally, I hit on the idea of a magic trick, it didn't need to be hugely convincing but it seemed that a form of mentalism might be what was needed.

### The Plan

I wanted to stage a card trick, a bit like you would see on tv, where the magician will ask a volunteer to pick a card (any card), perhaps show it to the rest of the audience but keep it secret from the magician himself. The magician would then go through some elaborate hand waving and eventually guess what the card was, to everyone's amazement.

That's the analog version of the trick we are most familiar with. I wanted to create a digital equivalent using microbits.

### The Trick

In my version, I wanted to use several microbits in different roles to perform the digital magic. For this we need three microbits, one for the volunteer from the audience to hold, one to act as the "magician" and one for the facilitator (me) to keep out of sight as back up in case things don't go completely to plan.

First, I introduce the trick and the robot magician - a cardboard robot with a microbit, speaker and LEDs inside. This microbit is programmed to magically "guess" the card and use the speech synth to announce the card. The LEDs are used as the robot's eyes so I am using the digital IO to control these (see a later post for more about the design and building of this robot).

Next, I ask for a volunteer from the audience and ask them to use a microbit in place of the traditional deck of cards. They can press the "a" button to select a card at random and the value of the chosen card will scroll across the screen. If they want to choose again, they can simply press the button again to select a new card and continue until they hit on one they are happy with.

Once they are happy with their selection, I ask them to press the "b" button on the microbit to lock in their choice. A couple of seconds later, the magical robot comes to life and tells them which card they picked.

If everything goes wrong, the facilitator can use their hidden microbit to sneakily intercept the card selection and also to trigger the card announcement for a little variation in throwing the audience off the scent of how the trick works.

### Volunteer

So, here's the code for the volunteer microbit. You will notice that when the card selection happens, it's immediately broadcast to the other roles and overwritten each time a new selection is made. Pressing the b button actually triggers the robot to speak the card selection.

```python

{% include code/python/microbit/mentalism-volunteer.py %}

```

### Robot Magician

If you know your magic history, you will know that the magician we know as Harry Houdini didn't start off life with that name. He wanted to emulate a famous French magician, <a href="https://en.wikipedia.org/wiki/Jean_Eug%C3%A8ne_Robert-Houdin">Jean Eugène Robert-Houdin</a> and to be Houdin-like.

It was for this reason that I felt I had to name my robot magician *Robot Houdin* or a grave injustice would have been committed :)

The robot code listens for a card selection and stores it away waiting to announce the card as if by magic. Once it gets the 'announcement' message, it uses the voice synth to say a couple of words, tell the volunteer what card they have picked, then finish off with another bit of random banter.

```python

{% include code/python/microbit/mentalism-robot.py %}

```

### Facilitator

The facilitator in the trick is the person holding everything together, introducing the trick and the robot and is really half of the magician role that the robot plays outwardly. I wrote this code as a get out of jail in case everything went wrong or the robot batteries died or whatever. The facilitator device is there to read the card selection, so I can announce the card instead of the robot, and/or trigger the robot to announce the card itself.

```python

{% include code/python/microbit/mentalism-facilitator.py %}

```

### Demonstration

I hope you will agree that that covers a good deal of the functionality in the microbit:

* display
* text
* images
* buttons
* radio
* digital io
* speech

The only wrinkle to this is that the robot definitely needs new, high quality AA batteries to work correctly. The digital IO, speech synth driving a speaker and the radio on all the time, I found anything other batteries would allow it to start off driving the speaker but would cause the voltage to dip too much and reset the device so it only got half of the trick done. With new batteries it worked flawlessly.

The slides for my talk are on <a href="https://www.slideshare.net/deejaygraham/physical-computing-91152232">slideshare</a>.
