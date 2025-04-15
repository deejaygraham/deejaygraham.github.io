---
title: Animated Bubbles
tags: [processing, code]
---

Quite a while ago, I played around with the <a href="2020-01-31-game-of-oligarchy-3.md">game of Oligarchy</a> in Processing 
and had the animation working to a certain extent. At the time I was a bit rushed and didn't have the bandwidth to properly 
look at animating the bubbles in the visualization so that they would cluster together and move apart as they grew or shrank 
in size or disappeared altogether. 

This piece of code does that animation and will be shoe-horned into the original at some point.

## Code


### Bubble

A simple bubble class with a position, a radius and a velocity where the position and velocity are PVector types to make 
calculations a little neater


```python

class Bubble:
    def __init__(self, position, radius):
        self.position = position
        self.radius = radius
        self.velocity = PVector(0, 0)

    def update(self):
        self.position.add(self.velocity)
        self.velocity *= 0.95  # Damping to slow down the movement
        pass
        
    def display(self):
        fill(100, 150, 200) # random colour
        ellipse(self.position.x, self.position.y, self.radius * 2, self.radius * 2)

```

### Animation

The movement of bubbles is handled in the code that tries to keep each bubble from overlapping it's neighbours 
but also tries to pull them together into a smaller huddle.

```python

def check_collisions():
    global bubbles
    for i in range(len(bubbles)):
        for j in range(i + 1, len(bubbles)):
            b1 = bubbles[i]
            b2 = bubbles[j]
            direction = b2.position - b1.position
            distance = direction.mag()
            minimum_distance = b1.radius + b2.radius
            if distance < minimum_distance:
                overlap = minimum_distance - distance
                direction.normalize()
                move = direction * (overlap / 2)
                b1.velocity -= move * 0.1
                b2.velocity += move * 0.1
                

def pull_towards_center():
    global bubbles
    center = PVector(width / 2, height / 2)
    
    for b in bubbles:
        direction = center - b.position
        direction.normalize()
        force = direction * 0.05 # Adjust this value to control the strength of the pull
        b.velocity += force

```

### Main

The main loop and event handlers for processing including a mechanism to add and remove 
bubbles for testing purposes.

```python

bubbles = []

# Add some initial content
def setup():
    global bubbles
    size(800, 800)
    
    bubbles.append(Bubble(PVector(100, 100), 50))
    bubbles.append(Bubble(PVector(200, 200), 75))
    bubbles.append(Bubble(PVector(300, 300), 60))

def draw():
    background(255, 255, 255)
    for b in bubbles:
        b.update()
        b.display()
    check_collisions()
    pull_towards_center()

# Add a new bubble at the mouse position with random size
def mousePressed():
    global bubbles
    bubbles.append(Bubble(PVector(mouseX, mouseY), random(30, 60)))

# Remove the last bubble when a key is pressed
def keyPressed():
    global bubbles
    if bubbles:
        bubbles.pop()
```
