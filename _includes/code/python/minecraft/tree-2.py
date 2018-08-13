
def build_leaves(world, x, y, z, leaf_height, leaf_radius, leaf_material):
  world.setBlocks(x - leaf_radius, y, z - leaf_radius, 
					x + leaf_radius, y + leaf_height, z + leaf_radius, 
					leaf_material)

  # knock out corners to make it slightly more realistic.
  world.setBlock(x - leaf_radius, y, z - leaf_radius, block.AIR)
  world.setBlock(x + leaf_radius, y, z - leaf_radius, block.AIR)
  world.setBlock(x - leaf_radius, y, z + leaf_radius, block.AIR)
  world.setBlock(x + leaf_radius, y, z + leaf_radius, block.AIR)
  world.setBlock(x - leaf_radius, y + leaf_height, z - leaf_radius, block.AIR)
  world.setBlock(x + leaf_radius, y + leaf_height, z - leaf_radius, block.AIR)
  world.setBlock(x - leaf_radius, y + leaf_height, z + leaf_radius, block.AIR)
  world.setBlock(x + leaf_radius, y + leaf_height, z + leaf_radius, block.AIR)

