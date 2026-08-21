---
title: Badger Quote of the Day
tags: [python, badger]
---

Following on from the Badger 2040 Hello World example, here is an inspirational quote of the day printed on e-paper. Because this application is a little 
more complicated, I wanted to test and debug a lot of the logic on the desktop using IDLE but of course ran into the immediate problem of not being able to 
instantiate a badger2040 object from the pimoroni library. It means we need a level of indirection between the main application and the device allowing us to swap out an emulated version in the test configuration. I created a hardware implementation using the pimoroni library and a console emulator that can run on the desktop. Running python on the desktop blocks waiting for input so I had to add a dummy function in both implementations to wait for button input before checking what was pressed.

## Buttons.py

The button press ids need to be split out into a separate source file. 

```python
BUTTON_A = "A"
BUTTON_B = "B"
BUTTON_C = "C"
```

Extra right-hand side buttons are not needed at the moment but could be added here later. 

## Hardware Badger.py

The hardware badger implementation is just a thin shim between the main app and the badger library with no real logic except for the mapping for the buttons. 

```python
import badger2040

from buttons import (
    BUTTON_A,
    BUTTON_B,
    BUTTON_C
)


class HardwareBadger:

    def __init__(self):

        self.badger = badger2040.Badger2040()

    def set_pen(self, value):
        self.badger.set_pen(value)

    def clear(self):
        self.badger.clear()

    def text(self, text, x, y, scale):
        self.badger.text(text, x, y, scale)

    def update(self):
        self.badger.update()

    def wait_for_press(self):
        # dummy function to make desktop emulation easier
        pass
    
    def pressed(self, button):

        if button == BUTTON_A:
            return self.badger.pressed(
                badger2040.BUTTON_A
            )

        if button == BUTTON_B:
            return self.badger.pressed(
                badger2040.BUTTON_B
            )

        if button == BUTTON_C:
            return self.badger.pressed(
                badger2040.BUTTON_C
            )

        return False

    @property
    def width(self):
        return badger2040.WIDTH

    @property
    def height(self):
        return badger2040.HEIGHT
```

## Console Badger.py

The emulated console version of the badger gives a bare bones implementation to show a console window with a very rough display that looks 
something like the actual hardware. This seems to give me enough coverage so that I can be pretty sure the application is going to work 
when I copy it across to the real device. 

```python
import os
from buttons import (
    BUTTON_A,
    BUTTON_B,
    BUTTON_C
)

class ConsoleBadger:

    def __init__(self):
        self.width = 296
        self.height = 128

        self.buffer = []
        self.last_key = None

    def set_pen(self, value):
        pass

    def clear(self):
        self.buffer = []

    def text(self, text, x, y, scale):
        self.buffer.append(
            (y, x, text)
        )

    def update(self):

        os.system("cls")

        print("=" * 70)
        print(" BADGER 2040 SIMULATOR ")
        print("=" * 70)

        for y, x, text in sorted(self.buffer):
            print(" " * min(x // 4, 20) + text)

        print()
        print("=" * 70)
        print()
        print("A=Previous B=Random C=Next Q=Quit")

    def wait_for_press(self):
        key = input("> ").strip().upper()
        if key == "A":
            self.last_key = BUTTON_A
        elif key == "B":
            self.last_key = BUTTON_B
        elif key == "C":
            self.last_key = BUTTON_C
        elif key == "Q":
            raise SystemExit
        else:
            self.last_key = None
            
    def pressed(self, button):
        if self.last_key == button:
            self.last_key = None
            return True
        return False
```

## Main.py

The main quotation application which can run either the real badger or the emulated console. 

