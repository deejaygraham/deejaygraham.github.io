---
title: Minecraft Forestry
tags: [minecraft, code]
hero: minecraft
---

We can build very simple trees programmatically in Minecraft by stacking blocks together using
wood-y and leaf-y materials.

<img src="/assets/img/posts/minecraft-forestry/simple-tree.jpg" alt="simple tree" class="u-max-full-width" />

```python

{% include 'code/python/minecraft/tree.py' %}

```

Square blocks of leaves aren't very realistic so we can trim off the square edges like this.

<img src="/assets/img/posts/minecraft-forestry/better-tree.jpg" alt="better tree" class="u-max-full-width" />

```python

{% include 'code/python/minecraft/tree-2.py' %}

```

Finally, we can make ourselves a nice orchard or small forest using some random values for each tree:

<img src="/assets/img/posts/minecraft-forestry/random-forest.jpg" alt="forest of trees" class="u-max-full-width" />

```python

{% include 'code/python/minecraft/tree-3.py' %}

```

Note by using the ground value specific to each tree location, we can get a nice effect "planting" trees on a sloping
hillside.

We can go further by changing the materials for each tree, the trunk and leaf materials, on a random basis. The **setBlock**
function can take an extra argument for some block types. For wood and leaves, you are able to pick the exact kind of
material you would like.

| value | Wood |
|0 | Oak |
|1 | Spruce |
|2 | Birch |

| value | Leaves |
| 1 | Oak |
| 2 | Spruce |
| 3 | Birch |

In the final version, the foliage still looks a bit too false as a single monolithic block of leaves. We can
change the leaf generation to work on a probability of a leaf block being at any one position in the canopy.

```python

{% include 'code/python/minecraft/tree-4.py' %}

```

<img src="/assets/img/posts/minecraft-forestry/random-leaves.jpg" alt="random leaves" class="u-max-full-width" />
