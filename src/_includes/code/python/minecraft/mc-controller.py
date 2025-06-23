import serial
import mcpi.minecraft as minecraft
import time

world = minecraft.Minecraft.create()
world.player.setting("autojump", True)

# port on pi using ls /dev/tty*
PORT = "/dev/ttyACM0"
BAUD = 115200

microbit = serial.Serial(PORT)
microbit.baudrate = BAUD
microbit.parity = serial.PARITY_NONE
microbit.databits = serial.EIGHTBITS
microbit.stopbits = serial.STOPBITS_ONE

TILT = 100
MIN_AXIS = -128
MAX_AXIS = 128

while True:
    time.sleep(0.2)

    data = microbit.readline().decode("UTF-8")
    data_as_list = data.rstrip().split(" ")

    left_right, forwards_backwards, button_a, button_b = data_as_list

    position = world.player.getTilePos()

    if left_right > TILT:
        position.x += 1
    if left_right < -TILT:
        position.x -= 1
    # if controller_y > 0: position.z += 1
    # if controller_y < 0: position.z -= 1

    # make sure we don't go too far one way or another.
    position.x = min(max(position.x, MIN_AXIS), MAX_AXIS)
    position.z = min(max(position.z, MIN_AXIS), MAX_AXIS)
    position.y = world.getHeight(position.x, position.z)

    # jump
    if button_a:
        position.y += 2

    world.player.setTilePos(position.x, position.y, position.z)
    # debug
    # print(str(left_right) + " " + str(forwards_backwards) + " " + str(button_a) + " " + str(button_b))
