import random

class Deck(object):

    def __init__(self):
        self.cards = []
        for suit in range(len(Card.suit_names)):
            for rank in range(len(Card.rank_names)):
                card = Card(suit, rank)
                self.cards.append(card)

    def __str__(self):
        res = []
        for card in self.cards:
            res.append(str(card))
        return '\n'.join(res)

    def add_card(self, card):
        self.cards.append(card)

    # take card from the deck - default to last.
    def pop_card(self, i=-1):
        return self.cards.pop(i)

    def shuffle(self):
        random.shuffle(self.cards)

    def sort(self):
        self.cards.sort()


if __name__ == '__main__':
    deck = Deck()
    print(deck)
    deck.shuffle()
    print(deck)
