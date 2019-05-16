from microbit import *

while True:
    
    if accelerometer.was_gesture("shake"):   
        display.show(Image.HAPPY)
        sleep (5000)
    else:
        display.show(Image.ASLEEP)
        