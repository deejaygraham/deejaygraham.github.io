---
title: Transcribing Sheet Music for the Microbit
tags: [code, microbit, music]
hero: microbit
thumbnail: /img/posts/transcribing-sheetmusic-for-the-microbit/thumbnail-420x255.webp
alttext: microbit
---

Continuing with the theme of music on the microbit, there's a little bit of complexity in translating from standard
sheet music notation - dots and lines arranged on staves - into the microbit's music DSL - note names, octaves and durations.
Longer lasting notes on the microbit have higher note lengths associated with them.

The day before Halloween, it feels appropriate to consider a short piece of spooky music like Mysterioso Pizzicato.

![sheet music](/img/posts/transcribing-sheetmusic-for-the-microbit/mysterioso-pizzicato.webp)

### Sheet Music

In sheet music, pitches are defined by where they are placed on the stave, the higher the placement, the higher the note. For the
micrbot, middle C is represented as C4.

![treble clef](/img/posts/transcribing-sheetmusic-for-the-microbit/treble-clef.webp)

Notes and rests have length values denoted by their individual shape and may be modified by a dot immediately after a note or rest
which adds 50% more to the length.

![notes](/img/posts/transcribing-sheetmusic-for-the-microbit/notes.webp)

![rests](/img/posts/transcribing-sheetmusic-for-the-microbit/rests.webp)

### Translation

The translation process then goes something like this:

- Set the beats per minute according to the direction in the music.
- Work out how many notes fit into each bar. Notes and rests together should add up to the number of beats in each bar.
- For notes, identify the pitch.
- Identify the duration and append to the note name

Keep testing the transcription as you go along to make sure it sounds correct. It's easy to miscount or miss a rest, notes that are tied
across bars or dotted to extend their duration.

### Mysterioso

So for the snippet of music above, the score would work like this:

```txt

{% include 'code/python/microbit/mysterioso.txt' %}

```

Note how each bar adds up to 16 beats each.
