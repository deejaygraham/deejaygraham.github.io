from microbit import *
import radio
import neopixel

class MicrobitMotor:

    def __init__(self, speed_pin, direction_pin):
        self.speed = speed_pin
        self.direction = direction_pin

    def forward(self, percent):
        self.pwm_speed(percent * 10.23, 0)

    def reverse (self, percent):
        self.pwm_speed(1023-(percent * 10.23), 1)

    def stop(self):
        self.pwm_speed(0, 0)

    def pwm_speed(self, analog_speed, digital_direction):
        if 1023 >= analog_speed >= 0:
            self.speed.write_analog(analog_speed)
            self.direction.write_digital(digital_direction)
