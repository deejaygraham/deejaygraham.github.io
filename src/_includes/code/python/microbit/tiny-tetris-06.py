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

    def is_row_filled(self, row):
        for column in range(left_column, right_column + 1):
            pixel = self.bitmap.get_pixel(column, row)
            if pixel != self.intensity:
                return False

        return True

    def clear_row(self, row):
        # flash the row first ?
        # clear it
        for column in range(left_column, right_column + 1):
            self.bitmap.set_pixel(column, row, off_pixel_intensity)

    def collapse_rows_above(self, row):
        for r in range(row - 1, top_row - 1, -1):
            for column in range(left_column, right_column + 1):
                pixel = self.bitmap.get_pixel(column, r)
                self.bitmap.set_pixel(column, r + 1, pixel)

    def clear_rows(self, screen):
        rows_cleared = 0

        # go from bottom to top
        for row in range(bottom_row, top_row - 1, -1):
            if self.is_row_filled(row):
                self.clear_row(row)
                self.draw(screen)
                sleep(Frame_Rate_In_Milliseconds)
                self.collapse_rows_above(row)
                self.draw(screen)
                sleep(Frame_Rate_In_Milliseconds)
                rows_cleared += 1

        return rows_cleared


# Start Game
display.scroll("Tiny Tetris") 


block = Block()
board = Board()

score = 0

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
        if block.y == top_row:
            break

        board.accept_block(block)
        score += board.clear_rows(display)

        block = Block()

display.scroll("Game Over!") 
display.scroll("You scored ")       
display.scroll(str(score)) 