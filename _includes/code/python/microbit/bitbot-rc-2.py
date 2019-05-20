# Bitbot RC 
from microbit import *
import radio


bitbot = BitBot()

bitbot.lights(20, 0, 20)
sleep(move_duration)

radio.on()

while True:
    
    received = radio.receive()
  
    if received:
        if received == 'S':
            bitbot.stop()
        elif received == 'F':
            bitbot.headlights(50)
            bitbot.forward(50)
        elif received == 'B':
            bitbot.reversing_lights(50)
            bitbot.reverse(50)
        elif received == 'L':
            bitbot.blink_left(50)
            bitbot.circle_left(50)
        elif received == 'R':
            bitbot.blink_right(50)
            bitbot.circle_right(50)
            
    sleep(100)
