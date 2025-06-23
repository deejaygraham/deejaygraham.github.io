class Sick(Player):

    def __init__(self):
        self.face = Image.SKULL
        self.timer = 0

    def incubate(self):
        self.timer += 1
        return Dead() if self.timer > 1000 else self
