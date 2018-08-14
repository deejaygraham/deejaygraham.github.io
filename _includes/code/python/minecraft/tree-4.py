
def build_leaves(world, x, y, z, leaf_height, leaf_radius, leaf_material):

  leaf_probability = 75
  
  for i in range(x - leaf_radius, x + leaf_radius):
    for j in range(y, y + leaf_height):
      for k in range(z - leaf_radius, z + leaf_radius):
        if random.randint(100) < leaf_probability:
          world.setBlock(i, j, k, leaf_material)
