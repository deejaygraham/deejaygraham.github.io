---
layout: post
title: Game of Oligarchy Part 3
published: true
categories: [code, processing]
thumbnail: "/img/posts/game-of-oligarchy-3/thumbnail-420x255.png"
alttext: players
---

The last round of messing about with this program. I mentioned in the second installment that I wanted to have some animation in 
the finished version to make the state of play at any one time more intuitive to the viewer. 

![grid](/img/posts/game-of-oligarchy-3/grid-000001.png)

Here I have laid the players out in a line and kept the colour coding as before but in addition I am showing them 
as coloured circles and dynamically inflating or deflating the size of each player based on their current balance. 

![grid](/img/posts/game-of-oligarchy-3/grid-000025.png)

Over time the "winners" will tend to dominate the screen and the "losers" will shrink and eventually disappear.

![grid](/img/posts/game-of-oligarchy-3/grid-000060.png)

I've included the whole code here because I needed to make changes to the Player and the Game to be able to run the inflation/deflation 
animation distinct from the individual pairings. 

```python

{% include code/python/oligarchy-3.py %}

```

I'm not super happy with the code to do the layout of the circles and them moving around dynamically in response to the wins and losses. 
This could stand to be reworked at another time when I learn more about making processing code more elegant.

