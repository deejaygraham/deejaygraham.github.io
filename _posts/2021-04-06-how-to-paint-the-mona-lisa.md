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

This version was just the first result from my image search which happened to be small but still recognisable with enough detail. All the way through this set of exercises, 
we won't be drawing the original image, we will always have it memory as a reference and paint onto the screen a modified represenation. 

### Loading 

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

