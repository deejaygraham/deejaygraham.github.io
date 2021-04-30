def draw_tile(x, y, w, h, i):
    r = random(255)
    g = random(255)
    b = random(255)
    
    strokeWeight(3)
    stroke(r, g, b)
    
    beginShape()
    vertex(x, y)
    vertex(x + w - i, y + i)
    vertex(x + w, y + h)
    vertex(x, y + h - i)
    endShape(CLOSE)
            
        
def setup():
    size(800, 800)
    background(255)
    stroke(0)
    frameRate(1)
   
    
def draw():
    background(255)
    
    tile_size = 100

    across = 0.0
    for x in range(0, width, tile_size):
        down = 0
        across += 0.5
        for y in range(0, height, tile_size):
            draw_tile(x, y, tile_size, tile_size, across * down)
            down += 0.5
    
            