```python
USE_EMULATOR = True

from buttons import *
import random
import time

if USE_EMULATOR:
    from console_badger import ConsoleBadger
    badger = ConsoleBadger()
else:
    from hardware_badger import HardwareBadger
    badger = HardwareBadger()

try:
    import ujson as json
except ImportError:
    import json


STATE_FILE = "quotes.json"

QUOTES = [
    (
        "The two hardest problems in Computer Science are: Human communication; Getting people in tech to believe that human communication is important",
        "Hazel Weakly"
    ),
    (
        "Programs must be written for people to read, and only incidentally for machines to execute.",
        "Harold Abelson"
    ),
    (
        "First, solve the problem. Then, write the code.",
        "John Johnson"
    ),
    (
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Martin Fowler"
    ),
    (
        "Premature optimisation is the root of all evil.",
        "Donald Knuth"
    ),
    (
        "Deleted code is debugged code.",
        "Jeff Sickel"
    ),
    (
        "Code never lies, comments sometimes do.",
        "Ron Jeffries"
    ),
    (
        "Simplicity is prerequisite for reliability.",
        "Edsger Dijkstra"
    ),
    (
        "Controlling complexity is the essence of computer programming.",
        "Brian Kernighan"
    ),
    (
        "The best code is no code at all.",
        "Jeff Atwood"
    ),
    (
        "Weeks of coding can save you hours of planning.",
        "Unknown"
    ),
    (
        "The most disastrous thing that you can ever learn is your first programming language.",
        "Alan Kay"
    ),
    (
        "Every system is perfectly designed to get the results it gets.",
        "W. Edwards Deming"
    ),
    (
        "Architecture represents the significant design decisions that shape a system.",
        "Grady Booch"
    ),
    (
        "Make it work, make it right, make it fast.",
        "Kent Beck"
    ),
]


def load_state():
    try:
        with open(STATE_FILE, "r") as f:
            return json.load(f)
    except Exception:
        return {
            "quote_index": 0
        }

def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f)

state = load_state()

def wrap_text(text, width):
    words = text.split()

    lines = []
    line = ""

    for word in words:

        candidate = word if not line else line + " " + word

        if len(candidate) <= width:
            line = candidate
        else:
            lines.append(line)
            line = word

    if line:
        lines.append(line)

    return lines


def fit_quote(text):

    scales = [1.4, 1.2, 1.0, 0.8, 0.7, 0.6]

    for scale in scales:

        chars = int(30 / scale)

        lines = wrap_text(text, chars)

        line_height = int(scale * 12) + 3

        total_height = len(lines) * line_height

        if total_height < 70:
            return scale, lines, line_height

    scale = 0.6

    lines = wrap_text(text, 50)

    line_height = int(scale * 12) + 3

    return scale, lines, line_height


def draw_current_quote():
    quote, author = QUOTES[state["quote_index"]]

    badger.set_pen(15)
    badger.clear()

    badger.set_pen(0)

    scale, lines, line_height = fit_quote(quote)

    quote_height = len(lines) * line_height

    start_y = int((90 - quote_height) / 2)

    y = start_y

    for line in lines:

        badger.text(
            line,
            10,
            y,
            scale
        )

        y += line_height

    badger.text(
        author,
        10,
        98,
        0.6
    )

    footer = (
        f"{state['quote_index'] + 1}"
        f"/{len(QUOTES)}"
    )

    badger.text(
        footer,
        240,
        114,
        0.45
    )

    badger.update()


def next_quote():
    state["quote_index"] += 1

    if state["quote_index"] >= len(QUOTES):
        state["quote_index"] = 0

    save_state(state)


def previous_quote():
    state["quote_index"] -= 1

    if state["quote_index"] < 0:
        state["quote_index"] = len(QUOTES) - 1

    save_state(state)


def random_quote():
    state["quote_index"] = random.randint(
        0,
        len(QUOTES) - 1
    )
    save_state(state)


draw_current_quote()

while True:
    changed = False

    badger.wait_for_press()
        
    if badger.pressed(BUTTON_A):
        previous_quote()
        changed = True
    elif badger.pressed(BUTTON_B):
        random_quote()
        changed = True
    elif badger.pressed(BUTTON_C):
        next_quote()
        changed = True

    if changed:
        draw_current_quote()
        time.sleep(0.5)

    time.sleep(0.1)

```
