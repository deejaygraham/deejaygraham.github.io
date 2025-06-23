from microbit import *
import random

pixel_fully_on = 9
pixel_fully_off = 0

twinkle_probability = 3
fading_rate = 4

leds = [(x, y) for y in range(0, 5) for x in range(0, 5)]

while True:

    # inspect pixels
    # can we turn on any pixels on?
    for led in leds:
        brightness = display.get_pixel(led[0], led[1])

        if brightness == pixel_fully_off:
            twinkle = random.randint(0, 100)

            if twinkle <= twinkle_probability:
                display.set_pixel(led[0], led[1], pixel_fully_on)

    sleep(50)

    # fade all lit pixels by fade factor
    for led in leds:
        brightness = display.get_pixel(led[0], led[1])

        if brightness > pixel_fully_off:
            faded_brightness = max(brightness - fading_rate, 0)
            display.set_pixel(led[0], led[1], faded_brightness)
