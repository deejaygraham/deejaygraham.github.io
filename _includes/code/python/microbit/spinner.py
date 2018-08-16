from microbit import *

x = 2
y = 0

x_inc = 1
y_inc = 0

pixel_value = 9

while True:

    display.set_pixel(x, y, pixel_value)

    x = x + x_inc
    y = y + y_inc 
    
    if x == 4 and y == 0:
        x_inc = 0
        y_inc = 1
    elif x == 4 and y == 4:
        x_inc = -1
        y_inc = 0
    elif x == 0 and y == 4:
        x_inc = 0
        y_inc = -1
    elif x == 0 and y == 0:
        x_inc = 1
        y_inc = 0
        
    if x == 2 and y == 0:
        if pixel_value == 9:
            pixel_value = 0
        else:
            pixel_value = 9
        
    sleep(250)
    