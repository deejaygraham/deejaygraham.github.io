
for i in range(10):
  for j in range(5):
    tree_spacing = random.randint(8, 12)
    trunk_radius = random.randrange(5)
    trunk_height = random.randint(2 * trunk_radius, 5 * trunk_radius)
    leaf_height = random.randint(trunk_radius, trunk_height)
    
    build_tree(world, 
        x + (i * tree_spacing), 
        z + (j * tree_spacing), 
        trunk_height = trunk_height, 
        trunk_radius = trunk_radius, 
        trunk_material = random.randint(0, 2)
        leaf_height = leaf_height
        leaf_material = random.randint(1, 3)
        )
