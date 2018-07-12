import mcpi.minecraft as minecraft
import mcpi.block as block
import time
import random

def random_underground_position():
  return minecraft.Vec3(random.randint(-100, 100), random.randint(-20, 0), random.randint(-100, 100))

def distance_to_treasure(player, treasure):
  dx = player.x - treasure.x
  dy = player.y - treasure.y
  dz = player.z - treasure.z
  return math.ceil(math.sqrt((dx*dx) + (dy*dy) + (dz*dz)))
  
world = minecraft.Minecraft.create()

treasure = random_underground_position()
world.setBlock(treasure.x, treasure.y, treasure.z, block.GOLD)

last_position = world.player.getTilePos()
last_distance = distance_to_treasure(last_position, treasure)

world.postToChat("Find the gold!")

detectoring = True

while detectoring:

  position = world.player.getTilePos()
  
  if position != last_position:
    distance = distance_to_treasure(playerTile, treasure)
  
    if distance < 2:
      detectoring = False
    elif distance < 10:
      world.postToChat("Hot")
    else:
      if distance < last_distance:
        world.postToChat("Warmer")
      elif distance > last_distance:
        world.postToChat("Colder")

    last_distance = distance 

  last_position = position
  time.sleep(2)

world.postToChat("You found the treasure")
  