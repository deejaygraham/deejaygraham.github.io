from microbit import *

is_alive = True
health = 100
happiness = 100
awakeness = 50

# lifetime
while is_alive:

    health = health - 1
    happiness = happiness - 1
    awakeness = awakeness - 1

    # play with me
    if accelerometer.was_gesture("shake"):
        happiness = happiness + 50
        awakeness = awakeness + 20

    # feed me
    if button_a.was_pressed():
        health = health + 50
        awakeness = awakeness + 10

    if awakeness > 0:
        if happiness > 0:
            display.show(Image.HAPPY)
        else:
            display.show(Image.SAD)
    else:
        display.show(Image.ASLEEP)

    sleep(1000)

    is_alive = health > 0

# dead
display.show(Image.GHOST)
