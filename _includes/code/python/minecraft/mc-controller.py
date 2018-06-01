import serial
import mcpi.minecraft as minecraft
import time

world = minecraft.Minecraft.create()

PORT = "/dev/ttyACM0"
BAUD = 115200
    
microbit = serial.Serial(PORT)
microbit.baudrate = BAUD
microbit.parity   = serial.PARITY_NONE
microbit.databits = serial.EIGHTBITS
microbit.stopbits = serial.STOPBITS_ONE

while True:
  data = microbit.readline().decode('UTF-8')
  data_as_list = data.rstrip().split(' ')
  
  try:
    # left-right, forwards-backwards, up-down  
    controller_x, controller_y, controller_z, button_a, button_b = data_as_list

    time.sleep(0.5)
    position = world.player.getPos()

    if controller_x > 0: position.x += 1
    if controller_x < 0: position.x -= 1
    #if controller_y > 0: position.z += 1
    #if controller_y < 0: position.z -= 1
    position.y = world.getHeight(position.x, position.z)

    # make sure we don't go too far one way or another.
    
    world.player.setPos(position.x, position.y, position.z)
    #print(str(x) + " " + str(y) + " " + str(z) + " " + str(a) + " " + str(b))
    
    # print out the values ?
    # do something with these values-------------------------------
    # use x, y, z to move the player?
	# if x > 0: move player right
	# if x < 0: move player left
	# world.player.setPos(x, y, z) ?
  except:
    pass

s.close()
