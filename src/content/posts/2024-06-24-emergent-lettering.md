---
permalink: 2024/06/24/emergent-lettering/
layout: post
title: Emergent Lettering
published: true
tags: [code, processing, python]
---

I saw a clip of videa a few days ago of an interview where the people on stage had a huge wall-sized display behind them and on which 
there was a grid and of giant "pixels"/blockes. Gradually, letter by letter, a sentence was displayed on the screen in a pixelated font over 
a period of a few seconds, paused, then disappeared again, letter by letter.

The effect looked really cool and I thought it might be fun to replicate something like it in processing. All of the following code is split 
into chunks for understandability but in reality this was all in one sketch file. 

I started with the background grid:

```python

class Grid:
    
    def __init__(self, colour, spacing):
        self.colour = colour
        self.spacing = spacing
        
    def draw(self):
        stroke(self.colour)
    
        for x in range(0, width, self.spacing):
            line(x, 0, x, height)
        
        for y in range(0, height, self.spacing):
            line(0, y, width, y)

```

Followed by the idea of each individual letter than can be shown or hidden as required. By default each letter will be hidden:

```python

class Letter:
    
    def __init__(self, letter, x, y):
        self.letter = letter
        self.x = x
        self.y = y
        self.visible = False

    def display(self):
        fill(0)
        textAlign(LEFT)
        
        if self.visible:
            text(self.letter, self.x, self.y)
            
    def makeVisible(self, v):
        self.visible = v
            
```

