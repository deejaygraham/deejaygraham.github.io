def draw_tile(x, y, w, h):
    line(x, y, x + w, y + h)


size(400, 400)
background(255, 255, 255)
stroke(0)

draw_tile(0, 0, width, height)
saveFrame("art-######.png")
