from microbit import *

is_alive = True
health = 100

# lifetime
while is_alive:

    health = health - 1

    display.show(Image.HAPPY)
    sleep(1000)

    is_alive = health > 0

# dead
display.show(Image.GHOST)
