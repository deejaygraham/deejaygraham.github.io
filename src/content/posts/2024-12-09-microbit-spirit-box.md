---
permalink: 2024/12/09/microbit-spirit-box/
layout: post
title: Microbit Spirit Box
published: true
tags: [code, microbit, python]
---

Thinking about the new DDD North conference coming up in February got me thinking about my last talk - "How to be Psychic" - 
which was about evolutionary design rather than actual psychic powers. Part of the conceit of that talk was taking the 
role of someone who has supernatural powers to create easily changed software designs and I managed to work 
in references to Harry Houdini and modern day ghost hunters. 

This got me thinking about a good way to showcase some of the microbits capabilities - using all (or most) of the sensors 
available to build a "Spirit Box" or [Ghost Box](https://en.wikipedia.org/wiki/Ghost_hunting#Methods_and_equipment)

The idea is for external forces (ghosts) to try to communicate through this piece of technology, saying words in answer 
to questions from the ghost hunter. 

## Code

Here we use temperature, sound, light and just general randomness to decide which (if any) words to return to the main 
code where we then make a random choice and say that word. 

```python


```

The thresholds set up at the start of the program were chosen mostly at random so may need tuning when using this for a 
teaching exercise.
