while True:

    bitbot.update_lights()
    sleep(100)

    msg = radio.receive()

    if msg:
        if msg == "S":
            bitbot.stop()
        elif msg == "F":
            bitbot.forward()
        elif msg == "B":
            bitbot.reverse()
        elif msg == "L":
            bitbot.steer_left()
        elif msg == "R":
            bitbot.steer_right()
        elif msg == "W":
            bitbot.slower()
        elif msg == "Z":
            bitbot.faster()
