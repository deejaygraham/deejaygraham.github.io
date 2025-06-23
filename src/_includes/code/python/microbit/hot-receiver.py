from microbit import *
import radio

radio.on()

while True:
    display.show("?")

    message = radio.receive_full()

    if message:
        signal_strength = message[1]
        percent_strength = ((signal_strength + 255) * 100) / 255
        display.scroll(str(percent_strength))

    sleep(200)
