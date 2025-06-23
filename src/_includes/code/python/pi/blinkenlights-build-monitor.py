from gpiozero import LED
import time

red_led = LED(17)
green_led = LED(18)

blink_time = 0.5

build_good = True

while True:

    unused_led = red_led if build_good else green_led
    status_led = green_led if build_good else red_led

    unused_led.off()

    status_led.on()
    time.sleep(blink_time)
    status_led.off()
    time.sleep(blink_time)
