---
permalink: 2021/04/01/xmas-fireflies/
layout: post
title: Christmas Fireflies
published: true
categories: [code, processing, python]
thumbnail: img/posts/xmas-fireflies/xmas-fireflies-420x255.webp
alttext: screenshot
---

Exploring some more fun and simple examples of generative art I stumbled on this example which uses Perlin Noise to generate a sort of 
"Drunkards Walk" around the canvas.

![first](/img/posts/xmas-fireflies/xmas-fireflies-1.webp)

I stared with plain white circles but then thought it might be more fun to try using random colours for each dot. The effect is very much like a 
house fly or fire fly flying around the screen and leaving coloured dots behind, almost as if they were stringing up Christmas lights as they 
moved about - hence the name of this example.

```python

{% include 'code/python/xmas-fireflies.py' %}

```

![second](/img/posts/xmas-fireflies/xmas-fireflies-2.webp)

I found that leaving this sketch to run too long ruined the effect against the black background so put in an arbitrary end condition when 
the firefly gets to the top left quadrant of the canvas. 
