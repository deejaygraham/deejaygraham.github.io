import mcpi.minecraft as minecraft
import mcpi.block as block

world = minecraft.Minecraft.create()

while True:

    position = world.player.getTilePos()
    block = world.getBlock(position.x, position.y - 1, position.z)
    
    # standing on grass?
    if block == block.GRASS:
        world.player.setPos(position.x, position.y + 20, position.z)

