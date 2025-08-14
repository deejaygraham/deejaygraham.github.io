---
layout: post
title: Captain Laserbeam
tags: [microbit, python]
---

One of my favourite podcasts for a long time is the [Thrilling Adventure Hour](https://en.wikipedia.org/wiki/Thrilling_Adventure_Hour) and probably 
my favourite episodes are those that feature Captain Laserbeam. The distress call "on a frequency only he can hear", thanks to his laser hearing, 
is a short jingle based on his theme song and something I had as a ringtone for a while. 

{% youtube "Ouk7Ix_JAMw" %}

Here it is as a microbit program so you can call for Captain Laserbeam whenever you are in trouble. 


## Code

```python
from microbit import *
import music

distress_call = [ 
    'D7:2', 
    'D7:2', 
    'C7:2', 
    'C7:2', 
    'B6:1',
    'R:1',
    'B6:1',
    'A6:4',
 ]

while True:
    for _ in range(2):
        music.play(distress_call)

    sleep(1000)
```

