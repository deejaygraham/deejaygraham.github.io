size(800, 1000)
art = loadImage("mona-lisa.jpg")
# show the plain image
#image(art, 0, 0, width, height)

noStroke()
background(255, 255, 255)

pixel_size = 5

for x in range(0, art.width, pixel_size):
    for y in range(0, art.height, pixel_size):
        pixel = art.get(x, y)
        fill(pixel)
        rect(x, y, pixel_size, pixel_size)
        # or
        #circle(x, y, pixel_size)
        # or
        #triangle(x + (pixel_size / 2), y, x, y + pixel_size, x + pixel_size, y + pixel_size)

saveFrame("mona.png")