class BitBot:

    def __init__(self):
        self.left_motor = MicrobitMotor(pin0, pin8)
        self.right_motor = MicrobitMotor(pin1, pin12)
        self.leds = MicrobitLEDs(pin13)
        self.direction = 'S'
        self.headlights = False
        self.speed = 50
        
    def faster(self):
        self.speed = min(self.speed + 20, 100)
        
    def slower(self):
        self.speed = max(self.speed - 20, 0)
   
    def forward(self):
        self.direction = 'F'
        self.left_motor.forward(self.speed)
        self.right_motor.forward(self.speed)

    def reverse (self):
        self.direction = 'B'
        self.left_motor.reverse(self.speed)
        self.right_motor.reverse(self.speed)

    def steer_left (self):
        self.direction = 'L'
        self.left_motor.forward(self.speed / 2)
        self.right_motor.forward(self.speed)

    def steer_right (self):
        self.direction = 'R'
        self.left_motor.forward(self.speed)
        self.right_motor.forward(self.speed / 2)

    def stop(self):
        self.direction = 'S'
        self.left_motor.stop()
        self.right_motor.stop()

    def update_lights(self):
        daylight = display.read_light_level() >= 100
        self.leds.headlights(off=daylight)

        if self.direction == 'B':
            self.leds.reversing_lights()
        elif self.direction == 'S':
            self.leds.brake_lights()
        else:
            self.leds.reversing_lights(off=True)

        self.leds.left_blinker(off=self.direction != 'L')
        self.leds.right_blinker(off=self.direction != 'R')
