from microbit import *
import random

fade_interval = 100

while True:
    x = random.randint(0, 4)
    y = random.randint(0, 4)
    
    intensity = 9
    
    while intensity >= 0:
        display.set_pixel(x, y, intensity)
        intensity -= 1
        sleep(fade_interval)
