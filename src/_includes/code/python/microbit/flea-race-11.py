from microbit import *
import random

# name     x,  y,  chance
alice = [0, 0, 1]
bob = [0, 1, 2]
carol = [0, 2, 3]
dave = [0, 3, 1]
eleanor = [0, 4, 10]

all_fleas = [alice, bob, carol, dave, eleanor]

# line up at start
for flea in fleas:
    display.set_pixel(flea[0], flea[1], 9)

# race !
for x in range(1, 10):
    for flea in all_fleas:
        # will this flea move this turn?
        if random.randint(0, flea[2]) == 1:
            display.set_pixel(flea[0], flea[1], 0)
            flea[0] = min(flea[0] + 1, 4)
            display.set_pixel(flea[0], flea[1], 9)

    sleep(500)
