from microbit import *
import random


def fade_out(image, delay=250, minimum=0):
    image = image.copy()
    for times in range(0, 10):
        for x in range(0, 5):
            for y in range(0, 5):
                brightness = image.get_pixel(x, y)
                if brightness > minimum:
                    image.set_pixel(x, y, brightness - 1)
        display.show(image)
        sleep(delay)


display.scroll("microbotchi")

# start off as an egg that will hatch in time
egg = Image("09990:" "90009:" "90009:" "90009:" "09990:")

display.show(egg)
time_before_hatching = random.randint(1, 5)
sleep(time_before_hatching * 1000)

# initial state
is_alive = True
health = 100
happiness = 100
awakeness = 50

# rewards for interaction
food_health = 50
food_awakeness = 10
food_happiness = 5
play_happiness = 50
play_awakeness = 20

# lifetime
while is_alive:

    health = max(health - 1, 0)
    happiness = max(happiness - 1, 0)
    awakeness = max(awakeness - 1, 0)

    # play with me
    if accelerometer.was_gesture("shake"):
        display.show(Image.HEART)
        sleep(1000)
        happiness = happiness + play_happiness
        awakeness = awakeness + play_awakeness

    # feed me
    if button_a.was_pressed():
        for x in range(0, 5):
            display.show(Image.SURPRISED)
            sleep(300)
            display.show(Image.MEH)
            sleep(300)
        health = health + food_health
        happiness = happiness + food_happiness
        awakeness = awakeness + food_awakeness

    if awakeness > 0:
        if happiness > 50:
            display.show(Image.HAPPY)
        elif happiness > 0:
            display.show(Image.MEH)
        else:
            display.show(Image.SAD)
    else:
        display.show(Image.ASLEEP)

    sleep(500)

    is_alive = health > 0

# dying
fade_out(Image.SAD)
# dead
display.show(Image.GHOST)
sleep(10000)
fade_out(Image.GHOST)
