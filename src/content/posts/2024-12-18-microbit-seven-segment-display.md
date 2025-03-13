---
title: Microbit 7 Segment Display
tags: [code, microbit, python]
---

Not a program of any use this time but a bit of admin code to allow us to display numbers from 0 to 19 
on the 5x5 LED array as if it was a seven-segment display of old - like an early clock radio or something. 

## Code


```python

from microbit import *

zero = Image("00999:00909:00909:00909:00999") 
one = Image("00090:00090:00090:00090:00090") 
two = Image("00999:00009:00999:00900:00999") 
three = Image("00999:00009:00999:00009:00999") 
four = Image("00909:00909:00999:00009:00009") 
five = Image("00999:00900:00999:00009:00999") 
six = Image("00999:00900:00999:00909:00999") 
seven = Image("00999:00009:00009:00009:00009") 
eight = Image("00999:00909:00999:00909:00999") 
nine = Image("00999:00909:00999:00009:00999") 
ten = Image("90999:90909:90909:90909:90999")
eleven = Image("90090:90090:90090:90090:90090")
twelve = Image("90999:90009:90999:90900:90999")
thirteen = Image("90999:90009:90999:90009:90999")
fourteen = Image("90909:90909:90999:90009:90009")
fifteen = Image("90999:90900:90999:90009:90999")
sixteen = Image("90999:90900:90999:90909:90999")
seventeen = Image("90999:90009:90009:90009:90009")
eighteen = Image("90999:90909:90999:90909:90999")
nineteen = Image("90999:90909:90999:90009:90999")

numerals = [zero, one, two, three, four, five, six, seven, eight, nine, ten, 
           eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen]

number = 0

while True:
    # up
    if button_a.was_pressed():
        number = max(0, number - 1)
    # down
    elif button_b.was_pressed():
        number = min(len(numerals) - 1, number + 1)
        
    display.show(numerals[number])
    sleep(500)

```

Each digit or pair of digits is shown continuously on the screen rather than being scrolled across the screen and lost. The while loop is just there 
for demo purposes to allow for changing the selected number.
