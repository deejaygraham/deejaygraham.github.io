---
layout: post
title: Game of Oligarchy
published: true
categories: [code, processing]
thumbnail: "/img/posts/game-of-oligarchy/thumbnail-420x255.webp"
alttext: players
---

I came across a <a href="http://brewster.kahle.org/2019/11/30/the-game-of-oligarchy/">post from Brewster Kahle</a> before Christmas where he was talking about a new game he had invented illustrating the problem of 
wealth accumulation and redistribution along the lines of <a href="https://en.wikipedia.org/wiki/Capital_in_the_Twenty-First_Century">Thomas Piketty</a>.

There was also a php <a href="https://hackerfactor.com/oligarchy-game.php">implementation of the game</a> by Neal Krawetz to illustrate 
how easy it is for one individual to accumulate all the wealth. Alongside that is <a href="https://hackerfactor.com/oligarchy-game.php?soc">a "socialism" extension</a> 
to show how redistribution of wealth through taxation doesn't stop the accumulation of wealth but puts a brake on 
the super-concentration of wealth without completely forcing everyone to have the same income - a frequently levelled argument 
for not doing wealth redistribution. See the links above for the rules as they were implemented. 

Neal's implementation creates a table-based turn by turn simulation of the game but I wondered if I could use a different tool 
to give it a more interactive feel. Of course, I thought of my new favourite multi-media programming tool - Processing!

I implemented the whole "game" in one python file but split it up into a class for the Player and the game logic was left in the 
default application drawing code. 

![grid](/img/posts/game-of-oligarchy/grid-1.webp)

## Player

![grid](/img/posts/game-of-oligarchy/grid-2.webp)

The player has a location on the board, a number for identification, and a sum of money. All players start with the same amount.
Rather than getting too fancy to begin with, I represent each player as a square with their number in the centre and use colour 
coding to denote how well they are doing. Bright green for lots of money, darker green for modest amounts, red for close to losing, and grey for out of the game. 

```python

{% include 'code/python/oligarchy-1.py' %}

```

The rules also call for each player to declare how much they are willing to bet (half their pot of money) and be able to win 
or lose that amount. 

![grid](/img/posts/game-of-oligarchy/grid-3.webp)


## Simple Game

Once the player was done, I moved onto the game logic itself. I created an array of 9 players and laid them out in a grid. 
The frame rate for the game is super slow at 1 fps just because I am using the draw method as the turn indicator and didn't want the game to be over before you could blink. 

![grid](/img/posts/game-of-oligarchy/grid-4.webp)

The original game calls for players to play against a random opponent selected from the other players. For this initial version, 
I elected not to do that but just to try things out with a simple coin toss for each player and award a win or a loss depending on 
whether heads or tails was returned. 

```python

{% include 'code/python/oligarchy-2.py' %}

```

I also added in some code to capture each frame so you can see how the game proceeds through each turn.

![grid](/img/posts/game-of-oligarchy/grid-5.webp)

## Enhancements

Next I think we should make the players play against each other with a more sophisticated selection routine and maybe 
illustrate the winning and losing more explicitly, perhaps by increasing and decreasing the size of the player's avatar 
depending on whether they are winning or losing. There could be some interesting animations to try with that. 

![grid](/img/posts/game-of-oligarchy/grid-6.webp)
