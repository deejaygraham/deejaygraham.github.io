last_cmd = ""

while True:

    cmd = ""

    if button_a.was_pressed():
        cmd = fast_command
    elif button_b.was_pressed():
        cmd = slow_command
    else:
        forward_back = accelerometer.get_y()
        side_to_side = accelerometer.get_x()

        if abs(forward_back) >= abs(side_to_side):
            # priority to fwd reverse
            if forward_back < -fwd_rev_tilt:
                display.show(Image.ARROW_N)
                cmd = forward_command
            elif forward_back > fwd_rev_tilt:
                display.show(Image.ARROW_S)
                cmd = reverse_command
        else:
            if side_to_side > steering_tilt:
                display.show(Image.ARROW_E)
                cmd = right_command
            elif side_to_side < -steering_tilt:
                display.show(Image.ARROW_W)
                cmd = left_command

    if cmd == "":
        display.show(Image.SQUARE_SMALL)
        cmd = stop_command

    if cmd != "" and cmd != last_cmd:
        radio.send(cmd)
        last_cmd = cmd

    sleep(250)
