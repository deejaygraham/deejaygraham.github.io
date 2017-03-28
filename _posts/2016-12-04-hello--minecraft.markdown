---
layout: post
title: Hello, Minecraft
published: true
tags: [ code  ]
---

I'm going to be doing some tinkering with Minecraft on the Raspberry Pi. Specifically,
writing some code to do some building using the Python interface.

![boot](/img/posts/hello--minecraft/boot-sequence.jpg)


### For Older Installations...

Minecraft has been installed by default on Raspbian images for a long time, and more recent
Raspbian images have the API installed by default so that you can write and run your scripts
from anywhere. If you have an older image without the API, you can get it either by opening
a terminal and typing:

~~~

sudo apt-get update
sudo apt-get install minecraft-pi

~~~

or by downloading the <a href="https://s3.amazonaws.com/assets.minecraft.net/pi/minecraft-pi-0.1.1.tar.gz">PI
Edition of Minecraft here</a> using the Pi web browser. Or you can use wget from the console:

~~~

wget https://s3.amazonaws.com/assets.minecraft.net/pi/minecraft-pi-0.1.1.tar.gz

~~~

Once it's downloaded, you can move it to a convenient folder, open a terminal window and
expand the file using:

~~~

tar -zxvf minecraft-pi-0.1.1.tar.gz

~~~

This will create an *mcpi* (minecraft pi) sub-folder. If you cd into this folder you can
start a minecraft session by typing:

~~~

./minecraft-pi

~~~

Newer Pi images have a desktop shortcut or menu item so you can start Minecraft directly
from the UI.


### Navigation

Navigating in minecraft isn't totally obvious. Here are the default keybindings:

Command | Action
------- | ------
**W** | Move forward
**A** | Move left
**S** | Move backwards
**D** | Move right
**E** | Show block inventory
**ESC** | Pause/Menu
**1-8** | Select items in the quick-bar
**Left Click** | Destroy block
**Right Click** | Place block
**Space bar** | Jump


### Python

To start writing scripts against our brave new world, you will need to create a
new folder to store your python scripts. For ease, we can copy the contents of the
mcpi folder into the new code folder. If you have a more recent version of Raspbian,
you can run a script from any folder and it will work.

~~~

cp -r ~/mcpi/api/python/* .

~~~

Once that's done, we are ready to start programming in Minecraft. First you will need
to create a new python source file, say hello.py, like this:

~~~

from mcpi.minecraft import Minecraft

world = Minecraft.create()

world.postToChat("Hello minecraft")

~~~

To run it, open another terminal window (Minecraft is running from the original) and
type:

~~~

python hello.py

~~~
