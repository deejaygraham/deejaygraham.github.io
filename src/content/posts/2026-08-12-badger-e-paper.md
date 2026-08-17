---
title: Badger E-Paper
tags: [python, raspberry-pi]
draft: true
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
[Badger firmware](https://github.com/pimoroni/badger2040/releases).

```python
```


```bash

```

