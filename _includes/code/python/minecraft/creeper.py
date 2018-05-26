import mcpi.minecraft as minecraft
import mcpi.block as block
import time
import random

# function to build the figure using the given material
def build_spooky_figure(world, x, y, z, material):
  # simple tower block for now
  for i in range(3):
    world.setBlock(x, y + i, z, material)

world = minecraft.Minecraft.create()

# intro...
world.postToChat("What ever you do ...")
time.sleep(5)
world.postToChat("Don't blink!")

lastPlayerTile = world.player.getTilePos()

# create the spooky block 20 blocks away
x = lastPlayerTile.x
z = lastPlayerTile.z + 20
y = world.getHeight(x, z)
build_spooky_figure(world, x, y, z, block.OBSIDIAN)

while True:

  time.sleep(random.randint(1, 5))
  build_spooky_figure(world, x, y, z, block.AIR)
  
  # track the player...
  playerTile = world.player.getTilePos()
  
  if (x - playerTile.x) > 0: x -= 1
  if (x - playerTile.x) < 0: x += 1
  if (z - playerTile.z) > 0: z -= 1
  if (z - playerTile.z) < 0: z += 1
  
  # debug
  # world.postToChat(str(x) + " " + str(z))

  y = world.getHeight(x, z)
  build_spooky_figure(world, x, y, z, block.OBSIDIAN)
