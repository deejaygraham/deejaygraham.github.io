---
layout: post
title: Old-Timey Snapchat for the Microbit
categories: [ code, microbit ]
published: true
---

As a I mentioned in my other post from today about the microbit radio API, teaching the maker class gave me some new ideas for playing with the microbit. One of the students asked me if it was possible, since we could send text to another device, could we also send a picture because Image objects are created using colon separated strings of intensity values. I tried to write a skeleton on a keynote slide to get them going but it didn't seem to work correctly. I had hoped that the str() function or the repr() function might have given me a serializable form of an image such that I could send it to another device. Unfortunately the text returned from either of these functions wasn't the right format to be imported directly by another microbit. I had to create my own function to iterate across the image, reading each pixel and building up a string in the correct format.

<script src="https://gist.github.com/deejaygraham/f8ec075fba6d6c7f6c026b8a83d52ac2.js"></script>
