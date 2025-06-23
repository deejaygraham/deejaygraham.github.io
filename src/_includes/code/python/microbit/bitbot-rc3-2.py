from microbit import *
import radio
import neopixel

# Motors - speed and direction
left_motor = [pin0, pin8]
right_motor = [pin1, pin12]


# Motor Functions
def pulse_width_modulate(motor, speed, direction):
    if 1023 >= speed >= 0:
        motor[0].write_analog(speed)
        motor[1].write_digital(direction)


def motor_forward(motor, percent):
    pulse_width_modulate(motor, percent * 10.23, 0)


def motor_reverse(motor, percent):
    pulse_width_modulate(motor, 1023 - (percent * 10.23), 1)


def motor_stop(motor):
    pulse_width_modulate(motor, 0, 0)


# LED Functions
neopixels = neopixel.NeoPixel(pin13, 12)


def set_leds(pixels, colour):
    for i in pixels:
        neopixels[i] = colour
    neopixels.show()


# Colours
black = (0, 0, 0)
white = (75, 75, 75)  # full intensity is REALLY bright
red = (75, 0, 0)
amber = (75, 40, 0)


def mainbeam_lights(off=False):
    set_leds([5, 11], black if off else white)


def reverse_lights(off=False):
    set_leds([0, 6], black if off else white)


def brake_lights(off=False):
    set_leds([0, 6], black if off else red)


def left_blinker(off=False):
    set_leds([3, 4], black if off else amber)


def right_blinker(off=False):
    set_leds([9, 10], black if off else amber)


# High level commands
direction = "S"
speed = 50
headlights = "auto"


def go_faster():
    global speed
    speed = min(speed + 20, 100)


def go_slower():
    global speed
    speed = max(speed - 20, 0)


def go_forward():
    global direction
    direction = "F"
    motor_forward(left_motor, speed)
    motor_forward(right_motor, speed)


def reverse():
    global direction
    direction = "B"
    sound_horn()
    motor_reverse(left_motor, speed)
    motor_reverse(right_motor, speed)


def steer_left():
    global direction
    direction = "L"
    motor_forward(left_motor, speed / 2)
    motor_forward(right_motor, speed)


def steer_right():
    global direction
    direction = "R"
    motor_forward(left_motor, speed)
    motor_forward(right_motor, speed / 2)


def stop():
    global direction
    direction = "S"
    motor_stop(left_motor)
    motor_stop(right_motor)


def cycle_lights():
    global headlights
    if headlights == "auto":
        headlights = "off"
    elif headlights == "off":
        headlights = "on"
    else:
        headlights = "auto"


def update_headlights():
    main_beams = True if headlights == "on" else False

    if headlights == "auto":
        main_beams = False if display.read_light_level() >= 75 else True

    if main_beams:
        mainbeam_lights()
    else:
        mainbeam_lights(off=True)


def update_blinkers():
    left_blinker(off=direction != "L")
    right_blinker(off=direction != "R")


def update_rear_lights():
    if direction == "S":
        brake_lights()
    elif direction == "F" or direction == "L" or direction == "R":
        brake_lights(off=True)
        reverse_lights(off=True)
    elif direction == "B":
        reverse_lights()


def update_lights():
    update_headlights()
    update_blinkers()
    update_rear_lights()


def sound_horn():
    for i in range(2):
        pin14.write_digital(1)
        sleep(100)
        pin14.write_digital(0)
        sleep(200)


def wait_for_contact():
    display.clear()
    waiting = True

    while waiting:
        display.set_pixel(2, 2, 9)
        sleep(100)
        msg = radio.receive()

        if msg and msg == "hi":
            radio.send(msg)
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

    display.clear()


display.scroll("bitBot RC")
radio.on()

while True:
    wait_for_contact()
    show_contact_made()

    watchdog_counter = 0

    while watchdog_counter < 100:
        watchdog_counter += 1
        update_lights()
        sleep(100)

        msg = radio.receive()

        if msg:
            watchdog_counter = 0

            if msg == "S":
                stop()
            elif msg == "F":
                go_forward()
            elif msg == "B":
                reverse()
            elif msg == "L":
                steer_left()
            elif msg == "R":
                steer_right()
            elif msg == "W":
                go_slower()
            elif msg == "Z":
                go_faster()
            elif msg == "I":
                cycle_lights()
            elif msg == "P":
                sound_horn()

    stop()
    display.show(Image.SKULL)
    sleep(2000)
