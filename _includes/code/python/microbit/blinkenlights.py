from microbit import *

poll_interval = 500
intensity = 9

while True:
    sleep(poll_interval)
    display.set_pixel(2, 2, intensity)
    intensity = 0 if intensity == 9 else 9
    