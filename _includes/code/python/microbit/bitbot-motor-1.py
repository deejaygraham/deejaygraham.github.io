from microbit import *

class MicrobitMotor:

    def __init__(self, speed_pin, direction_pin):
        self.speed = speed_pin
        self.direction = direction_pin

    def forward(self, percent):
        speed = percent * 10.23
        self.speed.write_analog(speed)
        self.direction.write_digital(0)
    
    def reverse (self, percent):
        speed = percent * 10.23
        self.speed.write_analog(1023-speed)
        self.direction.write_digital(1)

    def stop(self):
        self.speed.write_analog(0)
        self.direction.write_digital(0)
