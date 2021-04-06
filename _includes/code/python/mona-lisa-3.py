def pixelate(pixel_size):
  ratio = art.height / art.width if art.width < art.height else art.width / art.height
  pixel_height = int(pixel_size * ratio)
  
  # noStroke()

  for x in range(0, art.width, pixel_size):
    for y in range(0, art.height, pixel_height):
      fill(art.get(x, y))
      rect(x, y, pixel_size, pixel_height)


def draw():
  background(255, 255, 255)
  pixelate(25)
        