---
layout: post
title: Processing Shapes and Colours
published: true
categories: [code, processing, python]
thumbnail: img/posts/processing-shapes/processing-shapes-420x255.webp
alttext: screenshot
---

Here's another generative art piece we explored semi-randomly today. Adapting the tiling examples, first we played around with changing the 
colours of the lines to make the repainting and calling draw every frame more visible. 

We made the stroke width nice and wide so we could see the colours change more easily and then animated once per frame to generate a new sequence. The 
resultant images were very pleasing and looked quite retro to the students. 

![first](/img/posts/processing-shapes/processing-shapes-1.webp)

```python

{% include code/python/processing-shapes-1.py %}

```

Next, instead of using lines that we had for the last several weeks, we experimented with shapes and vertices and each student came up with their 
own version of a figure to draw on each tile. Here I am drawing boxes with a slight skew the further down the page the boxes go, by modifying the position
of the top right corner and the bottom left corner. 

![second](/img/posts/processing-shapes/processing-shapes-2.webp)


```python

{% include code/python/processing-shapes-2.py %}

```


