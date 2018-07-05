# random coin flipper
from microbit import *
import random

while True:

    display.show(Image.NO)
    
    if accelerometer.was_gesture('shake'):
        coin = random.choice(['heads', 'tails'])
        
        if coin == 'heads':
            display.show(Image.SKULL)
        else:
            display.show(Image.SQUARE)
            
