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


# test
# reset_value = "00000:00000:00000:00000:99999"
reset_value = "99999:99999:99999:99999:99999"

value = 0
binary = decimal_to_binary(value, 25)
formatted = format_binary_for_screen(binary)

while True:

    binaryAsImage = Image(formatted)
    display.show(binaryAsImage)
    # print(formatted)

    if formatted == reset_value:
        value = 0
    else:
        value += 1

    binary = decimal_to_binary(value, 25)
    formatted = format_binary_for_screen(binary)

    sleep(1000)
