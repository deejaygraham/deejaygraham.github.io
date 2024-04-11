tx = 0
ty = 1000

def setup():
  global displayWidth, displayHeight
  size(displayWidth, displayHeight)
  background(0)
  fill(255)
  stroke(255, 25)


def draw():

  global tx, ty
  
  x = map(noise(tx), 0, 1, 0, width)
  y = map(noise(ty), 0, 1, 0, height)
  
  tx += 0.01
  ty += 0.01        
  
  r = random(255)
  g = random(255)
  b = random(255)
  
  fill(r, g, b)
  circle(x, y, 5)
    
  if x <= width / 4 and y <= height / 4:
    noLoop()
    