---
permalink: 2017/06/12/hello-pygame/
layout: post
title: Hello, Pygame
published: true
categories: [ code ]
---

Having exhausted everything there is to do with plain old Python, the Raspberry Pi,
BBC micro:bit (ok, maybe not :), one area of Python that the students I see are interested in -
 that I know nothing about - is <a href="https://www.pygame.org/">pygame</a>. So maybe I
 need to do some investigation.

First, download and install as you would expect. I went with the standard windows machine install
as the easiest for me to get going with quickly. Then comes the canonical (or as close
  as we can get) hello world skeleton.

<script src="https://gist.github.com/deejaygraham/923067d0d102011253bf8d61a357ee2f.js"></script>

This doesn't do much but sets us up a nice walking skeleton we can add to later.

![hello](/img/posts/hello-pygame/hello.webp)

A black screen isn't terribly exciting so, let's draw a square:

![block](/img/posts/hello-pygame/blue-block.webp)

<script src="https://gist.github.com/deejaygraham/bbdb250302aa7ab958961fef930cb9e0.js"></script>

Now, how about a bit of interaction? We can read from the keyboard in the message pump,
looking for pygame.KEYDOWN and pygame.K_SPACE.

![block](/img/posts/hello-pygame/orange-block.webp)

<script src="https://gist.github.com/deejaygraham/455e8b4698086000c03c02f50450dd9e.js"></script>

Very interactive but maybe moving the block around might be more what we want. Let's use the
arrow keys to move the block left, right, up and down the screen. Using the key.get_pressed() function
lets us keep a key pressed down rather than having to explicitly push and release each time we
want to move the block.

For good measure we should prevent the coordinates going outside of the screen.

![block](/img/posts/hello-pygame/move-block.webp)

<script src="https://gist.github.com/deejaygraham/df2bbb8c66ab738c3cc7d975d655f6fa.js"></script>

Hooray, now we can change the block colour and move it around using the keyboard. It's a
real game :)

One thing to note is using the Clock tick function to stop the while loop running as
fast as possible on your hardware and bringing it down to speeds suitable for human
interaction.
