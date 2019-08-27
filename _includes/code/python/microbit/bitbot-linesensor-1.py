
class LineSensor:
    
    def __init__(self, sense_pin):
        self.pin = sense_pin
        
    def read(self):
        return self.pin.read_digital()

class LineSensors:

    def __init__(self, left_pin, right_pin):
        self.left_sensor = LineSensor(left_pin)
        self.right_sensor = LineSensor(right_pin)

    # return value depending on orientation:
    # -1 for left 
    #  0 for straight
    # +1 for right
    def read_position(self):

        too_far_left = -1
        straddling_line = 0
        too_far_right = 1

        left = self.left_sensor.read()
        right = self.right_sensor.read()

        no_line = 0
        line_detected = 1

        if left == no_line and right == line_detected:
            return too_far_left
        elif left == line_detected and right == no_line:
            return too_far_right

        return straddling_line
