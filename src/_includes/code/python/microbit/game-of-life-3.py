def apply_rules_to_cells():
    
    next_screen = Image()
    
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
                next_screen.set_pixel(x, y, 8)
            # ... with two or three live neighbours
            # lives on to the next generation.
            elif neighbours in [2, 3]:
                next_screen.set_pixel(x, y, 9)

        # Any dead cell...
        if is_cell_dead(x, y) and neighbours == 3:
            # ... with exactly three live neighbours
            # becomes a live cell, as if by reproduction.
            next_screen.set_pixel(led[0], led[1], 9)
    
    display.show(next_screen)
