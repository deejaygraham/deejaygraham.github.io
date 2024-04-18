---
permalink: 2017/06/01/playing-with-sonic-pi/
layout: post
title: Playing with Sonic Pi
tags: [ code, music ]
published: false
---

I'm teaching some more 101 level programmer classes and this time we're looking at <a href="http://sonic-pi.net/">Sonic Pi</a> as an introduction to text-based languages after playing with the building blocks of <a href="http://scratch.mit.edu/">Scratch</a>. I chose Sonic Pi because of it's immediacy of interaction and fast feedback going from typing code to seeing (or hearing) a result.


## First Steps

The first and simplest program you can write is a one liner to play a single note. Like this

```ruby

{% include 'code/ruby/sonicpi_1.rb' %}

```

Changing the numeric value changes the pitch of the note, lower values are lower in pitch, higher values are higher in pitch.

You can play two notes separated by small pause like this:

```ruby

{% include 'code/ruby/sonicpi_2.rb' %}

```

Notes are processed top to bottom in order. Sleep puts a pause in the program of that many seconds before playing the next note. If the sleep wasn't there, both notes would play together. Increasing and decreasing the sleep value changes length of the piece.

## Columbo Moment

One thing to mention before we go too far, as this is a text based language, spelling, case (upper and lower and mixed) and punctuation really matter. Things which are spelled differently really are different things to the computer, even if you didn't intend them to be different.


## Repeats

Music is often about repetition so it's good to be able to repeat phrases and there are a number of different ways that Sonic Pi supports this. An easy one is repeating something a number of times:

```ruby

{% include 'code/ruby/sonicpi_3.rb' %}

```

Maybe not terribly exciting but we can move on from there to do scales:

```ruby

{% include 'code/ruby/sonicpi_4.rb' %}

```

# C Chromatic scale

```ruby

{% include 'code/ruby/sonicpi_5.rb' %}

```

```ruby

{% include 'code/ruby/sonicpi_6.rb' %}

```
