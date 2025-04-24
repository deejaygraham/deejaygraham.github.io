---
title: Perlin Noise Flower
tags: [code, processing, python]
thumbnail: /img/posts/perlin-noise-flower/perlin-noise-flower-420x255.png

---

Generative Art is a lot of fun and I learned some stuff today from watching a <a href="">workshop from pycon 2018</a> given by <a href="https://twitter.com/emilyxxie">Emily Xie</a>,
particularly about the use of Perlin Noise to add natural looking randomisation to some code.

![first](/assets/img/posts/perlin-noise-flower/flower-1.png)

Here I've pretty much followed the example in the latter part of the workshop to draw a flower as a modified circle whose radius collapses over time but uses perlin noise to deform the
circle on each frame. The undulation caused by the perlin noise generator gives the impression of leaves or petals and it really can some generate some pretty patterns.

![second](/assets/img/posts/perlin-noise-flower/flower-2.png)

Where I have modified the code Emily presented, it was to keep going after the drawing collapses into the centre, and reverses the direction of the radius so that it starts growing outwards again. Once
it reaches the outside of the canvas, it re-contracts and starts again.

```python

{% include 'code/python/perlin-noise-flower.py' %}

```

![third](/assets/img/posts/perlin-noise-flower/flower-3.png)

Each time the flower reverses direction, I take a screenshot so you can see how the flower develops and creates _ghostly_ layers that are reinforced the longer the sketch runs.
