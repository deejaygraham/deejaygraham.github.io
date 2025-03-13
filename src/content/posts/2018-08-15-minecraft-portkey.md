---
permalink: 2018/08/15/minecraft-portkey/

title: Minecraft PortKey
tags: [minecraft, code]

hero: minecraft
thumbnail: "/img/thumbnails/rpi-420x255.webp"
alttext: raspberry pi
---

What's programming without an occasional Harry Potter/Minecraft mashup? In the Harry Potter universe, a
<a href="https://www.pottermore.com/writing-by-jk-rowling/portkeys">Portkey</a> is a
magical teleportation device which is disguised as an ordinary, everyday object. Touch the object and it automatically
teleports you to a matching location. How would we do this in Minecraft?

```python

{% include 'code/python/minecraft/portkey.py' %}

```

The portkey is triggered if you stand on the object. The other way we could trigger it is by hitting the object and poll for
the hits using the world.events.pollBlockHits() API.
