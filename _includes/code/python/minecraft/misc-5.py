import mcpi.minecraft as minecraft
import mcpi.block as block
import time
import math

def clear_area(x, y, z, width, height):
    world.setBlocks(x - width, y - height, z - width, x + width, y + height, z + width, block.AIR)
    world.setBlocks(x - width, y - 1, z - width, x + width, y, z + width, block.GRASS)


def build_tower(x, y, z, width, height, material):
    # tower
    world.setBlocks(x, y, z, x + width, y + height, z + width, material)

    # create crennelations
    for dx in range(0, 12):
            for dz in range(0, 12):
                    if dx % 2 == 0 and dz % 2 == 0:
                        world.setBlock(x + dx, y + height, z + dz, material)

    # carve out top of tower
    world.setBlocks(x + 1, y + height, z + 1, x + width - 1, y + height + 1, z + width - 1, block.AIR)
    world.setBlocks(x + 2, y + height - 1, z + 2, x + width - 2, y + height + 1, z + width - 2, block.AIR)


def build_wall(x, y, z, length, height, material, plane):
        
    if plane == "x":
        # wall
        world.setBlocks(x, y, z, x + length, y + height, z, material)

        # create crennelations
        for i in range(length + 2):
            if i % 2 == 0:
                world.setBlock(x + i, y + height, z, block.AIR)

    if plane == "z":
        # wall
        world.setBlocks(x, y, z, x, y + height, z + length, material)
        
        # crennelations
        for i in range(length + 2):
            if i % 2 == 0:
                world.setBlock(x, y + height, z + i, block.AIR)


def build_castle(x, y, z, length, height, material):
    build_wall(x, y, z, length, height, material, "x")
    time.sleep(1)
    build_wall(x, y, z, length, height, material, "z")
    time.sleep(1)
    build_wall(x, y, z + length, length, height, "x")
    time.sleep(1)
    build_wall(x + length, y, z + length, length, height, "z")
    time.sleep(1)

    tower_width = 10
    tower_height = height * 2
    build_tower(x, y, z, tower_width, tower_height, material)
    time.sleep(1)
    build_tower(x, y, z + length, tower_width, tower_height, material)
    time.sleep(1)
    build_tower(x + length, y, z, tower_width, tower_height, material)
    time.sleep(1)
    build_tower(x + length, y, z + length, tower_width, tower_height, material)

def create_moat(x, y, z, width, depth, island):
    world.setBlocks(x - width, y - depth, z - width, x + width, y - 1, z + width, block.WATER)
    world.setBlock(x, y - depth, z, x + island, y, z + island, block.GRASS)

world = minecraft.Minecraft.create()

clear_area(0, 0, 0, 100, 20)
# create a moat using block.WATER ?
create_moat(0, 0, 0, 2, 3, 60)
build_castle(0, 0, 0, 50, 10, block.STONE)


