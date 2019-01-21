import RPi.GPIO as GPIO
import time

red_led = 17
green_led = 18

blink_time = 0.5

build_good = True

GPIO.setmode(GPIO.BOARD)
GPIO.setup(red_led, GPIO.OUT)
GPIO.setup(green_led, GPIO.OUT)

status = GPIO.HIGH

while True:

  turn_off_led = red_led if build_good else green_led  
  led = green_led if build_good else red_led

  GPIO.output(turn_off_led, GPIO.LOW)
  GPIO.output(led, status)
  status = GPIO.LOW if status = GPIO.HIGH else GPIO.LOW

  time.sleep(blink_time)
  