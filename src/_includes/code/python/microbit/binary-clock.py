from microbit import *


# rjust does not exist in micropython
def rjust(text, character, length):
    padding = character * (length - len(text))
    return padding + text


def decimal_to_binary(decimal, length):
    binary = bin(decimal).replace("0b", "")
    return rjust(binary, "0", length)


def format_binary_for_screen(binary):
    formatted = ":".join(binary[i : i + 5] for i in range(0, len(binary), 5))
    return formatted.replace("1", "9")


bits = 25
minimum_bits = 2
maximum_bits = 25

ticks = 0
tick_frequency = 500

while True:
    binary = decimal_to_binary(ticks, maximum_bits)
    formatted = format_binary_for_screen(binary)

    binaryAsImage = Image(formatted)
    display.show(binaryAsImage)
    print(formatted)

    sleep(tick_frequency)

    ticks += 1
    if ticks >= (2**bits):
        ticks = 0

    if accelerometer.was_gesture("shake"):
        ticks = 0

    if button_a.was_pressed():
        bits = max(minimum_bits, bits - 1)
        display.scroll(str(bits))
        ticks = 0

    if button_b.was_pressed():
        bits = min(bits + 1, maximum_bits)
        display.scroll(str(bits))
        ticks = 0
