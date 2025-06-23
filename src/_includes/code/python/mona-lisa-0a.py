size(800, 1000)
art = loadImage("mona-lisa.jpg")
# show the plain image
# image(art, 0, 0, width, height)

noStroke()
background(255, 255, 255)

pixel_size = 5

for x in range(0, art.width, pixel_size):
    for y in range(0, art.height, pixel_size):
        # original
        # pixel = art.get(x, y)
        # flip left and right
        # pixel = art.get(art.width - x, y)
        # upside down
        pixel = art.get(x, art.height - y)
        fill(pixel)
        rect(x, y, pixel_size, pixel_size)

saveFrame("mona.png")
