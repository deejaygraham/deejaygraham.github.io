
bitbot = BitBot()

while True:

    for x in range(4):
        bitbot.forward(50)
        sleep(1000)
        bitbot.turn_left()
        sleep(200)
