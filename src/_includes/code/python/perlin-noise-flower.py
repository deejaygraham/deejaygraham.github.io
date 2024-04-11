# From Emily Xie at PyCon 2018 https://www.youtube.com/watch?v=u3d-n41Tobw
# @emilyxxie on twitter

TOTAL_DEGREES = 360
radius = 0
inc_direction = -1
 
def setup():
  global displayWidth, displayHeight, radius
  size(displayWidth, displayHeight)
  background(0)
  noFill()
  stroke(255, 25)
  radius = height / 2


def draw():

  centre_x = width / 2
  centre_y = height / 2
    
  global TOTAL_DEGREES, radius, inc_direction
    
  # debug
  # background(0)
    
  beginShape()
  
  for degree in range(TOTAL_DEGREES):
    noiseFactor = noise(degree * 0.02, float(frameCount) / 150)
    # debug 
    # print(noiseFactor)

    # first guess - use normal random
#      x = centre_x + radius * cos(radians(degree)) + random(100)
#      y = centre_y + radius * sin(radians(degree)) + random(100)

    x = centre_x + radius * cos(radians(degree)) * noiseFactor
    y = centre_y + radius * sin(radians(degree)) * noiseFactor

    curveVertex(x, y)
      
  endShape(CLOSE)
    
  radius += inc_direction
    
  if radius == 0 or radius > (width / 2):
    inc_direction = -inc_direction
    saveFrame("flower-###.png")
#   noLoop()
    