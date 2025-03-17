---
title: Micro Pomodoro
tags: [code, microbit]
hero: microbit


---

The Pomodoro technique is a way of managing your time in discrete chunks interspersed with rests, the idea being that
having a short focussed period of time to work followed by a "reward" is better for you than an unstructured time where
you may (if you are a knowledge worker) forget to stop work and get up to stretch every once in a while, or conversely,
go off on a "quick" mooch on twitter and forget to go back to work!

I wrote this little microbit script to act as a pomodoro, cycling between 25 minutes of work and 5 minutes of rest. During
the work phase, the screen fills up with dots once per minute (handy for the 5x5 screen) then, during the rest phase, fills
up again once every 12 seconds until the screen if full again at the start of the next work phase.

```python

from microbit import \*
import music

def set_all_pixels(brightness):
  for x in range(0, 5):
    for y in range(0, 5):
      display.set_pixel(x, y, brightness)

def set_first_pixel(brightness):
  for x in range(0, 5):
    for y in range(0, 5):
      value = display.get_pixel(x, y)

      if value != brightness:
        display.set_pixel(x, y, brightness)
        return

display.show('pomodoro')

work_phase = True
work_sleep = 60 _ 1000
rest_sleep = 12 _ 1000

while True:

    ticks = 25
    sleep_seconds = work_sleep if work_phase else rest_sleep
    pixel_value = 0 if work_phase else 9

    if work_phase:
        set_all_pixels(9)

    while ticks > 0:
        ticks -= 1
        sleep(sleep_seconds)
        set_first_pixel(pixel_value)

    music.play(music.RINGTONE)
    work_phase = not work_phase

```

A last small feature I added was to play a sound at the end of each phase so that you don't miss
the transition to the new phase of work.
