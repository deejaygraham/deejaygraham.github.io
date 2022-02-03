from microbit import *
import time

# rjust does not exist in micropython
def rjust(text, character, length):
    padding = character * (length - len(text))
    return padding + text

def decimal_to_binary(value, length):
    asBinary = bin(value).replace("0b", "")
    return asBinary #rjust(asBinary, '0', length)

def format_binary_for_screen(str):
    return ':'.join(str[i:i + 5] for i in range(0, len(str), 5))

#reset_value = '11111:11111:11111:11111:11111'
# test
reset_value = '00000:00000:00000:00000:11111'

value = 0
binary = decimal_to_binary(value, 25)
formatted = format_binary_for_screen(binary)

while True:

    binaryAsImage = Image(formatted)
    display.Show(binaryAsImage)
    #print(formatted)

    if formatted == reset_value:
        value = 0
    else:
        value += 1

    binary = decimal_to_binary(value, 25)
    formatted = format_binary_for_screen(binary)

    sleep(1000)

