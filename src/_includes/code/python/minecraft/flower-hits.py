while True:
  hits = world.events.pollBlockHits()

  for hit in hits:
    world.setBlock(hit.pos.x, hit.pos.y, hit.pos.z, block.FLOWER_CYAN)

  sleep(0.5)