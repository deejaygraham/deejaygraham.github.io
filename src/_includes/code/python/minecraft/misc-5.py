import mcpi.minecraft as minecraft
import mcpi.block as block
import time
import math

def build_tower(x, y, z, width, height, material):
    # tower
    world.setBlocks(x, y, z, x + width, y + height, z + width, material)

    # create crennelations
    for dx in range(width + 1):
            for dz in range(width + 1):
                    if dx % 2 == 0 and dz % 2 == 0:
                        world.setBlock(x + dx, y + height + 1, z + dz, material)

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
    build_wall(x, y, z + length, length, height, material, "x")
    time.sleep(1)
    build_wall(x + length, y, z, length, height, material, "z")
    time.sleep(1)

    tower_width = int(length /5)
    if tower_width % 2 > 0:
        tower_width = tower_width + 1

    tower_height = int(height * 1.75)
    build_tower(x, y, z, tower_width, tower_height, material)
    time.sleep(1)
    build_tower(x, y, z + length - tower_width, tower_width, tower_height, material)
    time.sleep(1)
    build_tower(x + length - tower_width, y, z, tower_width, tower_height, material)
    time.sleep(1)
    build_tower(x + length - tower_width, y, z + length - tower_width, tower_width, tower_height, material)

def create_moat(x, y, z, width, depth, island):
    world.setBlocks(x - width, y - depth, z - width, x + island + width, y, z + island + width, block.WATER)
    world.setBlock(x, y - depth, z, x + island, y, z + island, block.GRASS)

world = minecraft.Minecraft.create()

x = z = 10
y = 0

moat_width = 3
moat_depth = 5

island_size = 60
castle_size = island_size - 2
wall_height = 10

create_moat(x, y, z, moat_width, moat_depth, island_size)
build_castle(x + 1, y, z + 1, castle_size, wall_height, block.STONE)


