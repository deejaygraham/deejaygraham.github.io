---
layout: post
title: Game of Oligarchy Part 2
published: true
categories: [code, processing]
thumbnail: "/img/posts/game-of-oligarchy-2/thumbnail-420x255.webp"
alttext: players
---

Finally got back around to making some enhancements to the game of oligarchy I started in processing at the beginning of the month. 

I wasn't done with the game because I was just using a coin toss against every player who was not bankrupt rather than pairing them off against each other. The rules of 
the game call for each player to be paired with another and for each to bet the lower of the two players available stakes which amounts to half their current pot.

I needed to change the algorithm for play within the draw method but the changes weren't too difficult to implement. 


## Better Game

Rather than play each player every time, we start off the draw method with a list of unpaired players (the players still in the game) and an empty dictionary of the 
pairs we are going to build. I use random to pick each player out of the unpaired list and then remove them so we don't accidentally pick them twice. 

```python

{% include code/python/oligarchy-draw-2.py %}

```

I had to add in a couple of lines to work with only the paired players, agree on a bet amount and then award a win and a lose based on the same coin toss code from last time. 
We then have to make sure to display all the players with their current status. 


## Enhancements

Next, I want to give a better illustration of how much each player has at any point in time by maybe representing them as bigger 
or smaller circles on the screen so that as they win or lose, the display shows a bit more dynamic animation than currently with 
just colours.


