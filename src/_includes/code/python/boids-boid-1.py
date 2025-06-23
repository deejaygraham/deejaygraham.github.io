class Boid(object):

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def fly(self, members):
        stroke(255)
        point(self.x, self.y)
