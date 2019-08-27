class BitBot:

    def __init__(self):
        self.neopixels = neopixel.NeoPixel(pin13, 12)

    def lights(self, pixels, colour):
        for i in pixels:
            self.neopixels[i] = colour
        self.neopixels.show()

    def lights_off(self):
        self.lights(range(0, 12), (0, 0, 0))

    def headlights(self, colour = (255, 255, 255)):
        self.lights_off()
        self.lights([5, 11], colour)

    def reversing_lights(self, colour = (127, 127, 127)):
        self.lights_off()
        self.lights([0, 6], colour)

    def brake_lights(self, colour = (127, 0, 0)):
        self.lights_off()
        self.lights([0, 6], colour)

    def left_lights(self, colour):
        self.lights_off()
        self.lights(range(0, 6), colour)

    def right_lights(self, colour):
        self.lights_off()
        self.lights(range(6, 12), colour)

    def sweep_forward(self, colour, delay = 25):

        for i in range(0, 6):
            self.lights_off()
            self.neopixels[i] = colour
            self.neopixels[i + 6] = colour
            self.neopixels.show()
            sleep(delay)

    def sweep_backward(self, colour, delay = 25):

        for i in range(11, 5, -1):
            self.lights_off()
            self.neopixels[i] = colour
            self.neopixels[i - 6] = colour
            self.neopixels.show()
            sleep(delay)
