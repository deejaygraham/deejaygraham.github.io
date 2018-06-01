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

while True:
    sleep(poll_interval)
    left_right, forward_back = read_accel_data()
    a, b = read_buttons()
    write_to_serial(left_right, forward_back, a, b)