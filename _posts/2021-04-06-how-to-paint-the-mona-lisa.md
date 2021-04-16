---
layout: post
title: How to Paint the Mona Lisa
published: true
categories: [code, processing, python]
thumbnail: img/posts/how-to-paint-the-mona-lisa/mona-lisa-420x255.png
alttext: screenshot
---

Continuing on with intro to coding, I wanted to show some randomisation related to an identifiable image. The Mona Lisa is supposed to be one of the most well 
recognized pieces of western art so I thought that might be a good place to begin. 

![original](/img/posts/how-to-paint-the-mona-lisa/mona-lisa.jpg)

This version was the first result from my image search which happened to be small but still recognisable with enough detail. All the way through this set of exercises, 
we won't be drawing the original image, we will always have it memory as a reference and paint onto the screen a modified represenation. 

### No Functions

Note: Before getting into the rest of the is post, the no-function version of the this concept is as below. The code is easier for a beginner to understand and follow through the idea of x and y coordinates.

```python

{% include code/python/mona-lisa-0.py %}

```

Once the shapes are worked out, we can change up the size of pixels and change the shape of the pixels to circles or triangles. This also helps with understanding what happens with the structure of the code.


### Flipping Marvellous

An entertaining further step to take before we start "destroying" the image, is to flip the image around by changing where we sample from in the image. If we keep the loop the same but sample from the right side of the image working towards the left, we can flip the image along the vertical axis. 
If we read from the bottom upwards we can flip the image along the horizontal axis and make it upside down. If we do both, we can reverse the image on both axes. 

```python

{% include code/python/mona-lisa-0a.py %}

```

Ta-da, an original/fake artwork. Now to the function-based version


### Loading ... 

First, we'll use processing to load the image into memory (remembering to copy the original image into the sketch folder). We also set the background to be white and make sure 
that noStroke is called so that we don't draw any boxes around our pixels. 


```python

{% include code/python/mona-lisa-1.py %}

```

At this point we don't expect to see anything on the screen at all if we press "run".


### Random Pixels

Next, we'd like to fill in the picture bit by bit by sampling the original image at random locations and 
painting some larger squares using the colour of the pixel at those random locations.

```python

{% include code/python/mona-lisa-2.py %}

```

![screenshot](/img/posts/how-to-paint-the-mona-lisa/art-1.png)


The familiar image gradually appears as we let the process progress. 

![screenshot](/img/posts/how-to-paint-the-mona-lisa/art-2.png)

I found making the pixel size 10 to be a good compromise between fidelity to the 
original image and speed of the image appearing from what looks like random noise to begin with. 

![screenshot](/img/posts/how-to-paint-the-mona-lisa/art-3.png)

There is a sort of disturbing quality to the picture constantly fluctuating as the image is built and fills out, 
particularly around the face and especially the eyes.


### Pixelation

Another approach might be rendering the image all at once, without the random factor to it but keeping some aspects of pixelation to the image.
We can then play with some other parts of the image. 

Sticking with the same setup function, we need to do something different when we are drawing and a different processing function. 

This time, the processing function, pixelate, works across the image and down in rows, sampling a pixel and then filling a larger version of that pixel 
in the screen image. 

```python

{% include code/python/mona-lisa-3.py %}

```

I have experimented witht the noStroke function to see what the difference was between including it and commenting it out. First with boxes around each "pixel":

![screenshot](/img/posts/how-to-paint-the-mona-lisa/art-4.png)

And without boxes:

![screenshot](/img/posts/how-to-paint-the-mona-lisa/art-5.png)

I think both have interesting qualities but I think as you go down in resolution, then having boxes around each pixel makes for a less well defined image, even taking into 
account the pixelation.


### Circles

Of course, pixelation doesn't have to be restricted to squares, we can use circles if we want to by replacing the call to rect() with circle()

![screenshot](/img/posts/how-to-paint-the-mona-lisa/art-6.png)


### Offsets

We can also almost destroy the image but messing about with the pixel dimensions when we are rendering. For example, if we increase the pixel height on each column to get this:

![screenshot](/img/posts/how-to-paint-the-mona-lisa/art-7.png)

Or if we switch the order of the for loops around in the pixelate function, so that we work from y first, then x, and modify pixel_size instaead of pixel_height.

![screenshot](/img/posts/how-to-paint-the-mona-lisa/art-8.png)
