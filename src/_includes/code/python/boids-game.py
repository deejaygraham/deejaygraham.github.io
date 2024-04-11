from Boid import Boid 
from Flock import *

def setup():
  fullScreen()
  global flock
  flock = Flock()

def draw():
  background(50)
  global flock
  flock.fly(width, height)

def mousePressed():
  global flock
  flock.add(Boid(mouseX, mouseY))

  if (mouseButton == RIGHT):
    saveFrame("flock-####.png")