import mcpi.minecraft as minecraft
import mcpi.block as block
import random
import time

world = minecraft.Minecraft.create()

# place a portkey in a "random" place.
portkey_x = 0
portkey_z = 0
portkey_y = world.getHeight(portkey_x, portkey_z)

# clear some space around the port key
world.setBlocks(portkey_x - 10, portkey_y, portkey_z - 10, 
                portkey_x + 10, portkey_y + 10, portkey_z + 10, 
                block.AIR)

portkey_block = block.CHEST
world.setBlock(portkey_x, portkey_y, portkey_z, portkey_block)

destination_x = random.randint(-50, 50)
destination_z = random.randint(-50, 50)
destination_y = world.getHeight(destination_x, destination_z)

while True:
  playerTile = world.player.getTilePos()
  blockType = world.getBlock(playerTile.x, playerTile.y, playerTile.z)

  if blockType == portkey_block:
    world.postToChat("port key activated...")
    world.postToChat("hold on!")
    time.sleep(0.5)
    world.player.setPos(destination_x, destination_y + 5, destination_z)

  time.sleep(0.3)
