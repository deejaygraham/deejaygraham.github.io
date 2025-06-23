from decimal import *


class Player(object):

    def __init__(self, number, x, y):
        self.number = number
        self.xpos = x
        self.ypos = y
        self.money = 100

    def __str__(self):
        return "player " + str(self.number) + " has " + str(self.money)

    def display(self):

        rectMode(CENTER)

        colour = color(128, 128, 128)
        if self.money > 0:
            if self.money > 10:
                if self.money > 100:
                    colour = color(0, 255, 0)
                else:
                    colour = color(0, 128, 0)
            else:
                colour = color(128, 0, 0)

        fill(colour)
        box_size = 48
        rect(self.xpos, self.ypos, box_size, box_size)
        textSize(24)
        fill(color(255))
        text(str(self.number), self.xpos, self.ypos)

    def is_playing(self):
        return self.money > 0

    def stake(self):
        amount = Decimal(self.money / 2).to_integral_value()
        amount = max(amount, 1)
        println(str(self) + " stakes " + str(amount))
        return amount

    def lose(self, amount):
        println(str(self) + ", loses " + str(amount))
        self.money = max(self.money - amount, 0)

    def win(self, amount):
        println(str(self) + ", wins " + str(amount))
        self.money += amount
