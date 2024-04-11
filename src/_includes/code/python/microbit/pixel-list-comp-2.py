leds = [(x, y) for x in range(0, 5) for y in range(0, 5) ]

for led in leds:
    display.set_pixel(led[0], led[1], 9)