from microbit import *
import radio

all_clues = [
    "Walk Fifteen paces east",
    "Ten paces north",
    "Walk forwards",
    "Look under the seat",
    "Hooray, you win!",
]

clue_count = len(all_clues)
clue = 1

radio.config(power=4)  # power is 0 -> 7
radio.on()

while True:
    # decrease clue number
    if button_a.was_pressed():
        clue = max(clue - 1, 1)
    # increase clue number
    elif button_b.was_pressed():
        clue = min(clue + 1, clue_count)

    # broadcast the current clue
    else:
        clue_text = str(clue) + ":" + all_clues[clue - 1]
        radio.send(clue_text)

    display.show(str(clue))
    sleep(500)
