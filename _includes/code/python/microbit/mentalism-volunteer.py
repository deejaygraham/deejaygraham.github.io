# Audience volunteer microbit, used to select an 
# electronic playing card at random.

from microbit import *
import random
import radio

cards = [

    ["A", "Ace"],
    ["1", "One"],
    ["2", "Two"],
    ["3", "Three"],
    ["4", "Four"],
    ["5", "Five"],
    ["6", "Six"],
    ["7", "Seven"],
    ["8", "Eight"],
    ["9", "Nine"],
    ["10", "Ten"],
    ["J", "Jack"],
    ["Q", "Queen"],
    ["K", "King"]
]

suits = [

    ["H", "Harts"],
    ["C", "Clubs"],
    ["S", "Spades"],
    ["D", "Die a monds"]
]

display.show(Image.RABBIT)
sleep(500)

radio.on()

selected_card = ''

while True:
    
    if selected_card:
        display.scroll(selected_card)
    
    # pick a card at random
    if button_a.was_pressed():
        card = random.choice(cards) 
        suit = random.choice(suits)
        radio.send(card[1] + ' of ' + suit[1]) # broadcast the selected card.
        selected_card = card[0] + ' of ' + suit[0]
        display.show(Image.RABBIT)
        sleep(500)
    
    if button_b.was_pressed():
        # prompt announcement of "guess"
        radio.send('announce')
