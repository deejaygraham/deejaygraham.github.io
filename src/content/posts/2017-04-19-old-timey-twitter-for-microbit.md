---
permalink: 2017/04/19/old-timey-twitter-for-microbit/
layout: post
title: Old-Timey Twitter for the Microbit
tags: [code, microbit]
published: true
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

Teaching some maker classes at <a href="http://campusnorth.com">campus north</a> this week, I was showing the students how to send and receive text using the microbit's <a href="https://microbit-micropython.readthedocs.io/en/latest/radio.html">radio API</a>.

As you might expect, the radio allows you to broadcast text to other microbits within range of the sender. The transmitter on the device is not hugely powerful, so the range works out to be about 2 metres.

We all had a great time playing with this feature and sending text messages to other microbits within range. Throughout the afternoon we had lots of instances where spelling mistakes, incorrect indenting or bad logic meant that the microbit would suddenly start scrolling some error text across the screen.

I began to realise the students were getting comfortable with the microbit when they changed the application code to broadcast spoof python runtime errors to other devices, leading to lots of head scratching before the recipient realised that the error wasn't in their program and was instead a message from an evil neighbour!

I made an off-the-cuff comment that the example I had just written up on the board that this was like an old-timey twitter. This got a big laugh and the students really seemed to enjoy experimenting with the application and seeing what they could do with it. I thought it might be fun to share the code here.

{% highlight "python" %}

{% include 'code/python/microbit/old-timey-twitter.py' %}

{% endhighlight %}
