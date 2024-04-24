---
permalink: 2016/09/22/unboxing-the-bbc-microbit/
layout: post
title: Unboxing the BBC Micro:bit
tags: [code, microbit]
published: true
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit sorting hat
---

I finally got my hands on a <a href="http://www.microbit.co.uk/">BBC Micro:bit</a> and
have been really impressed with the user experience so far.

![box](/img/posts/unboxing-the-bbc-microbit/micro-bit-box.webp)

![back](/img/posts/unboxing-the-bbc-microbit/micro-bit-box-back.webp)

![back](/img/posts/unboxing-the-bbc-microbit/micro-bit-package.webp)

Plugging it into a laptop, either a PC or a Mac, via a standard USB phone cable
makes it come to life immediately! Download the <a href="http://codewith.mu">mu editor</a> and you are all set up to start experimenting with <a href="http://microbit-micropython.readthedocs.io/en/latest/microbit_micropython_api.html"> MicroPython</a>.

One excellent feature of the mu editor is that you don't need to keep saving your
program before you download it to the micro:bit, it uses the current editor window! I can
see this feature saving beginners a lot of frustration early on.

![back](/img/posts/unboxing-the-bbc-microbit/mu-editor.webp)

Perhaps the easiest thing to do on the micro:bit is to display <a href="http://microbit-micropython.readthedocs.io/en/latest/tutorials/images.html">one of the pre-configured images</a>.

Type this:

```

from microbit import \*

display.show(Image.DUCK)

```

Press the flash button and wait for the yellow light to stop flashing. And behold,
a pixelated duck!

![back](/img/posts/unboxing-the-bbc-microbit/microbit-duck.webp)

In the next post I will run through coding a game in mu for the micro:bit
