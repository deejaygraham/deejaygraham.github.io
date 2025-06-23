class FlyingToast(object):

    def __init__(self, x, y, speed):
        self.sprite = loadImage("toast.png")
        self.xpos = x
        self.ypos = y
        self.speed = speed

    def draw(self):
        image(self.sprite, self.xpos, self.ypos)

    def move(self):
        self.xpos -= self.speed
        self.ypos += self.speed
        if self.xpos < -self.sprite.width:
            self.xpos = width + self.sprite.width
        if self.ypos > height:
            self.ypos = 0 - self.sprite.height
