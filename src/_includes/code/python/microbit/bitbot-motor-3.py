bitbot = BitBot()

move_duration = 3000  # 3 seconds
motor_speed_percent = 50

while True:
    bitbot.forward(motor_speed_percent)
    sleep(move_duration)
    bitbot.circle_right(motor_speed_percent)
    sleep(move_duration)
    bitbot.reverse(motor_speed_percent)
    sleep(move_duration)
    bitbot.circle_left(motor_speed_percent)
    sleep(move_duration)
    bitbot.stop()
    sleep(move_duration)
