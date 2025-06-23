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


from gpiozero import LED
import time

red_led = LED(17)
blink_time = 0.5

while True:
    red_led.on()
    time.sleep(blink_time)
    red_led.off()
    time.sleep(blink_time)
