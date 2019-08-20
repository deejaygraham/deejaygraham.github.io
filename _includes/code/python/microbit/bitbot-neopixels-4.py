class BitBot:

    def __init__(self):
        self.neopixels = neopixel.NeoPixel(pin13, 12)

# list comprehension?
# [5, 11]
    def lights(self, colour):
        for i in range(0, len(self.neopixels)):
            self.neopixels[i] = colour
        self.neopixels.show()

    def lights_off(self):
        self.lights((0, 0, 0))

    def headlights(self, colour = (255, 255, 255)):
        self.lights_off()

        self.neopixels[5] = colour
        self.neopixels[11] = colour
        self.neopixels.show()

    def reversing_lights(self, colour = (127, 127, 127)):
        self.lights_off()

        self.neopixels[0] = colour
        self.neopixels[6] = colour
        self.neopixels.show()

    def brake_lights(self, colour = (127, 0, 0)):
        self.lights_off()

        self.neopixels[0] = colour
        self.neopixels[6] = colour
        self.neopixels.show()

    def left_lights(self, colour):
        self.lights_off()

        for i in range(0, 6):
            self.neopixels[i] = colour
        self.neopixels.show()

    def right_lights(self, colour):
        self.lights_off()

        for i in range(6, 12):
            self.neopixels[i] = colour
        self.neopixels.show()

    def lights_forward(self, colour, delay = 50):
        self.lights_off()

        for i in range(0, 6):
            self.neopixels[i] = colour
            self.neopixels[i + 6] = colour
            self.neopixels.show()
            sleep(delay)

    def lights_backward(self, colour, delay = 50):
        self.lights_off()

        for i in range(11, 5, -1):
            self.neopixels[i] = colour
            self.neopixels[i - 6] = colour
            self.neopixels.show()
            sleep(delay)
