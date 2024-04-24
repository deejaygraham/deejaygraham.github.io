---
permalink: 2019/08/08/minecraft-building-from-script/
layout: post
title: Minecraft Building from Script
published: true
tags: [code, minecraft]
hero: minecraft
thumbnail: "/img/thumbnails/rpi-420x255.webp"
alttext: raspberry pi
---

We are running an intro to programming event in a few weeks and wanted to demo some building stuff with Minecraft on the raspberry pi
without having to hard code buildings into the source code. This is a super quick and dirty script we can run to parse a text file,
line by line and do run several commands:

- create a single block of material at a given location using setBlock
- create a multi block of material at a given location using setBlocks
- move the player to a suitable vantage point

Each line of the file starts with the command word, followed by some optional parameters and the script just works through each
command in realtime in minecraft.

I came up with some other desirable features - for authoring lines starting with a hash (#) are comments - for debugging and demonstration
I added a message command, to output to the chat window, and a wait to space out the building work so that the pi cpu doesn't
get too hot.

Here's the script:

```python

{% include 'code/python/minecraft/builder-1.py' %}

```

and an example script to flatten the ground, lay down some earth and grass prior to building:

```

{% include 'code/python/minecraft/build.txt' %}

```
