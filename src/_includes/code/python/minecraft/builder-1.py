import time
import mcpi.minecraft as minecraft

world = minecraft.Minecraft.create()

with open("build.txt") as file:
    for line in file:
        chunks = line.split()
        
        if chunks:
            command = chunks[0]
            
            if command.startswith('#'):
                print('Comment -> ' + line)
            elif command == 'message':
                startindex = len('message')
                #print(line[startindex:])
                world.postToChat(line[startindex:])
            elif command == 'goto':
                x = int(chunks[1])
                z = int(chunks[2])
                y = world.getHeight(x, z)
                #print('moving to ' + x + ' ' + z)
                world.player.setTilePos(x, y, z)
                
            elif command == 'block':
                material = int(chunks[1])
                x = int(chunks[2])
                y = int(chunks[3])
                z = int(chunks[4])
                world.setBlock(x, y, z, material)
            elif command == 'blocks':
                material = int(chunks[1])
                x1 = int(chunks[2])
                y1 = int(chunks[3])
                z1 = int(chunks[4])
                x2 = int(chunks[5])
                y2 = int(chunks[6])
                z2 = int(chunks[7])
                # print('multiple block from ' + x1 + ' ' + y1 + ' ' + z1 + ' to ' + x2 + ' ' + y2 + ' ' + z2)
                world.setBlocks(x1, y1, z1, x2, y2, z2, material)
            elif command == 'wait':
                delay = int(chunks[1])
                time.sleep(delay)
            
        
        