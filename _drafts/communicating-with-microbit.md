

Connecting Microbit to the Raspberry Pi


Disconnect, use a terminal to show ls /dev/ttyA*

Plug in and look for ls /dev/ttyA*

dev/ttyACM1


or do

dmesg


171769.685287] cdc_acm 1-1.2:1.1: ttyACM0: USB ACM device




On Raspberry Pi

import serial
from time import sleep
import scratch

scr = scratch.Scratch()
## THE NEXT LINE MIGHT NEED TO BE CHANGED - TYPE ls /dev/ttyA* into the terminal to see which port is needed.
PORT = "/dev/ttyACM1"
##
BAUD = 115200

s = serial.Serial(PORT)
s.baudrate = BAUD
s.parity   = serial.PARITY_NONE
s.databits = serial.EIGHTBITS
s.stopbits = serial.STOPBITS_ONE

while True:
    data = s.readline().decode('UTF-8')
    data_list = data.rstrip().split(' ')
    try:
        x, y, z, a, b = data_list
        scr.sensorupdate({'x' : x})
        scr.sensorupdate({'y' : y})
        scr.sensorupdate({'z' : z})
        scr.sensorupdate({'a' : a})
        scr.sensorupdate({'b' : b})

    except:
        pass

s.close()


PORT = "/dev/ttyACM1"




on Microbit

from microbit import *

def get_sensor_data():
    x, y, z = accelerometer.get_x(), accelerometer.get_y(), accelerometer.get_z()
    a, b = button_a.was_pressed(), button_b.was_pressed()
    print(x, y, z, a, b)

while True:
    sleep(100)
    get_sensor_data()
