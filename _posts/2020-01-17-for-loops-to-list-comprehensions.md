---
layout: post
title: Refactoring Nested For Loops to List Comprehensions
published: true
categories: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.jpg"
alttext: microbit sorting hat
---

Playing around with some more python code for the microbit, I noticed when I typically need to write to individual pixels on the 
LED matrix display, I default to a set of two nested "for" loops. That always feels kind of wrong to me and I wondered how the code 
would look using a list comprehension as micro python supports that construct.

First the original version...

```python

{% include code/python/microbit/pixel-for-loop.py %}

```

and using the list comprehension syntax. We compress the two for loops into a single generator to create a list of x, y pairs. In this case, 
it generates it so that it works from top left (0, 0) across the top row (4, 0) then down to the next row and so on down to (4, 4) in the 
bottom right.

```python

{% include code/python/microbit/pixel-list-comp-1.py %}

```

To work with y values going down the columns first, you can reverse the order of the two for pieces, still working from top left to bottom right 
but in the opposite sense. 

```python

{% include code/python/microbit/pixel-list-comp-2.py %}

```

So slightly more compact, one for loop to traverse when we are doing stuff to the leds and that list can be reused for each time we 
want to iterate through the leds in the display. 
