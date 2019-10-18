---
layout: post
title: Pythonic Idioms
published: true
categories: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.jpg"
alttext: microbit sorting hat
---

I always seem to find myself having to look up the "right" way to structure a piece of logic in Python so I thought I would
create a little cheatsheet for myself (and anyone else for that matter).

### Assignment

We can assign a single value to more than one variable.

```python

{% include code/python/idioms-4.py %}

```

### Comparison

I have always done explicit, separate comparisons in an if, probably because I came from a C background. Chaining
comparisons together is much more natural for a single value.

```python

{% include code/python/idioms-1.py %}

```

### Ternary Operators

Slightly more arcane to my mind but reminiscent of ruby syntax, ternary operators work a little different from C-like
languages

```python

{% include code/python/idioms-2.py %}

```

### In With the In Crowd

Testing if a value exists in a set of options, or for iterating through a set of values.

```python

{% include code/python/idioms-3.py %}

```

### String Placeholders

```python

{% include code/python/idioms-5.py %}

```
