from microbit import *

blink_delay = 500

def show_led(on):
    io_value = 1 if on else 0
    pin1.write_digital(io_value)
    pixel_value = 9 if on else 0
    display.set_pixel(2, 2, pixel_value)

while True:
    show_led(True)
    sleep(blink_delay)
    show_led(False)
    sleep(blink_delay)
