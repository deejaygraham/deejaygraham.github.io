class Infected(Player):

    def __init__(self):
        self.face = Image.CONFUSED
        self.timer = 0

    def transmit_infection(self):
        illness = Illness()
        illness.transmit()

    def incubate(self):
        self.timer += 1
        return Sick() if self.timer > 1000 else self
