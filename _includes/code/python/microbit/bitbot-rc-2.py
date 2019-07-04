# Bitbot RC 
from microbit import *
import radio

# bitbot classes go here...

led_brightness = 50
forward_command = 'F'
stop_command = 'S'
left_command = 'L'
right_command = 'R'
reverse_command = 'B'
fast_command = 'Z'
slow_command = 'W'

fast_speed = 75
slow_speed = 25

motor_speed_percent = slow_speed

bitbot = BitBot()

bitbot.lights(20, 0, 20)
sleep(move_duration)

radio.on()

while True:
    
    received = radio.receive()
  
    if received:
        if received == stop_command:
            bitbot.stop()
        elif received == forward_command:
            bitbot.headlights(led_brightness)
            bitbot.forward(motor_speed_percent)
        elif received == reverse_command:
            bitbot.reversing_lights(led_brightness)
            bitbot.reverse(motor_speed_percent)
        elif received == left_command:
            bitbot.blink_left(led_brightness)
            bitbot.circle_left(motor_speed_percent)
        elif received == right_command:
            bitbot.blink_right(led_brightness)
            bitbot.circle_right(motor_speed_percent)
         elif received == slow_command:
            motor_speed_percent = slow_speed
        elif received == fast_command:
            motor_speed_percent = fast_speed           
            
    sleep(100)
