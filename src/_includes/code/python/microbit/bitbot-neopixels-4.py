# import neopixel

class MicrobitLEDs:

    def __init__(self, led_pin):
        self.neopixels = neopixel.NeoPixel(led_pin, 12)

    def all(self, pixels, colour):
        for i in pixels:
            self.neopixels[i] = colour
        self.neopixels.show()

    def clear(self):
        self.all(range(0, 12), (0, 0, 0))

    def headlights(self, colour = (255, 255, 255)):
        self.clear()
        self.all([5, 11], colour)

    def reversing_lights(self, colour = (127, 127, 127)):
        self.clear()
        self.all([0, 6], colour)

    def brake_lights(self, colour = (127, 0, 0)):
        self.clear()
        self.all([0, 6], colour)

    def left_lights(self, colour):
        self.clear()
        self.all(range(0, 6), colour)

    def right_lights(self, colour):
        self.clear()
        self.all(range(6, 12), colour)

    def sweep_forward(self, colour, delay = 25):

        for i in range(0, 6):
            self.clear()
            self.neopixels[i] = colour
            self.neopixels[i + 6] = colour
            self.neopixels.show()
            sleep(delay)

    def sweep_backward(self, colour, delay = 25):

        for i in range(11, 5, -1):
            self.clear()
            self.neopixels[i] = colour
            self.neopixels[i - 6] = colour
            self.neopixels.show()
            sleep(delay)
