---
permalink: 2020/04/12/microbit-game-of-life/
layout: post
title: Game of Life 2
published: true
tags: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

I heard about John Conway's death from COVID-19 this weekend and was thinking about his most famous
contribution, the Game of Life. I did an implementation for the microbit a while ago modelling explicit
population objects as two dimensional arrays of cells.

![example](/img/posts/microbit-game-of-life/game.gif)

Reconsidering this implementation, it seemed a bit too complicated for what was needed and often seemed
to run out of stack space when running. The thought occurred that the display itself could be used as a
sort of variable. After all, the original version worked with an array of cells that were manipulated according
to the rules of the game then mapped to the 5 x 5 led display to show the current state. If we get rid of the
intermediate representation, then the display can be lit with the live cells and we can read the state of
any particular cell by using get_pixel.

{% highlight "python" %}

{% include 'code/python/microbit/game-of-life-2.py' %}

{% endhighlight %}

Removing the population variables and passing objects around in the code tidies things up a bit at the
expense of having a "global" display variable used to hold the internal game state. I think that the code is
easier to read and is less complicated plus it comes in at fewer actual lines of code.

### Fading

One feature that slightly complicates the main game loop is the fading out of dying pixels. I added this in so that the transition
from one population to the other was a bit more obvious and you can hopefully see how the changes are happening because of this feature.

### Bug

There is one weakness with this implementation. Because we are updating the display as we go along in applying the rules, it's possible that the new state of the game bleeds into the current state as we proceed top left to bottom right which would have an impact on certain configurations. Better to read the current state and create a blank image object and update that with new state then blt that to the display.

It turns out that is really easy to do. We create a new image in the apply rules function, update it with set_pixel as we
work our way through the cells, then use display.show at the end to make this image the new state of the game.

{% highlight "python" %}

{% include 'code/python/microbit/game-of-life-3.py' %}

{% endhighlight %}

Once this is addressed, the shapes that appear are subtly different and the stable and unstable end states are different too.
