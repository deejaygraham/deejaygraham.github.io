---
layout: post
title: Hello, Minecraft
published: true
tags: [ code  ]
---

![mcpi](/img/posts/hello--minecraft/minecraft_pi_edition_header.jpg)

I'm going to be doing some tinkering with Minecraft on the Raspberry Pi. Specifically,
writing some code to script building using the Python interface.

### Get

Minecraft has been installed by default on Raspbian images for a long time, but if
you don't have it installed, you can get it, either by opening a terminal and typing:

~~~

sudo apt-get update
sudo apt-get install minecraft-pi

~~~

or by downloading the <a href="https://s3.amazonaws.com/assets.minecraft.net/pi/minecraft-pi-0.1.1.tar.gz">PI Edition of Minecraft here</a>.
Or by using wget:

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

To start writing scripts against our brave new world, you will need to create a python
source file, say hello.py, like this:

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
