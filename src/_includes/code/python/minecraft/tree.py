import mcpi.minecraft as minecraft
import mcpi.block as block
import random
import time


def build_trunk(world, x, y, z, trunk_height, trunk_radius, trunk_material):
    if trunk_radius == 0:
        world.setBlocks(x, y, z, x + 1, y + trunk_height, z + 1, trunk_material)
    else:
        world.setBlocks(
            x - trunk_radius,
            y,
            z - trunk_radius,
            x + trunk_radius,
            y + trunk_height,
            z + trunk_radius,
            trunk_material,
        )


def generate_leaves(world, x, y, z, leaf_height, leaf_radius, leaf_material):
    world.setBlocks(
        x - leaf_radius,
        y,
        z - leaf_radius,
        x + leaf_radius,
        y + leaf_height,
        z + leaf_radius,
        leaf_material,
    )


# function to build a simple tree using the given materials
def build_tree(
    world,
    x,
    y,
    z,
    trunk_height=5,
    trunk_radius=1,
    leaf_height=3,
    leaf_radius=4,
    trunk_material=block.WOOD,
    leaf_material=block.LEAVES,
):
    build_trunk(world, x, y, z, trunk_height, trunk_radius, trunk_material)
    generate_leaves(
        world, x, y + trunk_height, z, leaf_height, leaf_radius, leaf_material
    )


world = minecraft.Minecraft.create()

# clear out the space
world.setBlocks(-128, 0, -128, 128, 40, 128, block.AIR)
world.setBlocks(-128, 1, -128, 128, 2, 128, block.GRASS)

playerTile = world.player.getTilePos()

x = playerTile.x + 5
z = playerTile.z + 5
y = world.getHeight(x, z)

build_tree(world, x, y, z)
