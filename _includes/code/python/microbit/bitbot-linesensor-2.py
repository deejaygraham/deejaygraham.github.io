
class BitBot:
    
    def __init__(self, sense_pin):
        # ...other stuff...
        self.line_sensors = LineSensors(pin11, pin5)
    
    def autonomous_mode(self):
        
        motor_speed_fast = 20
        motor_speed_slow = 10

        while True:
            direction = self.line_sensors.read_position()

            if direction == 0: # straddling_line
                self.forward(motor_speed_fast)
            elif direction < 0: # too far left
                self.circle_right(motor_speed_slow)
                sleep(250)
                self.stop()
            elif direction > 0: # too far right
                self.circle_left(motor_speed_slow)
                sleep(250)
                self.stop()

            sleep(100)
