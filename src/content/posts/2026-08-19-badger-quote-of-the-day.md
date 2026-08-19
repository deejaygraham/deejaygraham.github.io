---
title: Badger Quote of the Day
tags: [python, badger]
---

Following on from the Badger 2040 Hello World example, here is an inspirational quote of the day printed on e-paper.


## Quote

```python
import badger2040
import random
import time

try:
    import ujson as json
except ImportError:
    import json


STATE_FILE = "quotes.json"

QUOTES = [
    (
        "Talk is cheap. Show me the code.",
        "Linus Torvalds"
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
        "There are only two hard things in Computer Science: cache invalidation and naming things.",
        "Phil Karlton"
    )
]


badger = badger2040.Badger2040()

WIDTH = badger2040.WIDTH
HEIGHT = badger2040.HEIGHT


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

print("A = Previous")
print("B = Random")
print("C = Next")


while True:
    changed = False

    if badger.pressed(badger2040.BUTTON_A):
        previous_quote()
        changed = True
    elif badger.pressed(badger2040.BUTTON_B):
        random_quote()
        changed = True
    elif badger.pressed(badger2040.BUTTON_C):
        next_quote()
        changed = True

    if changed:
        draw_current_quote()
        time.sleep(0.3)

    time.sleep(0.05)

```
