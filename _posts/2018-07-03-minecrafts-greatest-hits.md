---
layout: post
title: Minecraft's Greatest Hits
categories: [ minecraft, code ]
published: true
hero: minecraft 

---

The Raspberry Pi Minecraft API has a little known function for reporting which blocks "Steve" has hit/mined 
as he moves around the world. Naturally enough, it is called **pollBlockHits** and returns a list of hit objects 
that includes the coordinate for each hit. The list is refreshed each time the function is called so if nothing 
has been hit for a while, the list may be empty. We can use it in a script to do some planting.  


```python

{% include code/python/minecraft/flower-hits.py %}

```

