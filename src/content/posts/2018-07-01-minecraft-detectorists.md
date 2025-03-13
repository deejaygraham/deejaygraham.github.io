---
permalink: 2018/07/01/minecraft-detectorists/

title: Minecraft Detectorists
tags: [code, minecraft]

hero: minecraft
thumbnail: "/img/thumbnails/rpi-420x255.webp"
alttext: raspberry pi
---

Another simple minecraft game, this time using Pythagoras' theorem to work out distances between two points.

We randomly bury a piece of treasure - a gold block, a diamond, whatever - then give the player clues about
how far away they are from it. The "game" ends when they dig up the block.

```python

{% include 'code/python/minecraft/detectorists.py' %}

```

Inspired by code I originally saw at Martin O'Hanlon's excellent <a href="https://www.stuffaboutcode.com/2013/01/raspberry-pi-minecraft-hide-and-seek.html">Stuff
About Code</a>.
