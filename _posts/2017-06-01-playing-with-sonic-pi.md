---
layout: post
title: Playing with Sonic Pi
categories: [ code, music ]
published: false
---

I'm teaching some more 101 level programmer classes and this time we're looking at <a href="http://sonic-pi.net/">Sonic Pi</a> as an introduction to text-based languages after playing with the building blocks of <a href="http://scratch.mit.edu/">Scratch</a>. I chose Sonic Pi because of it's immediacy of interaction and fast feedback going from typing code to seeing (or hearing) a result.


## First Steps

The first and simplest program you can write is a one liner to play a single note. Like this

```ruby

play 60

```

Changing the numeric value changes the pitch of the note, lower values are lower in pitch, higher values are higher in pitch.

You can play two notes separated by small pause like this:

```ruby

play 60
sleep 0.5
play 62

```

Notes are processed top to bottom in order. Sleep puts a pause in the program of that many seconds before playing the next note. If the sleep wasn't there, both notes would play together. Increasing and decreasing the sleep value changes length of the piece.

## Columbo Moment

One thing to mention before we go too far, as this is a text based language, spelling, case (upper and lower and mixed) and punctuation really matter. Things which are spelled differently really are different things to the computer, even if you didn't intend them to be different.


## Repeats

Music is often about repetition so it's good to be able to repeat phrases and there are a number of different ways that Sonic Pi supports this. An easy one is repeating something a number of times:

```ruby

5.times do
  play 60
  sleep 1
end

```

Maybe not terribly exciting but we can move on from there to do scales:

```ruby

# play a chromatic scale

note = 60

12.times do
  play note
  note = note + 1
  sleep 0.5
end

```

# C Chromatic scale

```ruby

10.times do
  play chord(:E3, :major).choose
  sleep 1
end

root = 55

play root # C3
sleep 0.5
play root + 1
sleep 0.5
play root + 2
sleep 0.5
play root + 3
sleep 0.5
play root + 4
sleep 0.5
play root + 5
sleep 0.5
play root + 6
sleep 0.5
play root + 7
sleep 0.5
play root + 8
sleep 0.5
play root + 9
sleep 0.5
play root + 10
sleep 0.5
play root + 11
sleep 0.5
play root + 12 # C4
sleep 0.5

root = 50
note = root

12.times do
  play note
  sleep 0.5
  note = note + 1
end

```

```ruby
use_bpm 52

live_loop :bass do
  [:d2, :a2, :b2, :g2].each do |n|
    8.times do
      #      with_fx :rlpf do
      play n, release: 0.2
      #      end
      sleep 0.25
    end
  end
end

live_loop :kick do
  #  sync :bass
  sample :drum_bass_hard
  with_fx :slicer do
    sample :drum_bass_hard
  end
  sleep 0.5
end

chord(:e3, :major7).each do |n|
  play n
  sleep 0.5
end
live_loop :test do

  sample :bd_haus, rate: 1
  sleep 0.5

end

loop do
  play choose(chord(:e3))
  sleep 2
end

loop do
  with_fx :flanger do
    sample :ambi_haunted_hum, rate: (rrand 1.0, 2.5)
    sleep (rrand 0, 2)
    sample :perc_bell, rate: (rrand 1.0, 2.5)
    sleep rrand(0, 2)
  end
end


live_loop :foo do
  use_synth :prophet
  play :e2, release: 8, cutoff: rrand(70, 130)
  sleep 8
end

live_loop :bar do
  #use_synth :dark_ambience
  #play :c5
  #sample :bass_voxy_hit_c
  #sample :guit_e_fifths
  #sample :bd_haus
  play (ring :d, :r, :r, :a, :f5, :r, :a, :r).tick
  sleep 0.25
end

```
