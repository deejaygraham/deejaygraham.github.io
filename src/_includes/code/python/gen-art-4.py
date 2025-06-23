def draw_tile(x, y, w, h):
    horizontal = True if random(2) >= 1.0 else False

    if horizontal:
        line(x, y + (h / 2), x + w, y + (h / 2))
    else:
        line(x + (w / 2), y, x + (w / 2), y + h)


tile_size = 20

size(520, 520)
background(255, 255, 255)
stroke(0)

for x in range(0, width, tile_size):
    for y in range(0, height, tile_size):
        draw_tile(x, y, tile_size, tile_size)

saveFrame("art-######.png")
