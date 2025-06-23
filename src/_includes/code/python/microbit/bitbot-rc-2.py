# Bitbot RC
from microbit import *
import radio

# bitbot classes go here...

forward_command = "F"
stop_command = "S"
left_command = "L"
right_command = "R"
reverse_command = "B"
fast_command = "Z"
slow_command = "W"

motor_speed_percent = 50

bitbot = BitBot()

sleep(move_duration)

radio.on()

while True:

    received = radio.receive()

    if received:
        if received == stop_command:
            bitbot.stop()
        elif received == forward_command:
            bitbot.forward(motor_speed_percent)
        elif received == reverse_command:
            bitbot.reverse(motor_speed_percent)
        elif received == left_command:
            bitbot.circle_left(motor_speed_percent)
        elif received == right_command:
            bitbot.circle_right(motor_speed_percent)
        elif received == slow_command:
            motor_speed_percent = max(motor_speed_percent - 25, 0)
        elif received == fast_command:
            motor_speed_percent = min(motor_speed_percent + 25, 100)

    sleep(100)
