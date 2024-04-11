from microbit import *
import random


leds = [(x, y) for y in range(0, 5) for x in range(0, 5)]

# is this x, y location on the board?
def is_legal_location(x, y):
    return 0 <= x < 5 and 0 <= y < 5


def is_cell_alive(x, y):
    if is_legal_location(x, y):
        return display.get_pixel(x, y) == 9
    return False


def is_cell_dying(x, y):
    brightness = display.get_pixel(x, y)
    return 0 < brightness < 9

    
def is_cell_dead(x, y):
    return display.get_pixel(x, y) == 0   

    
def count_live_neighbours(x, y):
    neighbours = 0

    left = x - 1
    right = x + 1
    above = y - 1
    below = y + 1
    
    if is_cell_alive(left, above):
        neighbours += 1

    if is_cell_alive(left, y):
        neighbours += 1

    if is_cell_alive(left, below):
        neighbours += 1

    if is_cell_alive(x, above):
        neighbours += 1

    if is_cell_alive(x, below):
        neighbours += 1

    if is_cell_alive(right, above):
        neighbours += 1

    if is_cell_alive(right, y):
        neighbours += 1

    if is_cell_alive(right, below):
        neighbours += 1

    return neighbours

  
def apply_rules_to_cells():
    for led in leds:
        x, y = led[0], led[1]
        neighbours = count_live_neighbours(x, y)

        # Any live cell...
        if is_cell_alive(x, y):
            # ... with fewer than two live neighbours 
            # dies, as if caused by under-population.
            # ... with more than three live neighbours 
            # dies, as if by over-population.
            if neighbours < 2 or neighbours > 3:
                display.set_pixel(x, y, 8)
            # ... with two or three live neighbours 
            # lives on to the next generation.
            elif neighbours in [2, 3]:
                display.set_pixel(x, y, 9)
                
        # Any dead cell...
        if is_cell_dead(x, y) and neighbours == 3:
            # ... with exactly three live neighbours 
            # becomes a live cell, as if by reproduction.
            display.set_pixel(led[0], led[1], 9)


def generate_random_population():
    display.clear()
    new_cell_probability = 50

    for led in leds:
        probability = random.randint(0, 100)
        if probability <= new_cell_probability:
            display.set_pixel(led[0], led[1], 9)

    
def are_cells_dying():
    for led in leds:
        if is_cell_dying(led[0], led[1]):
            return True
  
    return False
  
  
def animate_dying_cells():
    for led in leds:
        x, y = led[0], led[1]
        brightness = display.get_pixel(x, y)
        
        if 0 < brightness < 9:
            faded_brightness = max(brightness - 3, 0)
            display.set_pixel(x, y, faded_brightness)


def is_life_extinct():
    for led in leds:
        if is_cell_alive(led[0], led[1]):
            return False
  
    return True


def display_random_animal():
    animals = [
        Image.DUCK, Image.RABBIT, Image.COW, Image.PACMAN, 
        Image.TORTOISE, Image.BUTTERFLY, Image.GIRAFFE, Image.SNAKE
    ]

    display.show(random.choice(animals))
    sleep(2000)
    display.clear()


# Game start...
display_random_animal()
regenerate_population = True

while True:

    if regenerate_population:
        regenerate_population = False
        generate_random_population()
        
    sleep(250)

    if are_cells_dying():
        animate_dying_cells()
    else:
        apply_rules_to_cells()   
    
    if is_life_extinct():
        display.show(Image.SKULL)
        sleep(3000)
        regenerate_population = True

    if button_a.was_pressed():
        regenerate_population = True
