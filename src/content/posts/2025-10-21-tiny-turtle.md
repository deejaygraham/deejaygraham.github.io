---
title: Tiny Turtle
tags: [microbit, code]
---

Here is an experiment in making a tiny implementation of the 
[Logo Programming Language](https://en.wikipedia.org/wiki/Logo_(programming_language)) 
adapted for the microbit and the audience I was working with for some training. As with all 
logo implementations, the idea is to write a program to control a notional 
"turtle" moving around the screen and (perhaps) draw some interesting shapes.

## Logo-ish 

The language is restricted to a few key words, with no parameters for the moment, and is 
interpreted line by line. There is no looping or control structures supported - again 
because I was trying to keep a very limited language. There are advantages and disadvantages 
with this of course, it will be easier to implement and debug but runs the risk of being 
too easy so that anyone using the language will be bored after a couple of hours and perhaps
frustrated with the lack of functionality meaning that the programs running might become 
long-winded since we don't have loops.


## Source Code

Code is executed one line at a time and can be loaded by hard coding instructions 
or by loading a data file from the microbit's internal storage. 


## Keywords

The language supports the following keywords:

* clearscreen - clear the screen 
* down - move one step down the screen
* draw - turn on drawing so that pixels are lit following the path of the turtle
* hide - turn off drawing so the turtle moves but makes no path
* home - move the turtle back to the top left
* left - move one step to the left
* move - move one step to the right
* up - move one step up the screen

Unsupported commands or syntax errors are reported in a scrolling error message with a 
line number. 


## Screen

Moving around the screen, if we go attempt to go beyond the limits of the 5x5 matrix, 
the microbit will complain so that I enforce a rule that says if you go too far over one 
side of the screen we loop around and come back on the other side. 


## Code

```python
from microbit import *

execution_delay = 1_000 # how long to wait in between lines

x = 0 # starting position
y = 0
draw = True 

def enforce_screen_bounds(x1, y1):
    if x1 > 4: x1 = 0
    if x1 < 0: x1 = 4
    if y1 > 4: y1 = 0
    if y1 < 0: y1 = 4

    return x1, y1

def report_error(instruction, line_number):
    display.show(Image.SAD)
    sleep(500)
    display.scroll('Line: ' + str(line_number) + ' do not understand instruction: ' + instruction)

def execute(instruction, line_number):
    global x
    global y
    global draw 

    # logo like instructions
    if instruction == 'clearscreen':
        display.clear()
    elif instruction == 'home':
        x = 0
        y = 0
    elif instruction == 'draw':
        draw = True
    elif instruction == 'hide':
        draw = False
    elif instruction == 'right':
        x, y = enforce_screen_bounds(x + 1, y)
    elif instruction == 'left':
        x, y = enforce_screen_bounds(x - 1, y)
    elif instruction == 'up':
        x, y = enforce_screen_bounds(x, y - 1)
    elif instruction == 'down':
        x, y = enforce_screen_bounds(x, y + 1)
    else:
        report_error(instruction, line_number)

    if draw:
        display.set_pixel(x, y, 9)

def run(source_code):
    index = 0

    while index < len(source_code):        
        execute(source_code[index], index + 1)
        index += 1
        sleep(execution_delay)

def load(file_name):
    with open(file_name) as f:
        source_code = f.read().split('\n')

    # show what we have loaded
    for i in range(len(source_code)):
        print(i, source_code[i])

    return source_code

if __name__ == "__main__":
    program = ['home', 'right', 'right', 'down', 'down', 'left', 'left', 'blarg'] 
    
    # or 
    # program = load('program.txt')
    while True:
      display.clear()
      run(program)
      sleep(5_000)

```

The example program includes a deliberate error to demonstrate error reporting but repeats the program 
after a short delay.

