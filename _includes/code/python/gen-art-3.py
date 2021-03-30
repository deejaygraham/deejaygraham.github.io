def draw_tile(x, y, w, h):
  left_to_right = True if random(2) >= 1.0 else False
        
  if left_to_right:      
    line(x, y, x + w, y + h)
  else:
    line(x + w, y, x, y + h)

tile_size = 20

size(400, 400)
background(255, 255, 255)
stroke(0)

for x in range(0, width, tile_size):
  for y in range(0, height, tile_size):
    draw_tile(x, y, tile_size, tile_size)

saveFrame("art-######.png")
