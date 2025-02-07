---
permalink: 2024/08/01/eddystone-beacon-cpp-microbit/
layout: post
title: Microbit Eddystone Beacon

tags: [code, microbit, cpp]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

Most of the work I have done with the microbit radio has been in python, including some of the games with transmitting and receiving "beacons". 
In the v1 days of microbit, the python environment on the device was too large to allow bluetooth to be enabled with the amount of memory available to it. 
I was giving a talk on the microbit, c++, and using the platform for bluetooth integrations so I experimented with 
a PoC of an <a href="https://github.com/google/eddystone">Eddystone Beacon</a>.

Here is that test code:

```cpp
#include "MicroBit.h"

MicroBit micro_bit;

int main()
{
    micro_bit.init();

    micro_bit.messageBus.listen(MICROBIT_ID_BUTTON_A, MICROBIT_BUTTON_EVT_CLICK, button_a);
    micro_bit.messageBus.listen(MICROBIT_ID_BUTTON_B, MICROBIT_BUTTON_EVT_CLICK, button_b);

    // micro_bit.display.scroll("ON");

    beacon_on();
    
    release_fiber();
}

uint8_t running = 0;

void button_a(MicroBitEvent)
{
  if (!running)
  {
    beacon_on();
    running = 1;
  }
}

void button_b(MicroBitEvent)
{
  if (running)
  {
    beacon_off();
    running = 0;
  }
}

void beacon_on() 
{
  const char shortened_url[] = "https://goo.gl/TlUTF7";
  const int8_t CALIBRATED_POWERS[] = {-49, -37, -33, -28, -25, -20, -15, -10};
  uint8_t tx_power_level = 6;
  
  micro_bit.bleManager.advertiseEddystoneUrl(shortened_url, CALIBRATED_POWERS[tx_power_level-1], false);
  micro_bit.bleManager.setTransmitPower(tx_power_level);
}

void beacon_off() 
{
  micro_bit.bleManager.stopAdvertising();
}

```
