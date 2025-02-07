---
permalink: 2022/09/30/improved-ghost-detector/
layout: post
title: Improved Ghost Detector

tags: [code, microbit]
hero: microbit
thumbnail: "/img/thumbnails/microbit-420x255.webp"
alttext: microbit
---

A couple of years ago I created a ghost detector for the microbit as a
demo for the microbit temperature sensor. Now that's it's almost Spooky
season again, I have updated it to make some refinements and to add some
animation to the ghost.

```python

# ghost-detector.py

from microbit import \*

class Ghost:

    def __init__(self):
        self.image = Image.GHOST.copy()
        self.speed = 250

    def fade_out(self, image):
        copy = image.copy()

        for x in range(0, 5):
            for y in range(0, 5):
                value = copy.get_pixel(x, y)

                if value > 0:
                    copy.set_pixel(x, y, value - 1)

        return copy

    def walk_on(self):
        display.clear()

        for i in reversed(range(6)):
            ghost = self.image.shift_left(i)
            display.show(ghost)
            sleep(self.speed)

    def walk_off(self):
        ghost = self.image
        for i in range(5):
            display.show(ghost)
            ghost = self.fade_out(ghost.shift_right(i))
            sleep(self.speed)
        display.clear()

    def show(self):
        display.show(self.image)

    def hide(self):
        display.clear()


class SweepScanner:

def **init**(self):
self.direction = 1
self.x = 2
self.scan_speed = 150

def draw_line(self, brightness):
for y in range(5):
display.set_pixel(self.x, y, brightness)

def scan(self):
self.draw_line(0)

    lhs = 0
    rhs = 4

    if self.x >= rhs or self.x <= lhs:
        self.direction = -self.direction

    self.x = max(lhs, min(rhs, self.x + self.direction))
    self.draw_line(9)
    sleep(self.scan_speed)

class Detector:

def **init**(self):
self.reset() # difference in temperature detectable.
self.sensitivity = 0.5

def room_is_colder(self):
now_temperature = temperature()
temperature_difference = self.starting_temperature - now_temperature
return temperature_difference >= self.sensitivity

def reset(self):
self.starting_temperature = temperature()

ghost_warning_time = 5000

ghost = Ghost()
ghost.walk_on()
sleep(1000)
ghost.walk_off()
sleep(1000)

scanner = SweepScanner()
detector = Detector()

while True:

scanner.scan()

if detector.room_is_colder() or button_b.was_pressed():
ghost.show()
sleep(ghost_warning_time)
ghost.walk_off()
detector.reset()

if button_a.was_pressed():
detector.reset()

```

The most obvious change is that I have added a ghost class
to handle the image manipulation required to animate it "walking"
on and off the screen, and fading out.

I start with the stock ghost image but since that can't be modified,
I have to make a copy of it then use that in the animation sequences to
shift it left so that it is off the screen then by decreasing amounts so
that it appears to be moving onto the screen. Once in the centre, I then
start shifting the image right so that it appears to be moving off the other
side of the screen, and fading away as the pixel brightness decreases.

Other than that, I have moved some variables around to be closer to where they are being used, for example, the sensitivity of the temperature sensor
made sense to live in the detector class rather than in the main body of
the code.
