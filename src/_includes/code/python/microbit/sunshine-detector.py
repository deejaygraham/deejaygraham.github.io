from microbit import *

sun_icon = Image("90909:09990:99999:09990:90909")

max_light_level = 255
min_light_level = 0
light_trigger = 100
button_increment = 20

while True:
    # increase light threshold
    if button_a.was_pressed():
        light_trigger = min(light_trigger + button_increment, max_light_level)
        display.scroll(str(light_trigger))
    # decrease light threshold
    if button_b.was_pressed():
        light_trigger = max(light_trigger - button_increment, min_light_level)
        display.scroll(str(light_trigger))

    # is it bright enough?
    if display.read_light_level() > light_trigger:
        display.show(sun_icon)
        sleep(500)

    display.clear()
    sleep(100)
