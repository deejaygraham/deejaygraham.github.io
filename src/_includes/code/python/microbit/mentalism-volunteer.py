from microbit import *
import random
import radio

cards = [
    ["A", "Ace"],   ["1", "One"],
    ["2", "Two"],   ["3", "Three"],
    ["4", "Four"],  ["5", "Five"],
    ["6", "Six"],   ["7", "Seven"],
    ["8", "Eight"], ["9", "Nine"],
    ["10", "Ten"],  ["J", "Jack"],
    ["Q", "Queen"], ["K", "King"]
]

suits = [ 
    ["H", "Harts"], ["C", "Clubs"], 
    ["S", "Spades"], ["D", "Die a monds"] 
]

def show_startup_screen():
    display.show(Image.RABBIT)
    sleep(1000)
    display.clear()
    sleep(1000)

def broadcast_selected_card(card, suit):
    # this message will be read aloud, so make sure it is english.
    message = ' '.join([card[1], 'of', suit[1]])
    radio.send(message)

show_startup_screen()
radio.on()

display.scroll('pick a card, any card')
selected_card = ''

while True:
    if selected_card:
        display.scroll(selected_card)

    # pick a card at random
    if button_a.was_pressed():
        card = random.choice(cards)
        suit = random.choice(suits)
        broadcast_selected_card(card, suit)
        selected_card = card[0] + ' of ' + suit[0]

    # prompt robot to announce the "guess"
    if button_b.was_pressed():
        radio.send('announce')
