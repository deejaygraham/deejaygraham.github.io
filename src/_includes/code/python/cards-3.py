class Deck(object):

    def cut(self, index):

        if index <= 0 or index > len(self.cards):
            return

        top = []

        for card in range(0, index):
            top.append(self.cards[card])

        bottom = []
        for card in range(index, len(self.cards)):
            bottom.append(self.cards[card])

        self.cards = bottom + top


if __name__ == "__main__":
    deck = Deck()
    print(deck)
    deck.cut(2)
    print(deck)
