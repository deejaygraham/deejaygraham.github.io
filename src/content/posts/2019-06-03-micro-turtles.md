---
permalink: 2019/06/03/micro-turtles/
layout: post
title: Microbit Turtles
published: true
tags: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

<a href="https://en.wikipedia.org/wiki/Turtle_graphics">Turtle</a> graphics are a time-honoured way to teach algorithmic thinking and are supported in <a href="https://docs.python.org/3.7/library/turtle.html">regular</a> <a href="https://python.camden.rutgers.edu/python_resources/python3_book/hello_little_turtles.html">python</a>.

Here's a small implementation of a turtle, complete with animation speed and pen
support, for the microbit.

{% highlight "python" %}

{% include 'code/python/microbit/micro-turtle-1.py' %}

{% endhighlight %}

The turtle always starts off in the centre of the screen, facing up. We can draw
a tiny 1 pixel square using dots that disappear when a new one appears:

{% highlight "python" %}

{% include 'code/python/microbit/micro-turtle-2.py' %}

{% endhighlight %}

Or we can use the pen to draw an outline around the screen from the top left corner.

{% highlight "python" %}

{% include 'code/python/microbit/micro-turtle-3.py' %}

{% endhighlight %}
