---
layout: post
title: Tiny Tetris for Microbit
categories: [ code, microbit ]
published: true
hero: microbit
tweetable: true
thumbnail: posts/tiny-tetris-for-microbit/tetris.png
---

Tetris is one of those addictive games that seems to have been ported to nearly 
every hardware platform. I haven't been able to find a version for the microbit 
so thought I would give it a go. 

Now the first thing you notice about the microbit is the 5x5 led screen which stops 
us having different shape pieces which you might argue is one of the fundamental hallmarks 
of tetris as a game. Let's simplify the game and just use pixels for blocks so there is 
no rotation of blocks or complex fitting of blocks together. Hopefully there will be 
enough of a game left to make this worthwile.

<img src="/img/posts/tiny-tetris-for-microbit/tetris.png" alt="microbit tetris" />

First, we need two classes, one to model the current falling block and one to model the "dead" blocks 
lying on the floor, waiting to be cleared away when we fill up a row. We also need a game loop that can 
show the board and the block. 


### First

So here, our first attempt with an empty board and a single block floating at the start position.  

```python

{% include code/python/microbit/tiny-tetris-01.py %}

```

I have given the "live" and "dead" blocks different LED intensities since we can't have 
different colours. 


### Drop

Next, we should be able to let the block drop from the top of the screen to the bottom. To be able to 
animate the falling block, we need to be able to erase the block at its current position, update the y 
value, the redraw at the new position. We also need to be able to check that there is space below the 
current position for the block to drop. We ask the board if the pixel below us is empty. We also want to 
be sure we haven't dropped off the bottom of the screen.

```python

{% include code/python/microbit/tiny-tetris-02.py %}

```


### Buttons

So our block drops but then just sits there at the bottom of the screen. 

Perhaps the next thing to address is moving the block left and right to be able to fill up a whole row 
of pixels. Again we have to be careful we don't accidentally drift off the sides of the screen by checking 
before we change the x value of the block. Once a block can't move any further down the screen, either because 
it has hit the bottom or landed on another block, we need to convert that "live" block to a "dead" one, transfer 
ownership to the board and create a new block back up at the top of the screen. 

```python

{% include code/python/microbit/tiny-tetris-03.py %}

```


### Clearing

Another characteristic of Tetris we would like to preserve is scoring points when you fill up a complete row of pixels. 
To know if we should clear a row, we need to make sure that all pixels in that row are non-zero, any zeroes tell us there is 
a hole and we shouldn't remove it. If we do find a full row, we remove it and add to the score for this game. 


```python

{% include code/python/microbit/tiny-tetris-04.py %}

```


### Collapse

Notice that the incomplete rows don't "fall" down into the newly emptied rows so we need to tackle that next.

```python

{% include code/python/microbit/tiny-tetris-05.py %}

```


### Finished

Finally, we need a way to get out of the game and show the score at the end. Here is the finished code:

```python

{% include code/python/microbit/tiny-tetris-06.py %}

```


### Improvements

I have given some thought to creating a couple of different shape blocks to make it a little more challenging - a 2x2 block 
or a 2x1 plank say - but finding a method to trigger rotation is the problem with only two buttons. Perhaps building a set of 
controls wired to the digital IO would be a solution. 