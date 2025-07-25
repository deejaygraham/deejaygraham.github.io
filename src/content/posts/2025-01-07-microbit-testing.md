---
layout: post
title: Simple Microbit Testing
tags: [tdd, code, microbit, python]
---

As developers we all know the importance of testing our code. That doesn't always 
have to be super-strict TDD style but it comes as  something of a disappointment 
when you are using a platform that does not have some kind of test support - at least not that I am aware of. 


## Print

Normally in these sorts of situations we fall back on old school methods like adding print statements to our code to show where and what code is executing, 
what value a variable has etc. This has been the case for me when writing my 
little programs for the microbit. Some of the more involved or elaborate programs, 
or those that required several devices to work together are the biggest pains, 
particularly since there's a cycle of debugging which feels very inefficient. This typically goes like: flash the code, enable REPL, restart the app, examine the 
printed output, work out what's going wrong, turn off REPL, change the code, re-flash and on and on. 


## Assert 

So, this has made me want to have a test framework for the microbit. Micropython does have support for "assert" but it looks like it is 
[turned off in the default settings](https://microbit-micropython.readthedocs.io/en/stable/micropython.html) and I didn't want to mess around with that. There 
is also a block available as an assert in [Microsoft's Make Code](https://makecode.microbit.org/reference/control/assert) but that only applies to the 
block mode of programming. What I wanted was a simple library, maybe even simpler than [assertpy](https://github.com/assertpy/assertpy), that could be 
included in a program or even just some code that could be pasted at the top of a program to let us make some assertions about the code we want to write. 

I have moved this code into it's own repository on github as [Simple Microbit Assert](https://github.com/deejaygraham/simple-microbit-assert).


## Failure

Making an assertion seemed easy enough but I wasn't familiar with how the microbit 
reports errors to the user. Nearly everyone who uses the microbit has seen the 
sad face and the syntax error message that follows it and I wanted to replicate 
somethingn like that that would stop the rest of the program executing when an 
assertion fails. 

Looking at the excellent documentation for the microbit, the [panic function](https://microbit-micropython.readthedocs.io/en/v2-docs/microbit.html#microbit.panic) looked 
like a good candidate and they even 
document [the error codes](https://support.microbit.org/support/solutions/articles/19000016969-micro-bit-error-codes) that they support. 

Calling panic does indeed stop the microbit but felt it was a little dishonest using that as a trigger for an assertion failure when most of the errors are 
actually around thinks like the microbit running out of memory or having an actual hardware error.

## Exception

In the c# world, probably what you would do would be to throw an Exception object with a description of the problem. Python has a raise keyword so I thought 
that that might do enough of what we wanted without training to pretend the microbit was about to blow up. Sure enough, raising an Exception object in Python does 
what we want (mostly) it shows the sad face, scrolls the exception message across the screen and halts further processing of the program. 


## Code

The assertion code could be cut and pasted into the top of a program temporarily to allow 
for checking or it could be imported and the assert.py file copied onto the microbit
after flashing the program.

### micro-assert.py

```python
from microbit import display, Image


def micro_assert(value, message=None):
    if not value:
        if message is None:
            message = "Assertion failed"
        raise Exception(message)


def micro_assert_true(value, message=None):
    if message is None:
        message = "Expected: {}, actual: {}".format(True, value)
    micro_assert(value, message)


def micro_assert_false(value, message=None):
    if message is None:
        message = "Expected: {}, actual: {}".format(False, value)
    micro_assert(not value, message)


def micro_assert_equal(expected, actual, message=None):
    if message is None:
        message = "Expected: {}, actual: {}".format(expected, actual)
    micro_assert(expected == actual, message)


def micro_assert_empty(items, message=None):
    expected = 0
    actual = len(items)
    if message is None:
        message = "List expected: {} items, actual: {}".format(expected, actual)
    micro_assert(expected == actual, message)


def micro_assert_fail(message):
    raise Exception(message)


def micro_assert_image_equal(expected, actual):
    expected_width = expected.width()
    actual_width = actual.width()
    message = "Image width: expected: {}, actual: {}".format(
        expected_width, actual_width
    )
    micro_assert_equal(expected_width, actual_width, message)

    expected_height = expected.height()
    actual_height = actual.height()
    message = "Image height: expected: {}, actual: {}".format(
        expected_height, actual_height
    )
    micro_assert_equal(expected_height, actual_height, message)

    for x in range(expected_width):
        for y in range(actual_height):
            expected_pixel = expected.get_pixel(x, y)
            actual_pixel = actual.get_pixel(x, y)
            message = "Image {}, {}: expected: {}, actual: {}".format(
                x, y, expected_pixel, actual_pixel
            )
            micro_assert_equal(expected_pixel, actual_pixel, message)


def micro_assert_display_equal(expected):
    for x in range(5):
        for y in range(5):
            expected_pixel = expected.get_pixel(x, y)
            actual_pixel = display.get_pixel(x, y)
            message = "Display {}, {}: expected: {}, actual: {}".format(
                x, y, expected_pixel, actual_pixel
            )
            micro_assert_equal(expected_pixel, actual_pixel, message)
```

### Main.py

```python

from micro-assert import *

micro_assert(1 == 2, "Maths!")
micro_assert_display_equal(Image("00000:00000:00000:00000:00000"))

```

## Improvements

One unfortunate thing that I have not looked too deeply into is that the 
exception points to the line of code in the assert when the exception is 
raised i.e. in the assert code, rather than the location where the assert 
was called. I know standard python has traceback to allow access to the callstack
but I don't think this is available for micropython. Some experimentation is 
needed here. 

I have put some time into trying to compensate for this by 
making the error messages as good as they can be. If I come up with a solution, I will document this later. For now, I have added some simple assertions: true, 
false, equal; and a couple of microbit specific ones 
for image comparison and display checking. I will fill this out as I find a need to.
