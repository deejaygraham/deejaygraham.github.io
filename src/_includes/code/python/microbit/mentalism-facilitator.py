from microbit import *
import radio

radio.on()

selected_card = ""

while True:
    sleep(250)
    message = radio.receive()

    if message and message != "announce":
        selected_card = message

    if selected_card:
        display.scroll(selected_card, delay=75)

    if button_b.was_pressed():
        radio.send("announce")
