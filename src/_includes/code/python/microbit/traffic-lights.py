from microbit import *

light_delay = 1000

red = pin8
amber = pin12
green = pin16

on = 1
off = 0

while True:
    # Stop
    green.write_digital(off)
    amber.write_digital(off)
    red.write_digital(on)
    sleep(light_delay)
    # Get Ready
    amber.write_digital(on)
    sleep(light_delay)
    # Go
    red.write_digital(off)
    amber.write_digital(off)
    green.write_digital(on)
    sleep(light_delay)
    # Stop if safe
    green.write_digital(off)
    amber.write_digital(on)
    sleep(light_delay)
