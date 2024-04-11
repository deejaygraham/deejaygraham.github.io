import time

def rjust(text, character, length):
    padding = character * (length - len(text))
    return padding + text

def decimal_to_binary(decimal, length):
    binary = bin(decimal).replace("0b", "")
    return rjust(binary, '0', length)

def format_binary_for_screen(binary):
    return ':'.join(binary[i:i + 5] for i in range(0, len(binary), 5))

#reset_value = '11111:11111:11111:11111:11111'
# for test
reset_value = '00000:' * 3 + '11111:11111'

value = 0
binary = decimal_to_binary(value, 25)
formatted = format_binary_for_screen(binary)

while True:

    print(formatted)

    if formatted == reset_value:
        value = 0
    else:
        value += 1

    binary = decimal_to_binary(value, 25)
    formatted = format_binary_for_screen(binary)

    time.sleep(1)
