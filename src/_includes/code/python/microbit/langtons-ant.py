from microbit import *
import random

def create_new_ant():
    return [random.randint(0, 4), random.randint(0, 4)] # start at a random place on the board
    
def pick_direction(compass_points):
    return random.choice(compass_points)

# lit pixel -> dark, dark pixel -> lit
def flip_pixel(pixel):
    intensity = display.get_pixel(pixel[0], pixel[1])
    
    if intensity == 0: intensity = 9
    else: intensity = 0
        
    display.set_pixel(pixel[0], pixel[1], intensity)
   
def turn_left(direction, compass_points):
    index = compass_points.index(direction)
    if index == 0:
        index = len(compass_points) - 1
    else:
        index -= 1
    return compass_points[index] 
    
def turn_right(direction, compass_points):
    index = compass_points.index(direction)    
    if index == (len(compass_points) -1):
        index = 0
    else:
        index += 1
    return compass_points[index] 
    
def move_forward(ant, heading):
    new_ant = [ant[0] + heading[0], ant[1] + heading[1]]
    return new_ant
    
def wrap_value_if_required(value):
   if value > 4:
      value = 0
   elif value < 0:
      value = 4
   return value
   
# Keep the ant on the board. If we go too far one direction, 
# wrap the board around and start again on the opposite edge
def wrap_world_edges(ant):
    return [wrap_value_if_required(ant[0]), wrap_value_if_required(ant[1])]

ant = create_new_ant()

north = [1, 0]
east = [0, 1]
south = [-1, 0]
west = [0, -1]

compass_points = [ north, east, south, west ]
direction = pick_direction(compass_points) # start off pointing in a random direction

while True:
    square = display.get_pixel(ant[0], ant[1])
     
    if square == 0: 
        direction = turn_left(direction, compass_points)
    else: 
        direction = turn_right(direction, compass_points)
        
    flip_pixel(ant)
    ant = move_forward(ant, direction)
    ant = wrap_world_edges(ant)
    sleep(500)        