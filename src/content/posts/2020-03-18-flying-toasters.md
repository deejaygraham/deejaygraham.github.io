---
permalink: 2020/03/18/flying-toasters.html
layout: post
title: Flying Toasters
published: true
categories: [code, processing]
thumbnail: "/img/posts/flying-toasters/thumbnail-420x255.webp"
alttext: toasters
---

Many years ago, there used to be these things called "screensavers". They were little programs that ran when your machine 
was idle to "save" your screen from burning a static image into it. There were lots of different ones available but one I never 
got to see in reality was one from a company called <a href="https://en.wikipedia.org/wiki/After_Dark_(software)">"After Dark"</a> 
featuring surreal toasters flapping their way across the screen. Appropriately enough, this was "Flying Toasters".

## Flapping 

For some reason I ran across this the other day and found a gif of the toaster flapping as a sequence of four images.

![flaps](/img/posts/flying-toasters/toaster1.gif)

I thought it might be fun to try to recreate the screensaver as a full screen Processing app.

## Toast

The screensaver showed flapping toasters and toast moving across the screen from top right to bottom left so I thought I 
would start with the easier single image of toast.

![toast](/img/posts/flying-toasters/toast.webp)

We can construct a piece of toast at a starting postion (x, y) and a speed.

```python

{% include 'code/python/flying-toast.py' %}

```
Each time through the processing draw loop, we move the sprite down and to the left using the speed value. 

I added a bit of code into the move function to make sure that the sprite wrapped around the screen once it had 
travelled off to the left or below the bottom of the screen. This was slightly complicated by having to take the 
image width and height into account so that the sprite didn't hit the edge of the screen and just disappear, it 
scrolled smoothly off the screen *then* wrapped around. 

## Flying Toaster

Next, I cut up the four-frame single gif into four discrete images and numbered them 0..3. Notice each one 
has a slightly different wing position.

![toaster 0](/img/posts/flying-toasters/toaster0.webp)

![toaster 1](/img/posts/flying-toasters/toaster1.webp)

![toaster 2](/img/posts/flying-toasters/toaster2.webp)

![toaster 3](/img/posts/flying-toasters/toaster3.webp)

We create a frames member to hold each image we load in from the data folder and cycle through them on 
each call to *draw* to achieve the flapping animation. Again, I have to wrap the sprite around the screen 
in a similar way to the toast. 

```python

{% include 'code/python/flying-toaster.py' %}

```

I also randomized the starting frame for each toasters animation so that they all appear to flap independently.


## Screensaver

Now we are ready to put it all together into a full screen processing app with some randomness injected for 
starting position for each sprite on the screen and the speed of each sprite. 

```python

{% include 'code/python/after-dark.py' %}

```

In full screen mode, I guessed at the right number of pieces of toast (10) and toasters (20) which are about right to fill the 
screen but not overwhelm it. The slight variation in speed works quite well to give some extra interest, with toasters 
seeming to hurt toast and overtake their slower flapping friends. 

Here's a screenshot of the finished "screensaver".

![screensaver](/img/posts/flying-toasters/screensaver.webp)

