# ghost-detector.py
from microbit import *

sleep_time = 200
warning_time = 5000
minimum_temperature_difference = 1 # degrees


class Scanner:

  def __init__(self):
    self.direction = 1
    self.x = 2
    self.y = 2

  def scan(self):
    display.set_pixel(self.x, self.y, 0)
    if self.x >= 4:
        self.x = 4
        self.direction = -self.direction
    elif self.x <= 0:
        self.x = 0
        self.direction = -self.direction

    self.x += self.direction
    display.set_pixel(self.x, self.y, 9)


class Detector:

  def __init__(self):
     self.reset()

  def room_is_colder(self):
    now_temperature = temperature()
    temperature_difference = self.starting_temperature - now_temperature
    return temperature_difference >= minimum_temperature_difference

  def reset(self):
    self.starting_temperature = temperature()


scanner = Scanner()
detector = Detector()

while True:

  scanner.scan()
  sleep(sleep_time)

  if detector.room_is_colder():
     display.show(Image.GHOST)
     sleep(warning_time)
     detector.reset()
     display.clear()

  if button_a.was_pressed():
     detector.reset()
     