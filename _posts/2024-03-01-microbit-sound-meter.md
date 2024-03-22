

```python

from microbit import *

def map_value(value, fromMin, fromMax, toMin, toMax):
    scaledValue = float(value - fromMin) / float(fromMax - fromMin)
    return toMin + (scaledValue * (toMax - toMin))

very_loud = Image("99999:99999:99999:99999:99999")
loud = Image("00900:09990:99999:99999:99999")
moderate = Image("00000:00900:09990:99999:99999")
soft = Image("00000:00000:00900:09990:99999")
very_quiet = Image("00000:00000:00000:00900:99999")
silence = Image("00000:00000:00000:00000:00900")

sound_meter = [silence, very_quiet, soft, moderate, loud, very_loud]

microphone.sound_level() # discard
sleep(200)

while True:
    soundLevel = int(map_value(microphone.sound_level(), 0, 255, 0, 5))
    display.show(sound_meter[soundLevel])

```
