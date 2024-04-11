import mcpi.minecraft as minecraft
import mcpi.block as block
import time

world = minecraft.Minecraft.create()

while True:
    time.sleep(0.2)

    x, y, z = world.player.getPos()
    # change the block type ?
    world.setBlock(x, y - 1, z, block.ICE)

    # block_below = world.getBlock(x, y - 1, z)
    # if block_below == block.WATER:
    #   world.setBlock(x, y - 1, z, block.ICE)
