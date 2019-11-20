---
layout: post
title: Refactoring Boids
published: true
categories: [code]
---

<a href="https://processing.org/examples/flocking.html">Boids</a>, by <a href="https://shiffman.net/">Daniel Shiffman</a> is a <a href="https://processing.org/">Processing</a> example of the flocking algorithm developed by Craig Reynolds using simple rules for individual "boids" to simulate the behaviour seen 
in flocks of real birds.

As a challenge from a colleague I wanted to see how I could refactor the code from a single file into smaller chunks so it's more readable and understandable.

### Original

Here's the original code from the processing website:

```java

{% include code/java/boids_original/boids_original.pde %}

```

### Python

To make things more interesting, I thought I would refactor or rework in Python. 


### Split

First off, we have three distinct classes - the main game class, the flock (a container for the
boids) and the boid class itself. In processing, we can add two extra tabs and reference those from the 
main file. 

One important thing to note when dealing with multi-tab projects in Processing, pay special attention to which tabs 
are currently saved because they aren't by default and you can be editing one version of the code but running the last 
saved version which can be a bit confusing. The modified indicator in processing isn't very noticeable. 

### Game

In setup(), we set full screen, then create our initial flock (and we let the flock itself decide how big it's going to be).

```python

{% include code/python/boids-game.py %}

```

In draw(), we have to let the flock move itself and I much prefer the function to be fly() rather than run(). Flying birds aren't usually that great at running :). When a mouse button is pressed, we add a new member to the flock at the 
current mouse position. That seems to work fine. Let's move onto the Flock itself.  

### Flock

As mentioned above, I have chosen to describe the flock in terms of it's members - adding, flying - rather than talking 
about running, drawing and addingBoid from the original version. 


```python

{% include code/python/boids-flock-1.py %}

```

### Boid

To get started, I have opted for a super simple version of the boid implementation. It records where it was created and 
never moves but just draws a black line from the original to its position to show itself. 


```python

{% include code/python/boids-boid-1.py %}

```

### Debug

At this point, it's very useful to use the print() function to output what's happening to the console. Also for debugging purposes, 
I'm using the right mouse button to trigger a screenshot.

![initial flock](/img/posts/refactoring-boids/refactoring-boids-1.png)

### Boids

Now that we have something like a manageable split between the three concerns, game, flock and individual boid, it's time to look at the implementation 
of the boid itself and the rules it uses to interact with the flock-mates. 

Here's a pretty straight rewrite of the original code from Java to Python and by far the biggest bit of the rewrite before the actual refactor:

```python

{% include code/python/boids-boid-2.py %}

```

### Refactor

So, what opportunities do we have to refactor (code and functionality)?

- Lots of maths which is a bit difficult to understand
- Hard coded creation policy
- No flexibility in drawing
- All boids behave in pretty much the same way. 
