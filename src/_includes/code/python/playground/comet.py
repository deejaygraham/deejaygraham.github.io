from adafruit_circuitplayground.express import cpx
import adafruit_fancyled.adafruit_fancyled as fancy

cpx.pixels.auto_write = False
cpx.pixels.brightness = 0.25

palette = [
    fancy.CRGB(255, 255, 255),
    fancy.CRGB(255, 255, 0),
    fancy.CRGB(255, 0, 0),
    fancy.CRGB(128, 0, 0),
    fancy.CRGB(64, 0, 0),
    fancy.CRGB(32, 0, 0),
    fancy.CRGB(16, 0, 0),
    fancy.CRGB(8, 0, 0),
    fancy.CRGB(0, 0, 0),
]

offset = 0
spin_rate = 0.03

while True:
    for i in range(10):
        color = fancy.palette_lookup(palette, offset + i / 9)
        cpx.pixels[i] = color.pack()

    cpx.pixels.show()

    offset += spin_rate
