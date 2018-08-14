import mcpi.minecraft as minecraft
import mcpi.block as block
import random


def build_trunk(world, x, y, z, trunk_height, trunk_diameter, trunk_material):
  for i in range(trunk_height):
    world.setBlock(x + trunk_diameter, y + i, z + trunk_diameter, trunk_material)


def build_leaves(world, x, y, z, leaf_height, leaf_radius, leaf_material):
  world.setBlocks(x - leaf_radius, y, z - leaf_radius, 
					x + leaf_radius, y + leaf_height, z + leaf_radius, 
					leaf_material)


# function to build a simple tree using the given materials
def build_tree(world, x, z, trunk_height=5, trunk_diameter = 1, leaf_height=3, leaf_radius=4, trunk_material=block.WOOD, leaf_material=block.LEAVES):
  
  y = world.getHeight(x, z)
  
  build_trunk(world, x, y, z, trunk_height, trunk_diameter, trunk_material)
  build_leaves(world, x, y + trunk_height, z, leaf_height, leaf_radius, leaf_material)


world = minecraft.Minecraft.create()
playerTile = world.player.getTilePos()

x = playerTile.x
z = playerTile.z + 20

build_tree(world, x, z)
