from microbit import *
import radio

Direction_Up = 0
Direction_Down = 1
Direction_Left = 2
Direction_Right = 3


class Turtle:

    def __init__(self):
        self.direction = Direction_Up
        self.x = 2
        self.y = 2
        self.speed = 500
        self.pen = False

    def home(self):
        self.goto(2, 2)

    def forward(self, steps=1):

        x_delta, y_delta = 0, 0

        if self.direction == Direction_Up:
            y_delta = -1
        elif self.direction == Direction_Down:
            y_delta = 1
        elif self.direction == Direction_Left:
            x_delta = -1
        else:
            x_delta = 1

        for i in range(steps):
            self.goto(self.x + x_delta, self.y + y_delta)
            sleep(self.speed)

    def goto(self, x, y):

        if not self.pen:
            display.set_pixel(self.x, self.y, 0)

        self.x = min(max(0, x), 4)
        self.y = min(max(0, y), 4)

        display.set_pixel(self.x, self.y, 9)

    def left(self):
        if self.direction == Direction_Up:
            self.direction = Direction_Left
        elif self.direction == Direction_Left:
            self.direction = Direction_Down
        elif self.direction == Direction_Down:
            self.direction = Direction_Right
        else:
            self.direction = Direction_Up

    def right(self):
        if self.direction == Direction_Up:
            self.direction = Direction_Right
        elif self.direction == Direction_Right:
            self.direction = Direction_Down
        elif self.direction == Direction_Down:
            self.direction = Direction_Left
        else:
            self.direction = Direction_Up

    def pendown(self):
        self.pen = True

    def penup(self):
        self.pen = False
