# Microbit Blinkenlights
from microbit import *

blink_interval = 500
pixel_intensity = 9

while True:
    display.set_pixel(2, 2, pixel_intensity)
    pixel_intensity = 0 if pixel_intensity == 9 else 9

    sleep(blink_interval)    