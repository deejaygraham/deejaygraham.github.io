# Bitbot remote control
from microbit import *
import radio

tilt_threshold = 250

radio.on()

last_action = ''

while True:
    
    action = ''
    
    if button_a.was_pressed() or button_b.was_pressed():
        display.show(Image.SQUARE_SMALL)
        action = 'S'
    else:
        side_to_side = accelerometer.get_x()
        forward_back = accelerometer.get_y()
        
        if forward_back < -tilt_threshold:
            display.show(Image.ARROW_N)
            action = 'F'
        elif forward_back > tilt_threshold:
            display.show(Image.ARROW_S)
            action = 'B'
        elif side_to_side > tilt_threshold:
            display.show(Image.ARROW_E)
            action = 'R'
        elif side_to_side < -tilt_threshold:
            display.show(Image.ARROW_W)
            action = 'L'
        else:
            display.show(Image.SQUARE_SMALL)
            action = 'S'
            
    if action != last_action:
        radio.send(action)
        last_action = action 
        
    sleep(500)
    