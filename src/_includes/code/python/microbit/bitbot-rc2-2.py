class MicrobitLEDs:

    def __init__(self, led_pin):
        self.neopixels = neopixel.NeoPixel(led_pin, 12)

    def light(self, pixels, colour):
        for i in pixels:
            self.neopixels[i] = colour
        self.neopixels.show()

    def clear(self):
        self.light(range(0, 12), (0, 0, 0))

    def headlights(self, off=False):
        colour = (0, 0, 0) if off else (100, 100, 100)
        self.light([5, 11], colour)

    def reversing_lights(self, off=False):
        colour = (0, 0, 0) if off else (100, 100, 100)
        self.light([0, 6], colour)

    def brake_lights(self, off=False):
        colour = (0, 0, 0) if off else (100, 0, 0)
        self.light([0, 6], colour)

    def left_blinker(self, off=False):
        colour = (0, 0, 0) if off else (100, 50, 0)
        self.light([3, 4], colour)

    def right_blinker(self, off=False):
        colour = (0, 0, 0) if off else (100, 50, 0)
        self.light([9, 10], colour)
