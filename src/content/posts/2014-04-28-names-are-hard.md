---
layout: post
title: Names Are Hard
published: true
categories: [ code, naming, open-source, ndifference ]
---

It's a common complaint in writing software in general and one of the difficulties 
in starting an open source project is coming up with a name that is unique, 
self descriptive, doesn't clash with something already in the world and 
fits the project. You can earn bonus points if it's a terrible pun.

I started a project on codeplex a couple of years ago that compared .Net assemblies
and reported on the differences between them so that developers can track breaking
changes over time. 

Logically, I started out with "ApiDiff", until I discovered a product for 
C++ with a very similar name. Next I thought that the name needed to be more 
obscure to avoid collisions. So I found "Sai", a horrible pun on the japanese 
word for "delta" or "difference". No one got this and I spent more time answering
questions about the project name and how it fitted with the project than 
anything else! 

So I did some googling and tried to find some interesting deltas. One of the 
most cool was the [Okavango Delta](http://en.wikipedia.org/wiki/Okavango_Delta)
in Botswana which is a huge delta that empties into the Kalahari where the water 
goes nowhere (nice analogy eh?) and just evaporates being, as it is, miles 
from the ocean. This seemed like a good idea but it meant I had almost as many 
queries about the name, plus it was a very long word for the base namespace.

Finally, inspiration struck. First, it's a .Net project (so it has to start 
with an "N", that's the rule.). Second, the main feature of this project is 
that, outside of about 5 people at the place where I work and one very nice 
guy in Canada, no one really cares about it. 

So [NDifference](http://http://deejaygraham.github.io/ndifference/) was born! 
The name fulfils the necessity to start with the N prefix, it describes 
the main use case and it's a lovely pun on the general enthusiasm people have
for the project. 

Names are hard.
