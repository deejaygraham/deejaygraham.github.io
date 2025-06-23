from microbit import *

# we turn on when light reaches this level or below
darkness = 20

while True:

    sleep(500)
    light_level = display.read_light_level()
    print(light_level)

    if light_level >= darkness:
        display.scroll("thief!")
