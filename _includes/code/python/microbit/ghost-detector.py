# ghost-detector.py
from microbit import *

sleep_time = 150
warning_time = 5000
minimum_temperature_difference = 1 # degrees


class SweepScanner:

  def __init__(self):
    self.direction = 1
    self.x = 2

  def draw_line(self, brightness):
    for y in range(5):
        display.set_pixel(self.x, y, brightness)

  def scan(self):
    self.draw_line(0)

    lhs = 0
    rhs = 4

    if self.x >= rhs or self.x <= lhs:
        self.direction = -self.direction

    self.x = max(lhs, min(rhs, self.x + self.direction))    
    self.draw_line(9)


class Detector:

  def __init__(self):
     self.reset()

  def room_is_colder(self):
    now_temperature = temperature()
    temperature_difference = self.starting_temperature - now_temperature
    return temperature_difference >= minimum_temperature_difference

  def reset(self):
    self.starting_temperature = temperature()


scanner = SweepScanner()
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
