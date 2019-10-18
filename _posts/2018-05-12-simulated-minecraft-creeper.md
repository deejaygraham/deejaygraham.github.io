---
layout: post
title: Simulating Minecraft Creeper on Pi
categories: [ code, minecraft ]
published: true
hero: minecraft 
thumbnail: "/img/thumbnails/rpi-420x255.jpg"
alttext: raspberry pi
---

One of the features missing from the pi version of Minecraft is the survival
mode, where early on in the game you have to build a shelter to protect yourself from the things that go bump in the night.

<a href="https://minecraft.gamepedia.com/Creeper">Creepers</a> are one kind of threat to your survival and in this code sample, I wanted to recreate something like a creeper to follow you around in the world. In survival minecraft a creeper will follow you if you come within range and will explode if it gets close enough to you. Nothing bad happens to you if the creeper catches up with you, obviously, but it's still creepy enough that something out there is getting closer :)

I used obsidian blocks to build the creeper but could have used green wool or something to closer match the shade of the real creepers.

<img src="/img/posts/simulated-minecraft-creeper/creeper-1.jpg" alt="creeper" class="u-max-full-width" />

```python

{% include code/python/minecraft/creeper.py %}

```

<img src="/img/posts/simulated-minecraft-creeper/creeper-2.jpg" alt="creeper" class="u-max-full-width" />

Note that I started out positioning the creeper at a distance from the player and just using the player's y coordinate, assuming that the terrain was flat at the place where the creeper spawned. Using the fixed y coordinate had the disadvantage that the creeper ignored things like hills (he burrowed straight through them) or valleys (he floated over them). Now I use the getHeight function which gets the height of the terrain at the current location so that the creeper behaves much more realistically, climbing over hills and going down into valleys.

Right at the start of the game I make reference to the weeping angels from Dr Who as a fun little easter egg for the participants on the programming course this code sample was written for, because creepers and weeping angels are similarly spooky in their respective fields.

### PostScript

I did some more experimentation with the type of block used to build the creeper and found the closest to the original green and grey was the block.MOSS_STONE id.

<img src="/img/posts/simulated-minecraft-creeper/creeper-3.jpg" alt="creeper" class="u-max-full-width" />
