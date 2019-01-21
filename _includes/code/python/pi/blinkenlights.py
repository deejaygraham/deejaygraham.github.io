# Circuit Diagram
# Pin7 (GPIIO4) 
#     --¬
#       |
#       |
#       _
#      \ /  Red Led
#      ---
#       |
#       -
#      | | 300 Ohm 
#      | | Resistor
#       -
#       |
#     --
# Pin 9 (GND) 


import RPi.GPIO as GPIO
import time

red_led = 17
blink_time = 0.5

GPIO.setmode(GPIO.BOARD)
GPIO.setup(red_led, GPIO.OUT)

while True:
   GPIO.output(red_led, GPIO.HIGH)
   time.sleep(blink_time)
   GPIO.output(red_led, GPIO.LOW)
   time.sleep(blink_time)
   