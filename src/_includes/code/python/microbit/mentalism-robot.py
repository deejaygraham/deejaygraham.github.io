from microbit import *
import radio
import speech
import random


def say(sentence):
    speech.say(sentence, speed=120, pitch=100, throat=190, mouth=190)


def introduce_trick():
    introduction = [
        "Hello",
        "I am Robot Who Dan, the Magic Robot.",
        "I am now ready to magic",
    ]

    for sentence in introduction:
        say(sentence)
        sleep(1000)


def guess_card(card_name):
    beginning = [
        "I think your card was the, ",
        "Was your card the, ",
        "The card you picked was the, ",
        "abra cad abra",
    ]

    ending = ["was that correct ?", "did I get it right ?", "thank you!"]

    sentence = [random.choice(beginning), card_name, random.choice(ending)]

    for part in sentence:
        say(part)
        sleep(250)


introduce_trick()
radio.on()

card_name = ""

while True:
    sleep(250)
    message = radio.receive()

    if message:
        if message == "announce":
            if card_name:
                guess_card(card_name)
            else:
                say("I do not have a guess yet")
        else:
            card_name = message
