---
permalink: 2016/10/04/rock-paper-microbit/
layout: post
title: Rock, Paper, Microbit

tags: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

I saw a tweet from <a href="https://twitter.com/TechForLifeUK/">@TechForLifeUK</a> the other day
which said they were going to run a code dojo where they would be writing the game of rock, paper,
scissors on the microbit.

![rock](/img/posts/rock-paper-microbit/rps-rock.webp)

RPS is a simple game that I have written a number of times in different languages, usually
in my ruby deliberate practice sessions, but I had never tried doing it in python and never for
the microbit. Clearly that kind of challenge could not go unanswered :)

### The Game

The game design I came up with was as simple as I could get it - shake the microbit and it would make
a random choice between one of the three options. When it had decided on an option, it will display
an image representing that choice and keep it on the display for a few seconds. After that the
display will clear and you need to shake again to pick another random shape.

It's up to you to throw your own shape, compare with the microbit and keep score.

![paper](/img/posts/rock-paper-microbit/rps-paper.webp)

### Shapes

The most challenging part of the program, as usual with developing games for the microbit architecture,
is coming up with suitable images to represent game concept, in this case the rock, paper and scissors. Luckily
I have a background in creating icons for Windows application but even that is not much help when the system
is constrained to a 5 x 5 LED grid.

Eventually I settled on an oval shape to represent the rock, a document
kind of icon to represent paper, and an extremely rough approximation of a pair of scissors.

![scissors](/img/posts/rock-paper-microbit/rps-scissors.webp)

### Images

Images on the microbit are represented as a single string of numeric characters, arranged in a
5 x 5 grid with each line separated by a colon. Each number represents the brightness of one
LED "pixel" - 0 is off and 9 is full brightness. For example, a square would be shown
by lighting up the edges of the grid and leaving the inside of the grid dark. Like this:

```

Image("99999:"
"90009:"
"90009:"
"90009:"
"99999")

```

### Clues

To provide a little bit of a clue to what the player can expect, I cycle through the three alternatives
at the start of the game using display.show with the list of images.

Here's the finished code:

```python

{% include 'code/python/microbit/rock-paper-scissors.py' %}

```
