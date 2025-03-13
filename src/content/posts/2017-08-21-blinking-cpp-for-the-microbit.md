---
title: Blinking C++
tags: [code, microbit, cpp]
hero: microbit


---

Following hard on the heels of the last post, I decided to try to implement one of the
other canonical examples from the MicroPython world, blinking one of the LEDs on and off
repeatedly.

In MicroPython we would typically create a "forever" while loop and turn on the centre LED,
wait a while, turn it off, wait again and repeat. In C++, that translates pretty faithfully to:

```cpp

#include "MicroBit.h"

MicroBit micro_bit;

int main()
{
  micro_bit.init();

  const int delay_in_milliseconds = 1000;
  const int full_brightness = 255;
  const int zero_brightness = 0;
  
  while(1)
  { 
    micro_bit.display.image.setPixelValue(2, 2, full_brightness);
    micro_bit.sleep(delay_in_milliseconds);
    micro_bit.display.image.setPixelValue(2, 2, zero_brightness);
    micro_bit.sleep(delay_in_milliseconds);
  }
  
  // low power sleep mode.
  release_fiber();
}

```

Again, the way that the objects are built is very anti-Law-of-Demeter but at least keeps
all the components in a sort of logical structure. Changing pixel values is done by chaining
calls through objects: Microbit -> Display -> Image -> SetPixelValue.

The other thing to note is that in MicroPython the values 0..9 are used for LED off
and full brightness. In the C++ version, the values are in the range 0..255.
