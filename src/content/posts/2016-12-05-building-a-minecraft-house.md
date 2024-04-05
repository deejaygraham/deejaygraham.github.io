---
layout: post
title: Building a house in Minecraft
published: true
categories: [ code, minecraft ]
hero: minecraft 
thumbnail: "/img/thumbnails/rpi-420x255.webp"
alttext: raspberry pi
---

The Python API for the raspberry pi edition of Minecraft is really nice and easy to
get started with. There aren't an overwhelming number of commands and the structure
and naming all seem to make sense in the Minecraft world. <a href="http://www.stuffaboutcode.com/">Stuff About Code</a>
 has a nice <a href="http://www.stuffaboutcode.com/p/minecraft-api-reference.html">guide to the Minecraft API</a>.

For this post, I'm going to try building a house around the player in their current
position. But first, a quick digression into coordinates.

### Coordinates

One thing that needs some explaining, and some getting used to, is the coordinate
system. Most games that I have tended to work with used X and Y as the horizontal
and vertical coordinates looking down from above where X is left to right and Y is
forward and back. Z is usually the height dimension which is added if you have the luxury
of 3D coordinates.

In Minecraft, the coordinates still make sense but from a different point of view. In
this world, X is still left to right when facing north. Y, however, is the elevation
dimension - which matches what you would see if you were to look at a normal 2D X, Y
plot and map that to looking "into" the Minecraft world along the surface. Z then is
along the North-South axis.

Axis | Direction
---- | ---------
  X  |  West (-ve) to East (+ve)
  Y  |  Elevation (64 = sea level)
  Z  |  North (-ve) to South (+ve)


### Example

Let's make a cube of stone, defined by the player's current position, and put them
on top of it:

~~~

import mcpi.minecraft as minecraft
import mcpi.block as block

world = minecraft.Minecraft.create()
playerPosition = world.player.getTilePos()

world.setBlocks(playerPosition.x - 1, playerPosition.y, playerPosition.z - 1,
  playerPosition.x + 1, playerPosition.y + 2, playerPosition.z + 1, block.STONE.id)

world.player.setPos(playerPosition.x, playerPosition.y + 3, playerPosition.z)

~~~

### Gonna Build a House

Now that we've got a feel for the coordinates, we can think about building a house
around the player.

Probably the easiest way to do that is to trace the outline of the building and
drop a block at each position.

~~~

import mcpi.minecraft as minecraft
import mcpi.block as block

world = minecraft.Minecraft.create()
playerPosition = world.player.getTilePos()

house_height = 5
house_depth = 10
house_width = 10
wall_thickness = 1

world.setBlocks(x, y, z, x + house_width, y + house_height, z + house_depth, block.STONE.id)
world.setBlocks(x + wall_thickness, y, z + wall_thickness,
                x + house_width - wall_thickness, y + house_height, z + house_depth - wall_thickness,
                block.STONE_BRICK.id)
~~~

Nice and easy but now we need a roof and a doorway and a swimming pool and maybe a lava moat...
