---
layout: post
title: Keep Alive
tags: [python]
---

A horrible, non-green-energy hack script to keep a win32 machine alive and keep the screensaver or hibernator at bay. This might be for several reasons but for me, this was to allow me to keep a long running
network test going without the OS intervening when it thinks there is no human sitting in front of it. The test took a number of hours to gather data so this was the hackiest, simplest way I could come up with. 


## Code

### keep-alive.py

```python

import keyboard, time, sys


def keep_alive():

    keypress = "f15"  # key pressed causing keep alive
    press_every_n_minutes = 1  # once per minute
    sleep_time = press_every_n_minutes * 60

    thumb_emoji = "\U0001F44D"
    computer_emoji = "\U0001F5A5\U0000FE0F"
    print(f"Keeping {computer_emoji} awake using {keypress} every {sleep_time} seconds")

    while True:
        try:
            keyboard.press_and_release(keypress)
            print(f"Button {keypress} was pressed at {current_time()}")
            time.sleep(sleep_time)

        except KeyboardInterrupt:
            # quit
            print("Done.")
            sys.exit()


def current_time():
    local_time = time.localtime()
    return time.strftime("%H:%M:%S", local_time)


if __name__ == "__main__":
    keep_alive()

```

This could be adapted to work on linux or macos fairly easily but, as I said, this was just for me to run on one machine so I've not investigated the system calls for keyboard, system etc. that might 
need the code to handle that variation.
