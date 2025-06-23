def wait_for_contact():
    waiting = True

    while waiting:
        display.set_pixel(2, 2, 9)
        sleep(100)
        msg = radio.receive()

        if msg and msg == "hello":
            radio.send(msg)
            waiting = False
        else:
            display.set_pixel(2, 2, 0)
            sleep(100)


def show_contact_made():
    display.show(Image.HEART)
    sleep(3000)
    display.clear()


bitbot = BitBot()

radio.on()

wait_for_contact()
show_contact_made()
