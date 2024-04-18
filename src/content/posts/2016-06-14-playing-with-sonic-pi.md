---
permalink: 2016/06/14/playing-with-sonic-pi/
layout: post
title: Playing with Sonic Pi
published: true
tags: [ raspberry-pi, music  ]
---

There are several ways to play notes using sonic pi, not all of them obvious from the
start.

### Single Notes

Single notes are played using the *play* function but the arguments can be formulated in a
couple of different ways.  

First, there's the obvious one, found in all the tutorials, where you define the note to play
using an integer value:

    play 60
    sleep 0.5

This plays a middle C for half a second. Note values can also be described using ruby symbols. Here's
the same note, middle C, using a symbol that defines the note name and the octave:

    play :C5
    sleep 0.5

Note that incidentals are available, sharps use an 's' in between the note name and the octave,
flats use a 'b'.

    play :Cs5
    sleep 0.5
    play :Eb5
    sleep 0.5

Finally, especially if you are delving into algorithmic composition, you can play with a note
value defined in a variable:    

    middle_c = 60

    play middle_c
    sleep 0.5

### Sequences    

Sequences of single notes are played using play_pattern or play_pattern_timed. If you are using
a specific tempo, you can use play_timed to play a sequence of notes using the current tempo. The
notes are written as a comma delimited list:

    play_pattern [40, 45, 44, 43]

If you prefer to explicitly specify timing, you can use play_pattern_timed and give individual
delays between each pair of notes. Playing these two notes one after another:


    play 60
    sleep 0.5
    play 65
    sleep 0.75

is the same as this:

    play_pattern_timed [60, 65], [0.5, 0.75]

If the delay between notes is the same we can shorten it to:

    play_pattern_timed [60, 65], 0.5

We can also cycle the timing between values in the timing list by providing fewer timing values
than note values.  

    play_pattern_timed [60, 65, 60, 62], [0.5, 0.2]

will alternate between delays of 0.5 and 0.2 seconds for each pair of notes. Using play_pattern
makes the code more readable, you can keep related groups of notes together rather than long
passages of single play/sleep pairs.

### Chords  

A chord is a collection of notes played at the same time. Because it is a collection, sonic pi
uses the same list notation that the play_pattern function used:

    play_chord [ :C3, G3, :C4 ] # power chords !!!
