
def BitBot:

    def __init__(self):
        self.left_motor = Motor()
        self.right_motor = Motor()
    
    def circle(self, left_speed, right_speed):
        self.left_motor.forward(left_speed)
        self.right_motor.forward(right_speed)
