# Mentalist Robot microbit, listens for 
# radio messages from volunteer for selected card 
# and messages to announce the card using speech synth.
from microbit import *
import radio 
import speech
import random 

use_io = False
use_voice = True 

def open_eyes():
    if use_io:
        pin1.write_digital(1)
        pin2.write_digital(1)

def close_eyes():
    if use_io:
        pin1.write_digital(0)
        pin2.write_digital(0)
  
def say(sentence):    
    open_eyes()
    if use_voice:
        speech.say(sentence, speed=120, pitch=100, throat=190, mouth=190)
    else:
        display.scroll(sentence, delay=75)
    close_eyes()
 
display.show(Image.RABBIT)
sleep(500)
display.clear()

sleep(1000)

introduction = [
'Hello',
'I am Robot Who Dan',
'The Magic Robot',
'I am now ready to magic'
]

for sentence in introduction:
    say(sentence)
    sleep(1000)

radio.on()

before_each_guess = [
'I think your card was the, ',
'Was your card the, ',
'The card you picked was the, ',
'abra cad abra'
]

after_each_guess = [
'was that correct ?',
'did I get it right ?',
'magic is cool !',
'robot derren brown wins again'
]

guess = ''

while True:

    message = radio.receive()
    
    if message:
        if message == 'announce':
            if guess:
                say(random.choice(before_each_guess))
                sleep(200)
                say(guess)
                sleep(2000)
                say(random.choice(after_each_guess)) 
            else:
                say('I do not have a guess yet')
        else:
            guess = message 
    
    sleep(200)
    