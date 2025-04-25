---
title: Hello, Pygame
tags: [code]
---

Having exhausted everything there is to do with plain old Python, the Raspberry Pi,
BBC micro:bit (ok, maybe not :), one area of Python that the students I see are interested in -
that I know nothing about - is <a href="https://www.pygame.org/">pygame</a>. So maybe I
need to do some investigation.

First, download and install as you would expect. I went with the standard windows machine install
as the easiest for me to get going with quickly. Then comes the canonical (or as close
as we can get) hello world skeleton.

## Hello World

```python

import pygame

pygame.init()

screen = pygame.display.set_mode((640, 480)) # size must be a (tuple)
pygame.display.set_caption('hello pygame')

done = False

while not done:

    # game interaction goes here
    for event in pygame.event.get():
      if event.type == pygame.QUIT:
        done = True

    # rendering goes here   
    screen.fill((0, 0, 0))

    pygame.display.flip()

```

This doesn't do much but sets us up a nice walking skeleton we can add to later.

![hello](/assets/img/posts/hello-pygame/hello.jpg)

## Square

A black screen isn't terribly exciting so, let's draw a square:

![block](/assets/img/posts/hello-pygame/blue-block.jpg)

```python
import pygame

pygame.init()

game_width = 640
game_height = 480

screen = pygame.display.set_mode((game_width, game_height)) # size must be (tuple)
pygame.display.set_caption('hello pygame')

# colours
black = (0, 0, 0)
blue = (0, 128, 255)

# box properties
box_width = 50
box_height = 50
box_left = 30
box_top = 30
box_colour = blue

done = False

while not done:

    for event in pygame.event.get():
      if event.type == pygame.QUIT:
        done = True

    screen.fill(black)
    pygame.draw.rect(screen, box_colour, pygame.Rect(box_left, box_top, box_width, box_height))

    pygame.display.flip()
```

## Keyboard

Now, how about a bit of interaction? We can read from the keyboard in the message pump,
looking for pygame.KEYDOWN and pygame.K_SPACE.

![block](/assets/img/posts/hello-pygame/orange-block.jpg)

```python
import pygame

pygame.init()

game_width = 640
game_height = 480

screen = pygame.display.set_mode((game_width, game_height)) # size must be (tuple)
pygame.display.set_caption('hello pygame')

# colours
black = (0, 0, 0)
blue = (0, 128, 255)
orange = (255, 100, 0)

# box properties
box_width = 50
box_height = 50
box_left = 30
box_top = 30
box_colour = blue
is_blue = True

done = False

while not done:

    for event in pygame.event.get():
      if event.type == pygame.QUIT:
        done = True
      elif event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
        is_blue = not is_blue

    screen.fill(black)

    if is_blue: box_colour = blue
    else: box_colour = orange

    pygame.draw.rect(screen, box_colour, pygame.Rect(box_left, box_top, box_width, box_height))

    pygame.display.flip()
```

## Arrows

Very interactive but maybe moving the block around might be more what we want. Let's use the
arrow keys to move the block left, right, up and down the screen. Using the key.get_pressed() function
lets us keep a key pressed down rather than having to explicitly push and release each time we
want to move the block.

For good measure we should prevent the coordinates going outside of the screen.

![block](/assets/img/posts/hello-pygame/move-block.jpg)

```python
import pygame

pygame.init()

game_width = 640
game_height = 480

screen = pygame.display.set_mode((game_width, game_height)) # size must be (tuple)
pygame.display.set_caption('hello pygame')

# colours
black = (0, 0, 0)
blue = (0, 128, 255)
orange = (255, 100, 0)

# box properties
box_width = 50
box_height = 50
box_left = 30
box_top = 30
box_colour = blue
is_blue = True

# step size to move around the screen
step_size = 3

clock = pygame.time.Clock()

done = False

while not done:

    for event in pygame.event.get():
      if event.type == pygame.QUIT:
        done = True
      elif event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
        is_blue = not is_blue

    # look at key presses
    pressed = pygame.key.get_pressed()
    if pressed[pygame.K_UP]: box_top -= step_size
    if pressed[pygame.K_DOWN]: box_top += step_size
    if pressed[pygame.K_LEFT]: box_left -= step_size
    if pressed[pygame.K_RIGHT]: box_left += step_size

    # keep the box on the screen
    if box_left < 0: box_left = 0
    if box_top < 0:  box_top = 0
    if box_left + box_width > game_width: box_left = game_width - box_width
    if box_top + box_height > game_height: box_top = game_height - box_height

    screen.fill(black)

    if is_blue: box_colour = blue
    else: box_colour = orange

    pygame.draw.rect(screen, box_colour, pygame.Rect(box_left, box_top, box_width, box_height))

    pygame.display.flip()
    clock.tick(60)
```

Hooray, now we can change the block colour and move it around using the keyboard. It's a
real game :)

One thing to note is using the Clock tick function to stop the while loop running as
fast as possible on your hardware and bringing it down to speeds suitable for human
interaction.
