import mcpi.minecraft as minecraft
import mcpi.block as block
import random
import time

world = minecraft.Minecraft.create()

world.postToChat("I have hidden a diamond...")

x = 0
y = 0
z = 0

# random position?
# x = random.randrange(-50, 50)
# y = random.randrange(0, 20)
# z = random.randrange(-50, 50)

world.setBlock(x, y, z, block.DIAMOND)
world.camera.setFixed()

world.camera.setPos(x, y + 5, z)
time.sleep(10)

world.postToChat("Treasure hunt!")
world.camera.setNormal()
# or
# world.camera.setFollow()
