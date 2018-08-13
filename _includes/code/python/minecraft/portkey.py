import mcpi.minecraft as minecraft
import mcpi.block as block
import random
import time

world = minecraft.Minecraft.create()

# place a mushroom portkey in a random place.
mushroom_x = random.randint(-50, 50)
mushroom_z = random.randint(-50, 50)
mushroom_y = world.getHeight(mushroom_x, mushroom_z)
world.setBlock(mushroom_x, mushroom_y, mushroom_z, block.MUSHROOM_RED)

# place the destination object 
destination_x = random.randint(-50, 50)
destination_z = random.randint(-50, 50)
destination_y = world.getHeight(destination_x, destination_z)
world.setBlock(destination_x, destination_y, destination_z, block.MUSHROOM_BROWN)

while True:
  playerTile = world.player.getTilePos()
  blockType = world.getBlock(player.x, player.y, player.z)

  if blockType == block.MUSHROOM_RED:
    world.player.setPos(destination_x, destination_y, destination_z)

  time.sleep(0.2)
