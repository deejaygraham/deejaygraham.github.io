---
title: Badger E-Paper
tags: [python, badger]
---

I bought a [Badger 2040](https://shop.pimoroni.com/products/badger-2040) e-paper device from [Pimoroni](https://shop.pimoroni.com) years ago
and never did much with it. I rediscovered it recently and so decided to do some more experiments with it using python.

## Unresponsive

First off, because I haven't used it for so long, there seems to be an issue with reactivating the device. The screen shows the last Badger OS e-paper 
icons but the buttons don't do anything and there are no LEDs lit. In this circumstance, the documentation says to force bootloader mode using the **BOOT** and 
**RST** buttons. 

* Disconnect any USB connections
* Hold the **BOOT** button
* Press and release **RST**
* Keep holding **BOOT** for another second
* Release **BOOT**

Plugging in the device again, the computer should recognize a drive called **RPI-RP2**. This means the device is alive and can accept a new update of the 
[Badger firmware](https://github.com/pimoroni/badger2040/releases): download the .uf2 file and drag it onto the device.


## Python

Once that all started working again, it was time to dive into some of the [example projects](https://github.com/pimoroni/badger2040/tree/main/badger_os) written 
for the device in python. The uf2 file contains some badger specific Pimoroni libraries and MicroPython. The best IDE for working with the Badger device is  
[Thonny](https://thonny.org) which has a mode for this device.

The program should be saved as **main.py** on the root of the device but it can load other source and data files as required. To get started again, I made the #
obligatory Hello World program. 


## Hello World

```python
from badger2040 import Badger2040

badger = Badger2040()

badger.set_pen(15)  
badger.clear()

badger.set_pen(0)  
badger.text("Hello World", 10, 30, 1)

badger.update()
```

<img src="/assets/img/posts/badger-e-paper/badger-e-paper.jpg" alt="Badger 2040 device showing hello world" />

More complicated projects are to follow...
