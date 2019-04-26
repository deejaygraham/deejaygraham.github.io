# Tiny Tetris clone for Microbit

from microbit import *


# board dimensions
top_row = 0
bottom_row = 4

left_column = 0
right_column = 4

max_pixel_intensity = 9
mid_pixel_intensity = 5
off_pixel_intensity = 0

Frame_Rate_In_Milliseconds = 500


class Block:

    def __init__(self):
        self.x = 2
        self.y = top_row
        self.intensity = max_pixel_intensity

    def draw(self, screen):
        screen.set_pixel(self.x, self.y, self.intensity)

    def hide(self, screen):
        screen.set_pixel(self.x, self.y, off_pixel_intensity)

    def can_drop(self, board):
        if self.y >= bottom_row:
            return False

        return board.has_block_at(self.x, self.y + 1)

    def drop(self):
        self.y += 1

    def move_left(self):
        if self.x > left_column:
            self.x -= 1

    def move_right(self):
        if self.x < right_column:
            self.x += 1


class Board:

    def __init__(self):
        self.bitmap = Image("00000:" * 5)
        self.intensity = mid_pixel_intensity

    def draw(self, screen):
        screen.show(self.bitmap)

    def has_block_at(self, x, y):
        pixel = self.bitmap.get_pixel(x, y)
        return pixel == off_pixel_intensity

    def accept_block(self, block):
        self.bitmap.set_pixel(block.x, block.y, self.intensity)


# Start Game

block = Block()
board = Board()

# Game loop
while True:

    board.draw(display)
    block.draw(display)

    sleep(Frame_Rate_In_Milliseconds)

    block.hide(display)

    if (button_a.was_pressed()):
        block.move_left()
    elif (button_b.was_pressed()):
        block.move_right()

    if block.can_drop(board):
        block.drop()
    else:
        board.accept_block(block)
        block = Block()
