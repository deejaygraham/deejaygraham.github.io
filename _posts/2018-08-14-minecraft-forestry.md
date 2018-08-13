---
layout: post
title: Minecraft Forestry
categories: [ minecraft, code ]
published: true
hero: minecraft 

---

We can build very simple trees programmatically in Minecraft by stacking blocks together using 
wood-y and leaf-y materials.

```python

{% include code/python/minecraft/tree.py %}

```

Square blocks of leaves aren't very realistic so we can trim off the square edges like this.


```python

{% include code/python/minecraft/tree-2.py %}

```

Finally, we can make ourselves a nice orchard or small forest using some random values for each tree:


```python

{% include code/python/minecraft/tree-3.py %}

```

We can go further by changing the materials for each tree, the trunk and leaf materials, on a random basis. 
