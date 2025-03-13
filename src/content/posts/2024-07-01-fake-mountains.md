---
title: Fake Mountains
thumbnail: /img/posts/fake-mountains/thumbnail-420x255.png
tags: [code, processing, python]
---

A tiny processing script to generate a fake mountain range on the horizon.

```python

size(420, 255)

background(255)
strokeWeight(5)
stroke(0, 30)
line(20, 50, 480, 50)

stroke(20, 50, 70)

step = 5
noise_level = 0.1
lastx = -1
lasty = -1
ynoise = 0.0
y = 0
border = 20

for x in range(border, width - border, step):
    y = (height / 3) + noise(ynoise) * 80
    if lastx > 0:
        line(x, y, lastx, lasty)
    lastx = x
    lasty = y
    ynoise += noise_level

```

I added a light gray horizontal line for comparison.
