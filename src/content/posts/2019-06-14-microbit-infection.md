---
permalink: 2019/06/14/microbit-infection/
layout: post
title: Microbit Infection
published: true
categories: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

<a href="https://makecode.microbit.org/projects/infection">Infection</a> is a multi-player game that can be played
using the radio to model the spread of an infection through a population. I couldn't find an implementation in
Python so thought we should create one for our codind dojo. Here is one approach using an OO model to handle the
progression of a disease in a host from healthy to sick and (the great) beyond.

## Player

We can start with a player class to model how we think about progression of the infection. At some point we will come in contact
with an infected person and need to decide if we pick up the infection from them. Once infected we will pass on the infection and
we need a way to signal that the game is over with. Our game loop and initial player looks like this.

```python

{% include 'code/python/microbit/infection-1.py' %}

```

Contract and Incubate methods are opportunities for a state change so in the normal case we just return "ourselves" but we have the
option to override this behaviour in subclasses to return a different patient "state". We will derive new states from the Player to
model the stages of the spread of the disease.

## Healthy

According to the rules, a healthy player is happy but can contract an illness. So we need a way to specify what an illness
looks like and the rules around transmitting it and contracting it.

## Illness

```python

{% include 'code/python/microbit/infection-2.py' %}

```

Sending the virus is easy, we broadcast the word virus to all those around us. Checking whether an virus is contagious gives us
some space to get creative. We can just identify the word as the easiest thing or use a combination of random chance, look at the
signal strength of the recevied message to see if the person is "close enough" or something else. The important thing is the
decision logic is encapsulated within the Illness itself.

## The Great Beyond

Let's jump straight to the end and look at what death looks like.

```python

{% include 'code/python/microbit/infection-3.py' %}

```

For this case we are saying a dead patient is shown by the ghost and the "done" flag tells us the game is over.

## Healthy Again

Turning our attention to the healthy player, we can instantiate one in the place of our first player so that we
start off the game in a good state. Healthy players are happy but also have a chance of catching an infection so we
need to check for this by asking if an received illness is contagious.

```python

{% include 'code/python/microbit/infection-4.py' %}

```

We also override the incubate method to give us a quick way of simulating a patient zero condition. Pressing both
buttons will turn a healthy person into a suitably infected person.

## Infected

An infected person is able to transmit an illness to those around them according to illness rules. They can also
incubate for a set period of time before transitioning into a Sick person so we setup a timer and increment it
every time we do an incubate in the loop.

```python

{% include 'code/python/microbit/infection-5.py' %}

```

Note I am using the confused icon to represent this state for debugging but in a real game this would be replaced with
the happy icon so no one is able to tell that you are a contagious person, in line with the original rules.

## Sick

Similar to the Infected role, a sick person has a timer associated with it so that they only stay sick for a certain period.
They have a different icon so we can tell they are sick but they are no longer infectious so don't spread the disease any
further.

```python

{% include 'code/python/microbit/infection-6.py' %}

```

And that's it for all the stages of the game. We need an initiator to kick off the first sick person but that can be done
without the healthy person test code and could be done with some bespoke code run on a separate device. It might also be
interesting to see how things play out if a person could recover from an infection, if a sick person also was able to continue
spreading infection or if the later stages of the infection proceeded quicker than in this example.
