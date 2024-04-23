---
permalink: 2019/05/15/microbit-tamagotchi/
layout: post
title: Microbotchi
published: true
tags: [ code, microbit ]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

I'm teaching another course of 'Coding for Absolute Beginners' using the BBC microbit and python to explain 
what programming is, what it looks like, how to write some simple games, how to debug and rubber-duck, to give 
delegates a flavour of what developers do for the non-technical person. 

### Canonical Egg Toy

One of the examples I use when explaining loops and conditionals is working up to a very simple tamagotchi clone, a 
microbotchi if you will, in which the microbit 'sleeps' until it's woken up by shaking the microbit.


{% highlight "python" %}

{% include 'code/python/microbit/microbotchi-1.py' %}

{% endhighlight %}

While we were talking about this example some of the discussion got into how to make this more realistic with 
some more emotions, activities, feeding etc. and even, if the egg goes neglected for too long, dying. I thought it 
might be fun to try a worked example of this, step by step, so this, dear reader, is that post. 


### Microbotchi Begins

So, let's start fresh with a normally happy little egg. It doesn't have much of a life but at least it's happy. And for 
a morbid touch we'll make provision for it's eventual death when we exit the while loop of it's life.


{% highlight "python" %}

{% include 'code/python/microbit/microbotchi-2.py' %}

{% endhighlight %}


### Microbotchi Health

Speaking of death, if the egg gets ill enough, it should probably die and end the game. So we can model that with a simple 
health score which we set suitably high at birth and let it deplete over time such that if it's left alone long enough 
it will die on it's own. We don't want it to leak away too soon so I've put a delay (sleep) into the while loop.

{% highlight "python" %}

{% include 'code/python/microbit/microbotchi-3.py' %}

{% endhighlight %}

We start off with a score of 100 and if we leave it alone, it will "die" after 100 seconds. What would keep the egg alive? 
Maybe feeding it every so often by pressing the "a" button? Every time we get a food pellet we increase our health by a fixed 
amount.


### Food

{% highlight "python" %}

{% include 'code/python/microbit/microbotchi-4.py' %}

{% endhighlight %}


### Happiness and Play

We can follow a similar approach to modelling emotion, we need to have a quantifiable happiness indicator, say, and a way for that 
to change over time into ... sadness?

Let's create a happiness score and deplete it each time around the loop. We can also make the egg happier by playing with it. Maybe 
that can be using gestures to interact.

{% highlight "python" %}

{% include 'code/python/microbit/microbotchi-4.py' %}

{% endhighlight %}


### Sleep

Finally, we might want to put in something so that if it's left alone for a little while, it will go to sleep. And feeding or playing it 
will wake it up for a while.

{% highlight "python" %}

{% include 'code/python/microbit/microbotchi-5.py' %}

{% endhighlight %}


### Tidying Up

Now the only thing left to do, is put in an introduction, where we start with an egg before it hatches and the game starts proper. Also 
we can do some animation around playing, eating and dying.

{% highlight "python" %}

{% include 'code/python/microbit/microbotchi-6.py' %}

{% endhighlight %}

