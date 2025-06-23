class Illness:

    def __init__(self):
        self.dna = "virus"

    def transmit(self):
        radio.send(self.dna)

    def is_contagious(self):

        packet = radio.receive_full()

        if packet:
            text = message[0]
            signal_strength = message[1]

            # random chance?
            # signal strength ?
            return text == self.dna

        return False
