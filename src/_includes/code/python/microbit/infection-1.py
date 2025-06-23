from microbit import *
import radio

radio.config(power=0)  # low power ~ 1 meter distance
radio.on()


class Player:

    def transmit_infection(self):
        pass

    def contract_infection(self):
        return self

    def incubate(self):
        return self

    def done(self):
        return False


player = Player()

while not player.done():

    player.transmit_infection()
    player = player.contract_infection()
    player = player.incubate()

    display.show(player.face)
    sleep(100)
