---
title: Tumbling Arrows
thumbnail: /img/posts/tumbling-arrows/thumbnail-420x255.png
tags: [code, processing, python]
---

A tiny sketch in Processing on my way somewhere else. I was playing about with flow fields but needed a way to visualize what was happening in a bigger sketch so I created a little test program to 
draw arrows at specific rotations around a circle using pushMatrix, translate and rotate.

What started as a test piece turned into something that looked quite nice standing on its own (see screenshot). So here it is. 

```python

size(1500, 500)
stroke(0)

def arrow(x, y, len, head, angle):
    pushMatrix()
    translate(x, y) # move to blunt end of arrow
    
    rotate(radians(angle))
    
    line(0, 0, len, 0) # shaft
    line(len, 0, len - head, - head) # left hand of head
    line(len, 0, len - head, + head) # right hand of head
    
    popMatrix()
   
arrows = 12
angle = 0.0 
delta = 360.0 / arrows

arrow_length = 50
arrow_head = 5
x = 50
y = 150

for i in range(arrows):
    arrow(x, y, arrow_length, arrow_head, angle) # rotate from 3 o clock
    angle += delta
    x += arrow_length + arrow_head

```
