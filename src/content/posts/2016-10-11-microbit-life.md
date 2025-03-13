---
title: Microbit Life
tags: [code, microbit]
hero: microbit


---

<a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">Conway's Game of Life</a> is a programming
classic used in katas, to teach TDD ideas and even features in the annual <a href="http://coderetreat.org/">code retreat</a>
events around the world. It's a wonderful example of fairly simple code giving rise to some
complicated and often beautiful behaviour. It's also a good demonstration piece because it
doesn't require any human intervention to run and will often carry on generating new patterns
long after it has been started.

You're _way_ ahead of me, aren't you?

If it's such a programming classic, my thoughts went, it should be easy - or at least
possible - to write it in Python for the microbit? And so the challenge began to form
in my head.

### Recursion

Traditionally, game of life is often implemented using recursion or other exotic device to
make the code more expressive and beautiful and use fewer lines of code. My first cut of the
program tried a recursive algorithm but I found that even though the program worked,
occasionally it would crash with a stack space error. This seemed to be related to the current
and evolving pattern, derived from the random starting configuration. Not all patterns would
crash the program, only a select few but in each case it seemed to be that the program
interpreter on the microbit was running out of stack.

To get around this and still keep a hope of having minimal code, I tried falling back to
Python list comprehensions. This worked slightly better but our random startup code still
could generate an initial pattern that could crash the interpreter.

### Code

So, what I have as a working solution can be seen below.

```python

{% include 'code/python/microbit/game-of-life.py' %}

```

It's true that there is a lot of repeated list iteration code and it feels like it could
be shorter but I have left it like this based on feedback from some beginning coders who
found this version easier to follow.
