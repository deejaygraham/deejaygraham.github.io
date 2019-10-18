---
layout: post
title: Tiny Asteroids for Microbit
categories: [ code, microbit ]
published: true
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.jpg"
alttext: microbit sorting hat
---

Asteroids is a game I used to love to play on the old Atari 2600 console.

![asteroids](/img/posts/tiny-asteroids-for-microbit/asteroids.png)

Even though the graphics are pretty basic by modern standards, the microbit can't hope to
come anywhere near it because of its minimal graphical capability.

Or can it?

### Choices

Cutting the game down to its minimum to work on a 5x5 screen meant that we could only
have one asteroid on the screen at a time and couldn't really support driving around the
screen the way that the original ship did.

### Brightness

Asteroids are represented as single dots with random brightness and enter at a random
position at the top of the screen, travelling down the screen until the reach the bottom.
Each time an asteroid reaches the bottom of the screen, a new one is generated at the top.

The ship is represented as a fully bright dot in the centre at the bottom of the screen. The buttons
*A* and *B* can be used to move the ship left and right to avoid the moving asteroids.

### Animation

The game ends when an asteroid crashes into the ship. Rather than just displaying something like
as sad face as game over, I put a little bit of time into creating an explosion or firework
animation with dots radiating out from the crash and gradually fading from normal brightness down
to nothing.

### Code

Here's the finished code:

```python

{% include code/python/microbit/tiny-asteroids.py %}

```

This might be my most ambitious game for the microbit even though the tiny screen does
mean that representing the ship and the asteroids are not a satisfying as I would have
wanted.

I'm most proud of the end of game explosion showing the asteroid crashing into the ship. It wasn't
hard to do and offers a nice little flourish to the minimalist experience :)
