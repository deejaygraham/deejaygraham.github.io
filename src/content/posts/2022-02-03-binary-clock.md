---
permalink: 2022/02/03/binary-clock/
layout: post
title: Binary Clock
published: true
categories: [code, microbit, python]
thumbnail: img/posts/binary-clock/thumbnail-420x255.webp
alttext: screenshot
---

An early morning thought today was around making another project for the bbc microbit after talking about it again
to some of my mentees. The idea is just to represent time as a series of binary 'bits' via the led array on the front 
of the device. I was aware that the logistics of debugging this might be difficult on the device itself so decide to write 
a small simulation first for python 3 and then port it over to the device once I was happy with it.

The clock counter part seems simple enough. Start at zero, increment every second and reset at some later time, to begin 
counting all over again. 

The decimal to binary conversion is easy once you know that python already has a **bin** function that can convert decimal into 
a binary string. Similar to other programming languages, python prefixes these strings with "0b" to signify binary. This isn't used 
for our project so I remove it.  

The images displayed on a microbit have to be in a 5x5 array with colon characters between each row of values so I have 
kept that constraint in this program since a lot of the formatting of the text/image was what I was concerned about 
getting right. The output from the binary function gives us only as many digits as required to represent a particular 
number so we do need to right justify or pad out the string to the full width of 25 characters (5x5) using another function.
*rjust* in python does this for strings but unfortunately it's not available on the microbit's micropython so I opted to 
write my own version.

The last bit of formatting was to add in the colons between each row and that was another function required. 


```python

{% include 'code/python/binary-clock.py' %}

```

Because a 25 bit clock would take a long-ish time to roll around, I opted for a test value of just the first two rows to be filled 
before resetting. This will be adjusted on the final project. Another thing to note about the display, the print out is printing 
genuine binary values which makes for a better validation process but on the microbit the '1' value for an LED makes for a 
dim light so another step required is to leave all zero values alone and change all 1's into 9's for maximum brightness.
