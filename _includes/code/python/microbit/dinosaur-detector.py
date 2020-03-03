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

    lhs = 0
	rhs = 4

    if self.x >= rhs:
        self.x = rhs
        self.direction = -self.direction
    elif self.x <= lhs:
        self.x = lhs
        self.direction = -self.direction
        
    self.x += self.direction
    display.set_pixel(self.x, self.y, 9) 
    
    
class DinosaurDetector:
   
  def __init__(self):
    self.horizontal_start = 0
    self.vertical_start = 0
    self.reset()
     
  def dinosaur_detected(self):
    horizontal_now = accelerometer.get_x()
    vertical_now = accelerometer.get_y()
  
    return self.horizontal_start != horizontal_now or self.vertical_start != vertical_now

  def reset(self):
    self.horizontal_start = accelerometer.get_x()
    self.vertical_start = accelerometer.get_y()


display.scroll('Dino Detector', delay=100)

detector = DinosaurDetector()
pinger = Pinger()

glass1 = Image("00000:00000:00900:00000:00000")
glass2 = Image("00000:00900:09090:00900:00000")
glass3 = Image("09990:90009:90009:90009:09990")
glass4 = Image("09090:90009:00000:90009:09090")
ripple_animation = [glass1, glass2, glass3, glass4, glass3, glass2, glass1]

while True:
  
  pinger.update()
  sleep(sleep_time)
    
  if detector.dinosaur_detected():
      detector.reset()
      display.show(ripple_animation, delay=100)
      display.show(Image.GIRAFFE)
      sleep(warning_time)
      display.clear()
