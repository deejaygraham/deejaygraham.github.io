# Tiny Tetris clone for Microbit

from microbit import *

max_pixel_intensity = 9
mid_pixel_intensity = 5
off_pixel_intensity = 0

Frame_Rate_In_Milliseconds = 500


class Block:

    def __init__(self):
        self.x = 2
        self.y = 0
        self.intensity = max_pixel_intensity

    def draw(self, screen):
        screen.set_pixel(self.x, self.y, self.intensity)


class Board:

    def __init__(self):
        self.bitmap = Image("00000:" * 5)
        self.intensity = mid_pixel_intensity

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
