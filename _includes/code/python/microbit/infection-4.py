class Healthy(Player):
    
    def __init__(self):
        self.face = Image.HAPPY

    def contract_infection(self):
        illness = Illness()
        return Infected() if illness.is_contagious() else self

    def incubate(self):
        if button_a.was_pressed() and button_b.was_pressed():
            return Infected()

        return self
