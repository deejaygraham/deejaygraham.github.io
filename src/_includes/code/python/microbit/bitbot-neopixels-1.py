from microbit import *
import neopixel

pixels = neopixel.NeoPixel(pin13, 12)

pixels[0] = (255, 255, 255)
pixels.show()
