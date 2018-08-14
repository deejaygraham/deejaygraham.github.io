
for i in range(1, 10):
  for j in range(1, 5):
    # change some characteristics 
    tree_spacing = random.randint(8, 12)
    trunk_height = random.randint(3, 10)
    trunk_diameter = random.randint(5)
    leaf_height = random.randint(3, 10)
    build_tree(world, 
        x + (i * tree_spacing), 
        z + (j * tree_spacing), 
        trunk_height = trunk_height, 
        trunk_diameter = trunk_diameter, 
        leaf_height = leaf_height)
