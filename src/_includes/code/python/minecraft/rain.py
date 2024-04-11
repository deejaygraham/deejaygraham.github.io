import mcpi.minecraft as minecraft
import mcpi.block as block
import time
import random

world = minecraft.Minecraft.create()

while True:

  x = random.randint(-100, 100)
  y = 100
  z = random.randint(-100, 100)
  
  world.setBlock(x, y, z, block.WATER)
  time.sleep(random.randint(1, 5))
