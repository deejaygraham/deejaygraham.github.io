# turn off all LEDs

for i in range(0, len(pixels)):
    pixels[i] = (0, 0, 0)

pixels.show()
