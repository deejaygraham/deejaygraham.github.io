---
permalink: 2020/11/10/random-city-skyline/
layout: post
title: Random City Skyline
published: true
tags: [code, processing]
hero: microbit
thumbnail: /img/posts/random-city-skyline/thumbnail-420x255.webp
alttext: processing skyline
---

Another presentation to talk about what computer programs are and how they work and I needed a short demo on how to iteratively build 
a program in python which had some kind of obvious visual component so that changes to the program would be reflected in the remote session. 

This turned into how to build a random cityscape and a city skyline at sunset.


### Straight Lines

Since this was going to be done in processing I started off with a sketch that had an orange-y background and added a single line crossing the 
screen.

{% highlight "python" %}

{% include 'code/python/skyline-1.py' %}

{% endhighlight %}

This line will carry on forever so it would be nice to reset it when we reach the far edge of the screen.


{% highlight "python" %}

{% include 'code/python/skyline-2.py' %}

{% endhighlight %}

This is all wonderful to get started but there's not a lot of variety yet and it doesn't look much like a city yet.


### Wiggly Lines

Introducing some randomness into the height of the line as it crosses the screen makes things a bit more interesting.


{% highlight "python" %}

{% include 'code/python/skyline-3.py' %}

{% endhighlight %}

That is starting to look like a city skyline. We can do more by filling in the bottom half of the rectangles to make them 
black as if the sunset is casting a shadow.


### Crooked Teeth

In homeage to the Ben Gibbard song "Crooked Teeth" about a city skyline, if we fill in the buildings in black we get this.

{% highlight "python" %}

{% include 'code/python/skyline-4.py' %}

{% endhighlight %}

Note I have left the white line around the buildings as a highlight from the setting sun.


### Anybody Home?

The last detail to add in this scenario as the city is getting ready for night, is the appearance of lights in a few windows in the 
buildings we can see.

{% highlight "python" %}

{% include 'code/python/skyline-5.py' %}

{% endhighlight %}

In the same way that each call to draw adds a new section of building, I add a random window to the scene as well now.

Depending on how fast this runs, you may want to change the frame rate so that it's not going by too quickly.


### City Depth 

As a final, final experiment I added another layer of buildings behind the main layer. Not sure how well this works.


{% highlight "python" %}

{% include 'code/python/skyline-6.py' %}

{% endhighlight %}

