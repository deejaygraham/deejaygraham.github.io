---
layout: post
title: Processing Shapes
published: true
categories: [code, processing, python]
thumbnail: img/posts/processing-shapes/processing-shapes-420x255.png
alttext: screenshot
---

Here's another generative art piece we explored semi-randomly today. Adapting the tiling examples, first we played around with changing the 
colours of the lines to make the repainting and calling draw every frame more visible. 

We made the stroke width nice and wide so we could see the colours change more easily and then animated once per frame to generate a new sequence
Generative Art is a lot of fun and I learned some stuff today from watching a <a href="">workshop from pycon 2018</a> given by <a href="https://twitter.com/emilyxxie">Emily Xie</a>, 
particularly about the use of Perlin Noise to add natural looking randomisation to some code. 

![first](/img/posts/processing-shapes/processing-shapes-1.png)

```python

{% include code/python/processing-shapes-1.py %}

```


Here I've pretty much followed the example in the latter part of the workshop to draw a flower as a modified circle whose radius collapses over time but uses perlin noise to deform the 
circle on each frame. The undulation caused by the perlin noise generator gives the impression of leaves or petals and it really can some generate some pretty patterns.

![second](/img/posts/processing-shapes/processing-shapes-2.png)


```python

{% include code/python/processing-shapes-2.py %}

```


