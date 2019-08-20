from microbit import *

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

    def full_speed(self, digital_direction):
        self.speed.write_digital(1 if digital_direction == 0 else 0)
        self.direction.write_digital(digital_direction)

    def pwm_speed(self, analog_speed, digital_direction):
        if 1023 >= analog_speed >= 0:
            self.speed.write_analog(analog_speed)
            self.direction.write_digital(digital_direction)
