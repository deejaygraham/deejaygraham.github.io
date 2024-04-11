from microbit import *
import radio

fully_dark = 0
fully_light = 255
step_size = 10

# we turn on when light reaches this level or below
darkness = 20

radio.on();

while True:

    # make threshold light level configurable
    if button_a.was_pressed():
        darkness = min(darkness + step_size, fully_light)
        display.show(Image.ARROW_N)
        sleep(500)
    elif button_b.was_pressed():
        darkness = max(darkness - step_size, fully_dark)
        display.show(Image.ARROW_S)
        sleep(500)
    else:
        light_level = display.read_light_level()
        # print(light_level)

        if light_level <= darkness:
            radio.send('on')
        else:
            radio.send('off')
        sleep(500)

