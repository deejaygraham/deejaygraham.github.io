---
layout: post
title: Microbit Shyness
tags: [microbit, python]
---

A weird little art piece for you. What would it look like if the microbit was extremely sensitive to 
noise and shy about shining it's light from the LED display? At the start, the microbit will gradually 
increase in brightness until the whole display is at maximum. 

The microbit uses the microphone to check for amblient noise in it's vicinity and will react accordingly. 
A quiet noise nearby will cause it to be more cautious and dim it's light. As noise continues, it will 
dampen it's light gradually. A loud noise will scare it and cause it to turn it's light off suddenly. If 
there is no more noise for 10 seconds, then it will gradually turn the LEDs back on. Any noise happening 
within that time will reset the timer. 

## Code

```python
from microbit import *

counter = 0
counter_threshold = 10
confidence = 0
min_brightness = 0
max_brightness = 9

image = Image("00000:" * 5)
microphone.sound_level()

while True:
    image.fill(confidence)
    print(str(image))
    display.show(image)

    events = microphone.get_events()

    if events:
        last_event = events[-1]
        if last_event == SoundEvent.LOUD:
            confidence = min_brightness
            counter = 0
        elif last_event == SoundEvent.QUIET:
            confidence = max(min_brightness, confidence - 1)   
            counter = 0
            
    sleep(1000)
    counter += 1

    if counter > 10:
        confidence = min(confidence + 1, max_brightness)
      
```

