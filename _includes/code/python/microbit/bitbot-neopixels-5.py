
class BitBot:

    def __init__(self):
        # ...other config here...
        self.leds = MicrobitLEDs(pin13)

    def forward(self, percent = 25):
        self.leds.headlights()
        # ...motor control...

    def reverse (self, percent = 25):
        self.leds.reversing_lights()
        # ...motor control...
        

    def stop(self):
        self.leds.brake_lights()
        # ...motor control...
