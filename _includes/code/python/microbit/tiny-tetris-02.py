# Tiny Tetris clone for Microbit

from microbit import *
import random

# board dimensions
board_width, board_height = 4, 4

Frame_Rate_In_Milliseconds = 500


class Block:

    def __init__(self):
        self.x = 2
        self.y = 0
        self.intensity = 9


    def draw(self, screen):
        screen.set_pixel(self.x, self.y, self.intensity)


    def hide(self, screen):
        screen.set_pixel(self.x, self.y, 0)


    def can_drop(self, board):
        if self.y >= board_height: return False

        return board.block_at(self.x, self.y + 1)


    def drop(self):
        self.y += 1


class Board:

    def __init__(self):
        self.bitmap = Image("00000:" * 5)
        self.intensity = 5

    def draw(self, screen):
        screen.show(self.bitmap)

    def block_at(self, x, y):
        pixel = self.bitmap.get_pixel(x, y)
        return pixel == 0


# Start Game

block = Block()
board = Board()

# Game loop
while True:

    board.draw(display)
    block.draw(display)

    sleep(Frame_Rate_In_Milliseconds)

    block.hide(display)

    if block.can_drop(board): 
        block.drop()
