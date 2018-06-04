# Presenter microbit, listens for card selection (in case robot breaks down) 
# and is able to trigger robot announcement via button 
from microbit import *
import radio

radio.on()

display.show(Image.SKULL)
sleep(500)

selected_card = ''

while True:
    
    if selected_card:
        display.scroll(selected_card, delay=75)
    
    if button_b.was_pressed():
        radio.send('announce')
        
    message = radio.receive()

    if message:
        if message != 'announce':
            selected_card = message
            display.show(Image.RABBIT)
            sleep(500)
