# read sensor data from microbit and write to
# serial port to be read by companion program
# running on raspberry pi
from microbit import *


def read_accel_data():
    x, y = accelerometer.get_x(), accelerometer.get_y()
    return x, y


def read_buttons():
    a, b = button_a.was_pressed(), button_b.was_pressed()
    return a, b


def write_to_serial(x, y, a, b):
    print(x, y, a, b)


poll_interval = 500
pixel = 9
pixel_x = 2
pixel_y = 2

threshold = (1024 / 90) * 20  # degrees

while True:
    sleep(poll_interval)
    left_right, forward_back = read_accel_data()
    a, b = read_buttons()

    display.set_pixel(pixel_x, pixel_y, 0)

    if left_right < -threshold:
        pixel_x = 0
    elif left_right > threshold:
        pixel_x = 4
    else:
        pixel_x = 2

    if forward_back < -threshold:
        pixel_y = 0
    elif forward_back > threshold:
        pixel_y = 4
    else:
        pixel_y = 2

    display.set_pixel(pixel_x, pixel_y, pixel)
    pixel = 0 if pixel == 9 else 9
    write_to_serial(left_right, forward_back, a, b)
