---
layout: post
title: Screenshot
tags: [microbit, python]
---

It seems weird to me that for all of the Image and display functions available, there is no facility to take a 
"screenshot" of the microbit's display - either for debugging or to capture and manipulate before writing 
back to the screen.

With that in mind, here's a tiny function to take a screenshot of the display and returns a formatted string
ready to be printed or used as an Image object.

## Code

```python
from microbit import *

def screenshot():
  screen = ""

  for y in range(5):
    for x in range(5):
        intensity = display.get_pixel(x, y)
        screen += str(intensity)
    screen += ':' # row delimiter

  return screen


display.show(Image.HEART)
print(screenshot())
```

We can quickly modify the screen content by doing something like this - show an image on the 
display, take a screenshot, turn on the top left pixel of the image then write it back to the 
display.

```python
from microbit import *

h = Image(screenshot())
h.set_pixel(0, 0, 9)
display.show(h)
```
