---
permalink: 2024/10/10/microbit-cpp-hearts/
layout: post
title: Microbit Hearts Animation
published: true
tags: [code, microbit, cpp]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

Following hard on the heels of the last post, I decided to try to implement one of the
other canonical examples from the MicroPython world, blinking one of the LEDs on and off
repeatedly.

In MicroPython we would typically create a "forever" while loop and turn on the centre LED,
wait a while, turn it off, wait again and repeat. In C++, that translates pretty faithfully to:

```cpp
#include "MicroBit.h"

MicroBit    micro_bit;

const uint8_t empty_heart_bitmap[] {
                          0, 1, 0, 1, 0,
                          1, 0, 1, 0, 1,
                          1, 0, 0, 0, 1,
                          0, 1, 0, 1, 0,
                          0, 0, 1, 0, 0, };

const uint8_t full_heart_bitmap[] {
                          0, 1, 0, 1, 0,
                          1, 1, 1, 1, 1,
                          1, 1, 1, 1, 1,
                          0, 1, 1, 1, 0,
                          0, 0, 1, 0, 0, }; 

const uint8_t small_heart_bitmap[] {
                          0, 0, 0, 0, 0,
                          0, 1, 1, 1, 0,
                          0, 1, 1, 1, 0,
                          0, 0, 1, 0, 0,
                          0, 0, 0, 0, 0, };

const int screen_width  = 5;
const int screen_height = 5;

MicroBitImage empty_heart(screen_width, screen_height, empty_heart_bitmap);
MicroBitImage full_heart(screen_width, screen_height, full_heart_bitmap);
MicroBitImage small_heart(screen_width, screen_height, small_heart_bitmap);

int main()
{
    micro_bit.init();

    while(1) 
    {
       micro_bit.display.print(full_heart); 
       micro_bit.sleep(1000);
       micro_bit.display.print(small_heart);
       micro_bit.sleep(1000);
       micro_bit.display.print(empty_heart);
       micro_bit.sleep(1000);
    }
}
```
