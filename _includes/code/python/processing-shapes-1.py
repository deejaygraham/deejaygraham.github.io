def draw_tile(x, y, w, h):
    left_to_right = True if random(2) >= 1 else False
    
    r = random(255)
    g = random(255)
    b = random(255)
    
    strokeWeight(10)
    stroke(r, g, b)
    
    if left_to_right:
        line(x, y, x + w, y + h)
    else:
        line(x + w, y, x, y + h)

        
def setup():
    size(800, 800)
    background(255)
    stroke(0)
    frameRate(1)


def draw():
    background(255)
    
    tile_size = 20
    
    for x in range(0, width, tile_size):
        for y in range(0, height, tile_size):
            draw_tile(x, y, tile_size, tile_size)
