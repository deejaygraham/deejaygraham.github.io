def setup():
  global art
  art = loadImage('mona-lisa.jpg')
  fullScreen()
  colorMode(HSB, 255)
  ellipseMode(CORNER)
  background(255, 255, 255)
  noStroke()
    