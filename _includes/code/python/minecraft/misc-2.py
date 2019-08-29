import mcpi.minecraft as minecraft
import random
import time

world = minecraft.Minecraft.create()

world.postToChat("I have hidden a diamond...")

diamond_block = 57

x = 100
y = 25
z = 100

# random position?
# x = random.randrange(-50, 50)
# y = random.randrange(0, 20)
# z = random.randrange(-50, 50)

world.setBlock(x, y, z, diamond_block)
world.camera.setFixed()

world.camera.setPos(x, y + 5, z)
time.sleep(10)

world.postToChat("Treasure hunt!")
world.camera.setNormal() 
# or 
# world.camera.setFollow()
