class FlyingToaster(object):
    
  def __init__(self, x, y, speed):
    self.xpos = x
    self.ypos = y
    self.speed = speed
    self.frame = int(random(0,4))
    self.frames = 4
    
    self.sprites = []
    for i in range(self.frames):
      filename = "toaster" + str(i) + ".png"
      self.sprites.append(loadImage(filename))
      
  def draw(self):
    self.frame = (self.frame + 1) % self.frames
    image(self.sprites[self.frame], self.xpos, self.ypos)
    
  def move(self):
    self.xpos -= self.speed
    self.ypos += self.speed
    if self.xpos < -self.sprites[0].width: self.xpos = width + self.sprites[0].width
    if self.ypos > height: self.ypos = 0 - self.sprites[0].height
