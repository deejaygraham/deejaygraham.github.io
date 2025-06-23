# Bitbot remote control
from microbit import *
import radio

tilt_threshold = 250
forward_command = "F"
stop_command = "S"
left_command = "L"
right_command = "R"
reverse_command = "B"
fast_command = "Z"
slow_command = "W"

radio.on()

last_action = ""

while True:

    action = ""

    if button_a.was_pressed():
        action = fast_command
    elif button_b.was_pressed():
        action = slow_command
    else:
        side_to_side = accelerometer.get_x()
        forward_back = accelerometer.get_y()

        if forward_back < -tilt_threshold:
            display.show(Image.ARROW_N)
            action = forward_command
        elif forward_back > tilt_threshold:
            display.show(Image.ARROW_S)
            action = reverse_command
        elif side_to_side > tilt_threshold:
            display.show(Image.ARROW_E)
            action = right_command
        elif side_to_side < -tilt_threshold:
            display.show(Image.ARROW_W)
            action = left_command
        else:
            display.show(Image.SQUARE_SMALL)
            action = stop_command

    if action != last_action:
        radio.send(action)
        last_action = action

    sleep(500)
