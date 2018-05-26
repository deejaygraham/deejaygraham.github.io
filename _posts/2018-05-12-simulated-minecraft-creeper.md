---
layout: post
title: Simulating Minecraft Creeper on Pi
categories: [ code, minecraft ]
published: true
---

One of the features missing from the pi version of Minecraft is the survival
mode, where early on in the game you have to build a shelter to protect yourself from the things that go bump in the night.

Creepers are one kind of threat to your survival and in this code sample, I wanted to recreate something like a creeper to follow you around in the world. Nothing bad happens to you if the creeper catches up with you, obviously, but it's still creepy enough that something out there is getting closer :)

<img src="/img/posts/minecraft-creeper/creeper.jpg" alt="creeper" class="u-max-full-width" />

```python

{% include code/python/minecraft/creeper.py %}

```

Note that I started out positioning the creeper at a distance from the player and just using the player's y coordinate. This had the disadvantage that the creeper ignored things like hills (he burrowed straight through them) or valleys (he floated over them). Now I use the getHeight function which gets the height of the terrain at the current location so that the creeper behaves much more realistically, climbing over hills and going down into valleys.
