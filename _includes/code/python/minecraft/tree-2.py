def sand_off_corners(world, x1, y1, z1, x2, y2, z2):
  world.setBlock(x1, y1, z1, block.AIR)
  world.setBlock(x2, y1, z1, block.AIR)
  world.setBlock(x1, y1, z2, block.AIR)
  world.setBlock(x2, y1, z2, block.AIR)
  world.setBlock(x1, y2, z1, block.AIR)
  world.setBlock(x2, y2, z1, block.AIR)
  world.setBlock(x1, y2, z2, block.AIR)
  world.setBlock(x2, y2, z2, block.AIR)

def build_leaves(world, x, y, z, leaf_height, leaf_radius, leaf_material):
  world.setBlocks(x - leaf_radius, 
                  y, 
                  z - leaf_radius, 
                  x + leaf_radius, 
                  y + leaf_height, 
                  z + leaf_radius, 
                  leaf_material)

  # knock out corners to make it slightly more realistic.
  sand_off_corners(x - leaf_radius, y, z - leaf_radius, x + leaf_radius, y + leaf_height, z + leaf_radius)

