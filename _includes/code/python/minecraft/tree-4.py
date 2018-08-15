
def build_leaves(world, x, y, z, leaf_height, leaf_radius, leaf_material):

  leaf_probability = random.randint(30, 65)
  
  for i in range(x - leaf_radius, x + leaf_radius + 1):
    for j in range(y, y + leaf_height):
      for k in range(z - leaf_radius, z + leaf_radius + 1):
        if random.randrange(100) < leaf_probability:
          world.setBlock(i, j, k, leaf_material)
  
  sand_off_corners(x - leaf_radius, y, z - leaf_radius, x + leaf_radius, y + leaf_height, z + leaf_radius)
