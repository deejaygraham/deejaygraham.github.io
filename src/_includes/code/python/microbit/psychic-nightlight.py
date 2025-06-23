from microbit import *
import radio

radio.on()

while True:

    sleep(250)
    message = radio.receive()

    if message:
        if message == "on":
            display.show(Image("99999:" * 5))
        else:
            display.clear()
