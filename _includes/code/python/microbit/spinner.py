from microbit import *

class Spinner:
    
    def __init__(self):
        self.x = 2
        self.y = 0
        self.x_inc = 1
        self.y_inc = 0
        self.pixel_value = 9

    def update(self):
        display.set_pixel(self.x, self.y, self.pixel_value)

        self.x = self.x + self.x_inc
        self.y = self.y + self.y_inc 
    
        if self.x == 4 and self.y == 0:
            self.x_inc = 0
            self.y_inc = 1
        elif self.x == 4 and self.y == 4:
            self.x_inc = -1
            self.y_inc = 0
        elif self.x == 0 and self.y == 4:
            self.x_inc = 0
            self.y_inc = -1
        elif self.x == 0 and self.y == 0:
            self.x_inc = 1
            self.y_inc = 0
        
        if self.x == 2 and self.y == 0:
            if self.pixel_value == 9:
                self.pixel_value = 0
            else:
                self.pixel_value = 9
        
delay = 100
spinner = Spinner()

while True:
    spinner.update()
    sleep(delay)