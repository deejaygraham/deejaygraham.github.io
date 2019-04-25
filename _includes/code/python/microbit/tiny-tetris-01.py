# Tiny Tetris clone for Microbit

from microbit import *
import random

# board dimensions
pixel_width, pixel_height = 4, 4

Frame_Rate_In_Milliseconds = 500


class Block:

    def __init__(self):
        self.x = 2
        self.y = 0
        self.intensity = 9


    def draw(self, screen):
        screen.set_pixel(self.x, self.y, self.intensity)


class Board:

    def __init__(self):
        self.bitmap = Image("00000:" * 5)
        self.intensity = 5

    def draw(self, screen):
        screen.show(self.bitmap)


# Start Game

block = Block()
board = Board()

# Game loop
while True:

    board.draw(display)
    block.draw(display)

    sleep(Frame_Rate_In_Milliseconds)
