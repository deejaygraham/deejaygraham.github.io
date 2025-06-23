from microbit import *
import radio


def wait_for_contact():
    hello = "hello"
    waiting = True

    while waiting:
        display.set_pixel(2, 2, 9)
        sleep(100)
        radio.send(hello)

        msg = radio.receive()

        if msg and msg == hello:
            waiting = False
        else:
            display.set_pixel(2, 2, 0)
            sleep(100)


def show_contact_made():
    display.show(Image.HEART)
    sleep(3000)
    display.clear()
