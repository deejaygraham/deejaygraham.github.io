---
permalink: 2019/05/17/microbit-racing.html
layout: post
title: Microbit Racing
published: true
categories: [ code, microbit ]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

Racing fleas is a fun pastime, especially when those fleas are actually microbit pixels and no harm is done to 
actual fleas. Let’s build a game where we can race 5 fleas across the screen and the first flea to reach the 
right hand edge wins.

### On your marks...

We can represent a flea moving about on the micro:bit screen using a single pixel. Let’s create a list of two 
items that will represent the flea’s x and y position on the screen. Remember, the left column is 0 and the right 
column is number 4.

```python

{% include 'code/python/microbit/flea-race-1.py' %}

```

Now we can race one flea across the screen.

```python

{% include 'code/python/microbit/flea-race-2.py' %}

```

### Randomness

I hope you will agree, that’s not very exciting because each time you run the game, the outcome is the same. What 
about if we made it different every time? We can use random (and remember to import it at the top) to mix things up 
a little bit.


```python

{% include 'code/python/microbit/flea-race-3.py' %}

```

The random.randint function returns a random value between the two values given (0 and 1 in this case) each time 
it is called in the for loop and we use that value to see if we have been given a 1 value. If so, we can move the 
flea forward a little bit. Each flea has about the same opportunity to move, a 50% chance because there are only 
two values possible from randint in this code.

We increase the number of opportunities to move from 4 to 10 because we have the random chance where 
we may not move in 4 turns. There’s a problem with this code which you might have spotted. 

There's a problem with this code, though. Can you find it?


### Going too far

In between moving the flea and actually drawing on the screen, we can make sure we don't go beyond the 
fourth column by using the min function.

```python

{% include 'code/python/microbit/flea-race-4.py' %}

```

Now we have one flea racing with a different outcome every time, we can make preparations to race a lot of fleas.

We can do this by creating a collection of fleas and adding our single flea to it. That way we can write the code 
to work on the collection and don’t have to worry about how many fleas (within reason) we actually create later.

So after we created a single flea, let’s create a collection and add the flea to it.

```python

{% include 'code/python/microbit/flea-race-5.py' %}

```

Then we can expand our initial code to draw the fleas at their starting points.


```python

{% include 'code/python/microbit/flea-race-6.py' %}

```

And change the main movement and drawing code to use a collection:

```python

{% include 'code/python/microbit/flea-race-7.py' %}

```

Be careful to keep the sleep in line with the for loop so that the half-second delay is only done once 
around the loop. Now that we have things set up, we can add more fleas. Let’s given them more 
descriptive names:

```python

{% include 'code/python/microbit/flea-race-8.py' %}

```

That’s the only change we need to have 5 fleas, all racing in their own lane (y coordinate).

### Cheating

So that's a nice racing game which should have a different result each time. Each flea has a 50% chance or 
moving each time around the for loop, with random giving everyone an equal chance of winning, on average.

But what if we wanted to be a bit sneaky and cheat at the race? Could we make sure that one or two fleas would 
have a better chance than the others?

The critical piece of code is the call to random.randint that always has the same chance for each flea. If we 
manipulated the range of values available we could change the odds for each competitor. A flea which had a 1 
in 4 (25%) chance of advancing would probably not win against a flea which had a 1 in 2 (50%) chance of advancing.

We can use the flea object to store a chance value as well as the x and y coordinates.

```python

{% include 'code/python/microbit/flea-race-9.py' %}

```

Now we can change the random code to use the new chance value:

```python

{% include 'code/python/microbit/flea-race-10.py' %}

```

If you run the code again, you should see that alice and dave have the best chance of winning while poor 
eleanor has the worst (but not impossible) chance of winning with only 1 chance in 10 of moving for each turn.


### Finish

```python

{% include 'code/python/microbit/flea-race-11.py' %}

```

