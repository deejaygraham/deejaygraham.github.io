import mcpi.minecraft as minecraft
import mcpi.block as block

world = minecraft.Minecraft.create()

x, y, z = world.player.getTilePos()

x += 2
z += 2

# clear area
world.setBlocks(x, y, z, x + 20, y + 10, z + 20, block.AIR)

width = 8
height = 3
depth = 5
# glass block
world.setBlocks(x, y, z, x + depth, y + height, z + width, block.GLASS)

# fill it with water
x += 1
z += 1
y += 1

depth -= 2
width -= 2
height -= 1
world.setBlocks(x, y, z, x + depth, y + height, z + width, block.WATER)
