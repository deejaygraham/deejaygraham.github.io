for i in range(3):
    for j in range(2):
        tree_spacing = random.randint(8, 12)
        trunk_radius = random.randrange(1)
        trunk_height = random.randint(5, 20)
        leaf_height = random.randint(5, 15)
        leaf_radius = random.randint(trunk_radius * 4, trunk_radius * 10)

        build_tree(
            world,
            x + (i * tree_spacing),
            y,
            z + (j * tree_spacing),
            trunk_height=trunk_height,
            trunk_radius=trunk_radius,
            leaf_height=leaf_height,
        )
