---
permalink: 2024/06/24/emergent-lettering/
layout: post
title: Emergent Lettering
published: true
tags: [code, processing, python]
---

I saw a clip of video a few days ago of an interview where the people on stage had a huge wall-sized display behind them and on which 
there was a grid and of giant "pixels"/blocks. Gradually, letter by letter, a sentence was displayed on the screen in a pixelated font over 
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

The most interesting bit comes when we put the letters into sentences. We need to split the words into individual letters and work out where on screen 
they should be shown.

```python

class Sentence:
    
    def __init__(self, words, x, y):
        self.sentence = []
        self.show = True
        
        for character in words:
            letter = Letter(character, x, y)
            x += textWidth(letter.letter)
            self.sentence.append(letter)
    
    def draw(self):    
        fill(0)
            
        for character in self.sentence:
            character.display()
     
    def indices(self, visible):
        return [ i for i, x in enumerate(self.sentence) if x.visible == visible]
    
    def reveal(self):
        
        try:

            # find items still remaining to show or hide
            indicesToProcess = self.indices(not self.show)
            # pick one
            randomIndex = int(random(len(indicesToProcess)))
            # use this letter
            index = indicesToProcess[randomIndex]
              
            self.sentence[index].makeVisible(self.show)

            # check if we are done showing or hiding
            visible_states = [l.visible for l in self.sentence]
            
            if self.show:
                # switch if all are visible now
                all_shown = all(visible_states)
    
                if all_shown:
                    self.show = False
            else:
                # switch if none of the letters are visible
                any_shown = any(visible_states)
                if not any_shown:
                    self.show = True

        except exception as e:
            print(e.message)

```

The drawing code only shows letters in the sentence which are visible. Once all the letters have been shown, we flip into hiding the letters and when they are 
all hidden we flip back to showing again. Each time the reveal function is called it tries to find a
new letter to show or hide. The ```indices``` function uses ```enumerate``` to work out the indices of items in the list that match either hidden or visible. The python 
```all``` and ```any``` functions also come in handy when trying to work out when we need to flip the state of the showing or hiding in the main loop. 

Finally, the main invoking code puts it all together here:

```python

message = 'hello world'

background_colour = color(random(0, 255), random(0, 255), random(0, 255))
grid_spacing = 8
grid_colour = color(128, 128, 128)
        
def setup():
    global sentence, grid
    
    size(1000, 500)
    textSize(64)
    textAlign(CENTER)
    strokeJoin(ROUND)
    
    frameRate(5)
    
    grid = Grid(grid_colour, grid_spacing)
    sentence = Sentence(message, 10, height / 2)
        
def draw():
    background(background_colour)
    grid.draw()
    sentence.draw()
    sentence.reveal()

```


