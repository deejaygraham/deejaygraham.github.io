# ghost detector - looking for changes in temperature 
from microbit import *

sleep_time = 200
warning_time = 5000


class Pinger:

  def __init__(self):
    self.direction = 1
    self.x = 2
    self.y = 2

  def update(self):
    display.set_pixel(self.x, self.y, 0)
    if self.x >= 4:
        self.x = 4
        self.direction = -self.direction
    elif self.x <= 0:
        self.x = 0
        self.direction = -self.direction

    self.x += self.direction
    display.set_pixel(self.x, self.y, 9)


class GhostDetector:

  def __init__(self):
     self.reset()

  def ghost_detected(self):
    now_temperature = temperature()
    return self.starting_temperature != now_temperature

  def reset(self):
    self.starting_temperature = temperature()


pinger = Pinger()
detector = GhostDetector()

while True:

  pinger.update()
  sleep(sleep_time)

  if detector.ghost_detected():
     detector.reset()
     display.show(Image.GHOST)
     sleep(warning_time)
     display.clear()
