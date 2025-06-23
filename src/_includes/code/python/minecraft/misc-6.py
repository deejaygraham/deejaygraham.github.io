import mcpi.minecraft as minecraft
import mcpi.block as block

world = minecraft.Minecraft.create()

# clear all buildings
world.postToChat("blanking...")
world.setBlocks(-128, 0, -128, 128, 60, 128, block.AIR)
world.setBlocks(-128, -10, -128, 128, -1, 128, block.DIRT)
world.setBlocks(-128, 0, -128, 128, 0, 128, block.GRASS)

# world.player.setPos(0, 1, 0)
world.postToChat("blanked.")
