---
permalink: 2021/03/29/simple-generative-art/
layout: post
title: Simple Generative Art
published: true
tags: [code, processing, python]
thumbnail: /img/posts/simple-generative-art/simple-generative-art-420x255.webp
alttext: screenshot
---

My new intro to coding class is under way and I'm going to start working on some examples of generative art instead of the usual microbit tutorials because of the
enforced remoteness of the classes now. I think that using generative art will allow me to introduce several concepts and allow people to play with the code and
see what happens when there is no one "correct" answer to find for the problem.

I will be working with my second favourite environment, <a href="https://processing.org/">Processing</a>, in python mode. I was watching a <a href="https://youtu.be/4Se0_w0ISYk">presentation</a> by
<a href="https://tholman.com">Tim Holman</a> and wondered how easy some of his examples would translate into python and processing.

Below is an example of this translation where "simple" code can generate some really nice, "complex"-looking graphics.

### Lines and Lines and Lines

The starting point is drawing a line from one point to another. First we setup the canvas to be a small size, to begin with, set the background colour to white
and the line colour to black. We also want to have the code generate the art once so I'm using the linear setup of processing rather than using the setup and draw functions,
at least for the time being.

```python

{% include 'code/python/gen-art-1.py' %}

```

I have separated the tile drawing code into it's own function to make expanding this easier in the next step. It means I can talk about functions but wave my hands over much of this until
the students can see the benefit from it coming up very soon. Since we are only drawing a single tile at this point, I am setting the tile size to be the whole of the square canvas.

![screenshot](/img/posts/simple-generative-art/art-1.webp)

### Randomness

A small change to the draw_tile function lets us decide if a tile should be drawn from top left to bottom right or from top right to bottom left. By using the random function
we can talk about injecting some variation into our code and even select what probability we want, a straight 50% or something else? This is also the point where we introduce

```python

{% include 'code/python/gen-art-2.py' %}

```

![screenshot](/img/posts/simple-generative-art/art-2.webp)

Each time the code runs now, the square has a diagonal line drawn one way or the other. Again, so far, so boring. Things get a little more interesting when we use tiling.

### Tiling

Next, we want to be able to draw more than one tile per canvas which means we have to split up the canvas into a number of discrete units. For this we
introduce a variable which is the size of each tile. Moving from one tile to the next lets us introduce the idea of loops with the range function.

```python

{% include 'code/python/gen-art-3.py' %}

```

We start off
small so that it's easier to see that we are moving from one place to another on screen by substituting values for x and y and seeing that the tile size doesn't change.

![screenshot](/img/posts/simple-generative-art/art-3.webp)

### Experimentation

Now is the time where we can let the students loose on the code to try some different things. Reduce the size of the tiles, change the canvas size (fullScreen ?) and look at the time it
takes to generate compared to a smaller window size, change the probability, change the line thickness or colour.

Here's another version with a tile size of 20 and a canvas size of 520 pixels. It does look to me very like the mazes you used to see as a child on the back of cereal boxes
or in puzzle books.

![screenshot](/img/posts/simple-generative-art/art-4.webp)

### What if?

At this point I'm hoping that someone will ask about changing how we draw the lines. What happens, for example, if we draw horizontal or vertical lines rather than
diagonal?

The advantage of the function we created is that we can make the change in that function and none of the other parts of the code need to change.

```python

{% include 'code/python/gen-art-4.py' %}

```

And we get this rather lovely basket weave effect.

![screenshot](/img/posts/simple-generative-art/art-5.webp)
