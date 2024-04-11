
class Deck(object):

    def si_stebbins_order(self):
        self.cards = []

        suits = len(Card.suit_names)
        cards = len(Card.rank_names)

        number = 5
        suit = 1

        for i in range(cards * suits):
            card = Card(suit, number)
            print(card)
            self.cards.append(card)
            suit += 1
            if suit >= suits:
                suit = 0
            number += 3
            if number >= cards:
                number = number - cards


if __name__ == '__main__':
    deck = Deck()
    print(deck)
    deck.si_stebbins_order()
    print(deck)
    deck.cut(2)
    print(deck)
