---
permalink: 2016/12/10/minecraft-blocks-cheatsheet/
layout: post
title: Minecraft Blocks Cheatsheet
published: true
tags: [code, minecraft]
hero: minecraft
thumbnail: "/img/thumbnails/rpi-420x255.webp"
alttext: raspberry pi
---

There are a **huge** number of block types available to build through the Python API.

### Example

Typically you use the upper case block name and id in the call to <code>setBlock</code> but
there's nothing stopping you from using the plain integer value.

{% endhighlight %}

import mcpi.minecraft as minecraft
import mcpi.block as block

world = minecraft.Minecraft.create()

stone_id = 1
world.setBlock(x, y, z, stone_id)
world.setBlock(x, y, z, block.STONE.id)

{% endhighlight %}

### Special Blocks

Some special blocks support extra attributes in the final argument to
<code>setBlock</code>. Wool, for example, supports a colour value.

ID | Colour
== | ======
0 | White
1 | Orange
2 | Magenta
3 | Light Blue
4 | Yellow

So I can make a lovely block of orange wool like this:

{% endhighlight %}

mc.setBlock(x, y, z, block.WOOL, 1)

{% endhighlight %}

### Block Types

| Material            | ID  |
| ------------------- | --- |
| AIR                 | 0   |
| STONE               | 1   |
| GRASS               | 2   |
| DIRT                | 3   |
| COBBLESTONE         | 4   |
| WOOD_PLANKS         | 5   |
| SAPLING             | 6   |
| BEDROCK             | 7   |
| WATER_FLOWING       | 8   |
| WATER               | 8   |
| WATER_STATIONARY    | 9   |
| LAVA_FLOWING        | 10  |
| LAVA                | 10  |
| LAVA_STATIONARY     | 11  |
| SAND                | 12  |
| GRAVEL              | 13  |
| GOLD_ORE            | 14  |
| IRON_ORE            | 15  |
| COAL_ORE            | 16  |
| WOOD                | 17  |
| LEAVES              | 18  |
| GLASS               | 20  |
| LAPIS_LAZULI_ORE    | 21  |
| LAPIS_LAZULI_BLOCK  | 22  |
| SANDSTONE           | 24  |
| BED                 | 26  |
| COBWEB              | 30  |
| GRASS_TALL          | 31  |
| WOOL                | 35  |
| FLOWER_YELLOW       | 37  |
| FLOWER_CYAN         | 38  |
| MUSHROOM_BROWN      | 39  |
| MUSHROOM_RED        | 40  |
| GOLD_BLOCK          | 41  |
| IRON_BLOCK          | 42  |
| STONE_SLAB_DOUBLE   | 43  |
| STONE_SLAB          | 44  |
| BRICK_BLOCK         | 45  |
| TNT                 | 46  |
| BOOKSHELF           | 47  |
| MOSS_STONE          | 48  |
| OBSIDIAN            | 49  |
| TORCH               | 50  |
| FIRE                | 51  |
| STAIRS_WOOD         | 53  |
| CHEST               | 54  |
| DIAMOND_ORE         | 56  |
| DIAMOND_BLOCK       | 57  |
| CRAFTING_TABLE      | 58  |
| FARMLAND            | 60  |
| FURNACE_INACTIVE    | 61  |
| FURNACE_ACTIVE      | 62  |
| DOOR_WOOD           | 64  |
| LADDER              | 65  |
| STAIRS_COBBLESTONE  | 67  |
| DOOR_IRON           | 71  |
| REDSTONE_ORE        | 73  |
| SNOW                | 78  |
| ICE                 | 79  |
| SNOW_BLOCK          | 80  |
| CACTUS              | 81  |
| CLAY                | 82  |
| SUGAR_CANE          | 83  |
| FENCE               | 85  |
| GLOWSTONE_BLOCK     | 89  |
| BEDROCK_INVISIBLE   | 95  |
| STONE_BRICK         | 98  |
| GLASS_PANE          | 102 |
| MELON               | 103 |
| FENCE_GATE          | 107 |
| GLOWING_OBSIDIAN    | 246 |
| NETHER_REACTOR_CORE | 247 |

There are a few others but they are not called out in the API as block ids. There is
a more comprehensive <a href="http://minecraft.gamepedia.com/Pocket_Edition_data_values">guide to blocks and optional attributes</a>.

### Bigger building

Rather than building structures block by block, you can use a similar call to build
a cuboid given two sets of coordinates and a block type. <code>setBlocks</code> fills in
the volume between the two 3D points with blocks of the right type.

{% endhighlight %}

height = 10
width = 5
length = 15

world.setBlocks(x, y, z, x + length, y + height, z + width, block.STONE.id)

{% endhighlight %}

### House Full of Hollow

To create a hollow structure, like a house, you can create a large block of stone, then
adjust the coordinates and re-fill that volume with AIR.

{% endhighlight %}

height = 10
width = 5
length = 15

wall_thickness = 1

world.setBlocks(x, y, z, x + length, y + height, z + width, block.STONE.id)
world.setBlocks(x + wall_thickness, y, z + wall_thickness,
x + length - wall_thickness, y + height, z + width - wall_thickness,
block.AIR.id)

{% endhighlight %}
