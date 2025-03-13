---
title: Lightning Calculator for the Microbit
tags: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

Ahead of a maker class I'm teaching in a week or so I've been thinking of what kinds of things are appropriate, easy to understand but complete applications. One I came up with was a lightning calculator. Press one button when you see the lightning, press another button when you hear the thunder. The microbit takes the time difference between the two events and works out an estimate of how far away is the storm.

```python
# Lightning Calculator for microbit
# Press button first time for lightning
# Second time for thunder
# Calculates how far away storm is

from microbit import *

# Wait for a button push and return the time
def wait_for_any_button():
    
    time = 0
    
    while True:
        if button_a.was_pressed() or button_b.was_pressed():
            time = running_time()
            break

        sleep(100)
        
    return time
    
def calculate_distance(speed, time):
    return speed * time
    
speedOfSoundMetresPerSecond = 340

lightning = Image(
            "00990:"
            "09900:"
            "99999:"
            "00990:"
            "09000")
        
ear = Image(
            "09999:"
            "90000:"
            "90009:"
            "90000:"
            "09999")

# calculate continuously
while True:

    flashTime = 0
    thunderTime = 0
    
    # we're waiting for the lightning
    display.show(lightning)
    flashTime = wait_for_any_button()
    
    # now the thunder
    display.show(ear)
    thunderTime = wait_for_any_button()
    
    timeDifference = thunderTime - flashTime
    timeDifferenceInSeconds = timeDifference / 1000
    distanceInMeters = calculate_distance(speedOfSoundMetresPerSecond, timeDifferenceInSeconds)

    if distanceInMeters > 1000:
        display.scroll(str(distanceInMeters / 1000) + " km")
    else:    
        # storm is... metres away
        display.scroll(str(distanceInMeters) + " m")
        
```

I've tried to represent what event the microbit expects by displaying either a lightning flash or a (poorly drawn) ear.
