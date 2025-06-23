from microbit import *
import radio


def wait_for_contact():
    hello = "hi"
    waiting = True

    while waiting:
        display.set_pixel(2, 2, 9)
        sleep(100)
        radio.send(hello)

        msg = radio.receive()

        if msg and msg == hello:
            waiting = False
        else:
            display.set_pixel(2, 2, 0)
            sleep(100)


def show_contact_made():
    for i in range(5):
        display.show(Image.HEART_SMALL)
        sleep(500)
        display.show(Image.HEART)
        sleep(500)


fwd_rev_tilt = 250
steering_tilt = 250

forward_command = "F"
stop_command = "S"
left_command = "L"
right_command = "R"
reverse_command = "B"
fast_command = "Z"
slow_command = "W"
lights_command = "I"
horn_command = "P"
watchdog_command = "hi"

display.scroll("bitBot RC handset")

radio.on()

wait_for_contact()
show_contact_made()

last_cmd = ""
watchdog_counter = 0

while True:

    cmd = ""

    if button_a.was_pressed():
        cmd = lights_command
    elif button_b.was_pressed():
        cmd = horn_command
    elif pin0.is_touched():
        cmd = slow_command
    elif pin2.is_touched():
        cmd = fast_command
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

    # try to keep in constant contact
    # even if nothing has changed so
    # we don't run away
    watchdog_counter += 1

    # send every 5 seconds or so
    if watchdog_counter >= 20:
        radio.send(watchdog_command)
        watchdog_counter = 0

    sleep(250)
