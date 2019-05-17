
class BitBot:
    
    def __init__(self):
        self.left_motor = MicrobitMotor(pin0, pin8)
        self.right_motor = MicrobitMotor(pin1, pin12)
        
    def forward(self, percent):
        display.show(Image.ARROW_N)
        self.left_motor.forward(percent)
        self.right_motor.forward(percent)

    def reverse (self, percent):
        display.show(Image.ARROW_S)
        self.left_motor.reverse(percent)
        self.right_motor.reverse(percent)
        
    def cirlce_left (self, percent):
        display.show(Image.ARROW_W)
        self.left_motor.reverse(percent)
        self.right_motor.forward(percent)
        
    def circle_right (self, percent):
        display.show(Image.ARROW_E)
        self.left_motor.forward(percent)
        self.right_motor.reverse(percent)

    def stop(self):
        display.show(Image.HEART)
        self.left_motor.stop()
        self.right_motor.stop()       
