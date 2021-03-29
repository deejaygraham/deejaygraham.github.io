def draw_tile(x, y, w, h):
  left_to_right = True if random(2) >= 1.0 else False
        
  if left_to_right:      
    line(x, y, x + w, y + h)
  else:
    line(x + w, y, x, y + h)


size(400, 400)
background(255, 255, 255)
stroke(0)
        
draw_tile(0, 0, width, height)
saveFrame("art-######.png")
