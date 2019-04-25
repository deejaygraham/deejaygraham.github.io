---
layout: post
title: Tiny Tetris for Microbit
categories: [ code, microbit ]
published: true
hero: microbit
---

Tetris is one of those addictive games that seems to have been ported to nearly 
every hardware platform. I haven't been able to find a version for the microbit 
so thought I would give it a go. 

Now the first thing you notice about the microbit is the 5x5 led screen which stops 
us having different shape pieces which you might argue is one of the fundamental hallmarks 
of tetris as a game. Let's simplify the game and just use pixels for blocks so there is 
no rotation of blocks or complex fitting of blocks together. Hopefully there will be 
enough of a game left to make this worthwile.

First, we need two classes, one to model the current falling block and one to model the "dead" blocks 
lying on the floor, waiting to be cleared away when we fill up a row. We also need a game loop that can 
show the board and the block. 

So here, our first attempt with an empty board and a single block floating at the start position.  

```python

{% include code/python/microbit/tiny-tetris-01.py %}

```

I have given the "live" and "dead" blocks different LED intensities since we can't have 
different colours. 

Next, we should be able to let the block drop from the top of the screen to the bottom. To be able to 
animate the falling block, we need to be able to erase the block at its current position, update the y 
value, the redraw at the new position. We also need to be able to check that there is space below the 
current position for the block to drop. We ask the board if the pixel below us is empty. We also want to 
be sure we haven't dropped off the bottom of the screen.


```python

{% include code/python/microbit/tiny-tetris-02.py %}

```

So our block drops but then just sits there at the bottom of the screen. 

Perhaps the next thing to address is moving the block left and right to be able to fill up a whole row 
of pixels. 

```python

{% include code/python/microbit/tiny-tetris-03.py %}

```
