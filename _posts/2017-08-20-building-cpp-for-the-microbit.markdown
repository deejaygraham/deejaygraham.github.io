---
layout: post
title: Building C++ for the BBC Micro:bit
published: true
tags: [ code, microbit ]
---

In the last 12-18 months of coding for the BBC micro:bit I tended to shy away from the
block-based, Scratch-like environments and have always used what I thought of as the most
developer-y option - MicroPython. This worked very well for teaching but I began to
notice a few of the features available in the platform were not available through the
MicroPython libraries, most notably Bluetooth. The reason given is that the micro:bit
has 16k of RAM but the Bluetooh LE stack would use up 12k of that, leaving no room
to load MicroPython.

A thing that gets missed (or glossed over) in a lot of discussions about the micro:bit
is that it is an ARM-based machine and therefore a traditional language for low
level systems programming like C (and C++) should be an appropriate alternative. Luckily,
the [mbed compiler](https://developer.mbed.org/platforms/Microbit/) is an online
C/C++ development environment which is free to use and officially  
supports the BBC micro:bit as a platform.  

![mbed site](/img/posts/building-cpp-for-the-microbit/mbed-website.png))

To get started:

* [Create an account](https://developer.mbed.org/account/signup) on mbed.
* Add the [microbit as a target](https://developer.mbed.org/platforms/Microbit/) to your
mbed compiler.
* Open the [compiler](https://developer.mbed.org/compiler/)
* Notice that micro:bit is selected in the top right hand corner.

![compiler](/img/posts/building-cpp-for-the-microbit/mbed-compiler.png)

Once that's up an running, it's time to hello a world. In the Workspace Management area,
pick the create new program option and fill in the details in the popup.

![new project](/img/posts/building-cpp-for-the-microbit/create-new-program.png)

* Confirm the platform is BBC micro:bit
* Select a suitable template
* Name the program
* Click OK
* Wait a few seconds while the project is created.

You should now see something that will be familiar to most users of IDEs with project
contents down the left hand side, current program source in the middle and an area
for compiler results at the bottom.

![new project](/img/posts/building-cpp-for-the-microbit/new-project.png)

The generated main function looks like this...

![hello world](/img/posts/building-cpp-for-the-microbit/hello-world.png)

The top row of buttons in the IDE has a Compile button. Press that to start building the
project.

![compiling](/img/posts/building-cpp-for-the-microbit/compiling.png)

Assuming there are no problems, a .hex file will be created and downloaded by the browser. For a
project called "microbit-hello-world" the hex file will be something like "microbit-hello-world_NRF51_MICROBIT.hex"
and in my case was 417kb in size.

If you have a micro:bit connected to a USB port, you should be able to drag the .hex file  
onto the micro:bit, wait a few seconds for the copy to finish and the program should start running.

At the time of writing, the simplest hello world application displayed a few warnings in the
compiler output.

![compiler output](/img/posts/building-cpp-for-the-microbit/compiler-output.png)
