import mcpi.minecraft as minecraft
import mcpi.block as block
import time
import math


def build_pyramid(x, y, z, width, material):
    if width % 2 == 0:
        width = width + 1

    height = int((width + 1) / 2)
    layer_width = int(math.floor(width / 2))

    world.setBlocks(
        x - layer_width - 2,
        y - 1,
        z - layer_width - 2,
        x + layer_width + 2,
        y - 1,
        z + layer_width + 2,
        block.DIRT,
    )

    for level in range(y, y + height):
        world.setBlocks(
            x - layer_width,
            level,
            z - layer_width,
            x + layer_width,
            level,
            z + layer_width,
            material,
        )
        layer_width = layer_width - 1


world = minecraft.Minecraft.create()

# Customise with different block types
x = 0
y = 1
z = 0
width = 20

build_pyramid(x, y, z, width, block.ICE)
