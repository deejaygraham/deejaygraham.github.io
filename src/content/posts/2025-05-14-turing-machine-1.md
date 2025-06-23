---
layout: post
title: Turing Machine 1
tags: [microbit, python, tdd]
---

We were discussing the [Turing Machine](https://en.wikipedia.org/wiki/Turing_machine) recently and the many implementations of it that could be done in python.  
I had implemented a very quick and dirty version with all the code in one file but it was so quick and so dirty that it was very top of mind and full of bugs. 
With that in mind, I wanted to write a more robust version that can be run on the microbit with some features to help visualize processing on that platform. 

## Tape 

The first part of that, for me, is implementing the tape reading and writing mechanism as described on the above page. The head and the tape need to work as one 
so I implemented a tape reader (which also allows for writing!?!). The head starts in the middle of the tape and can read from the current location, write to 
the current location and move left and right along the tape as the program will eventually demand. 

## Code

### tape-reader.py

```python
class TapeReader:

    def __init__(self, t, head_pos=-1):
        self.tape = t.copy()
        # default to centre
        if head_pos == -1:
            self.head = int(len(self.tape) / 2)
        else:
            self.head = max(0, min(len(self.tape) - 1, head_pos))

    def __str__(self):
        return "".join(self.tape) + "\n" + " " * self.head + "^"

    def __repr__(self):
        return f"TapeReader({self.tape}, {self.head})"

    def load_tape(self, t):
        self.tape = t.copy()
        self.head = int(len(self.tape) / 2)

    def start_at(self, i):
        self.head = max(0, min(len(self.tape) - 1, i))

    def read(self):
        return self.tape[self.head]

    def write(self, symbol):
        self.tape[self.head] = symbol

    def move_left(self):
        self.head -= 1
        # Extend tape on the left
        if self.head < 0:
            self.head = 0
            self.tape.insert(0, " ")

    def move_right(self):
        self.head += 1
        # Extend on right...
        if self.head >= len(self.tape):
            self.tape.append(" ")

    # return n items either side of head
    def spotlight(self, n):
        as_str = "".join(self.tape)

        if self.head == 0:
            return as_str[: n + 1]

        return as_str[self.head - n : self.head + n + 1]
```

One little bit of flare I added later to help in debugging was in the __str__() method which prints the tape as a string but includes a newline and 
a circumflex character to mark where the head is currently pointing.

The final method _spotlight_ is a prediction of a feature I think I will need on the microbit where we can't show anything more than 5 cells of the tape. The 
idea is to show the head spot and 1 or 2 cells either side so that as the head moves, the display appears to scroll left and right.

## Tests 

I added some unit tests which were developed alongside the code and helped to surface some subtle bugs that I maybe would not 
have caught until I did some manual testing on the microbit itself.

### tape-reader-tests.py 

```python
import unittest


class TapeReaderTests(unittest.TestCase):

    def test_str_returns_full_tape_with_head_pointer(self):
        reader = TapeReader(["1", "2", "3", " ", "4"])
        self.assertEqual("123 4\n  ^", str(reader))

    def test_reads_current_head_position(self):
        reader = TapeReader(["a", "b", "c"])
        self.assertEqual("b", reader.read())

    def test_loading_an_odd_length_tape_sets_head_to_centre(self):
        reader = TapeReader([" ", "1", "2"])
        self.assertEqual("1", reader.read())

    def test_loading_an_even_length_tape_sets_head_to_off_centre(self):
        reader = TapeReader([" ", "1", "2", "3"])
        self.assertEqual("2", reader.read())

    def test_head_can_be_relocated_from_start_position(self):
        reader = TapeReader(["1", "2", "3"])
        reader.start_at(2)
        self.assertEqual("3", reader.read())

    def test_setting_head_negative_forced_to_zero(self):
        reader = TapeReader(["1", "2", "3"], -5)
        self.assertEqual("1", reader.read())

    def test_setting_head_beyond_end_of_tape_forces_to_last_index(self):
        reader = TapeReader(["1", "2", "3"], 55)
        self.assertEqual("3", reader.read())

    def test_head_can_be_moved_right(self):
        reader = TapeReader(["1", "2", "3", "4", "5"])
        reader.move_right()
        self.assertEqual("4", reader.read())

    def test_head_can_be_moved_left(self):
        reader = TapeReader(["1", "2", "3", "4", "5"])
        reader.move_left()
        self.assertEqual("2", reader.read())

    def test_reading_off_beginning_of_tape_extends_with_blanks(self):
        reader = TapeReader(["1", "2", "3"])
        self.assertEqual(1, reader.head)
        self.assertEqual(3, len(reader.tape))
        reader.move_left()
        self.assertEqual(0, reader.head)
        reader.move_left()
        self.assertEqual(0, reader.head)
        self.assertEqual(4, len(reader.tape))
        self.assertEqual(" ", reader.read())

    def test_reading_off_end_of_tape_extends_with_blanks(self):
        reader = TapeReader(["1", "2", "3"])
        reader.move_right()
        reader.move_right()
        self.assertEqual(" ", reader.read())

    def test_writing_symbol_can_be_read_back(self):
        reader = TapeReader(["1", "2", "3"])
        reader.write("Q")
        self.assertEqual("Q", reader.read())
        self.assertEqual("1Q3\n ^", str(reader))

    def test_spotlight_shows_n_characters_either_side(self):
        reader = TapeReader(["1", "2", "3", "4", "5"])
        self.assertEqual("234", reader.spotlight(1))

    def test_spotlight_shows_more_characters_either_side(self):
        reader = TapeReader(["0", "1", "2", "3", "4", "5", "6"])
        self.assertEqual("12345", reader.spotlight(2))

    def test_spotlight_towards_left_shows_fewer_characters(self):
        reader = TapeReader(["0", "1", "2", "3", "4", "5", "6"])
        reader.move_left()
        self.assertEqual("01234", reader.spotlight(2))

    def test_at_hard_left_spotlight_shows_characters_from_right(self):
        reader = TapeReader(["1", "2", "3", "4", "5"], 0)
        self.assertEqual("123", reader.spotlight(2))

    def test_spotlight_towards_right_shows_fewer_characters(self):
        reader = TapeReader(["0", "1", "2", "3", "4", "5", "6"])
        reader.move_right()
        reader.move_right()
        self.assertEqual("3456", reader.spotlight(2))

    def test_at_hard_right_spotlight_shows_characters_from_left(self):
        reader = TapeReader(["1", "2", "3", "4", "5"], 4)
        self.assertEqual("345", reader.spotlight(2))


if __name__ == "__main__":
    unittest.main()
```

## Validation

Given that we will probably have a finite number of symbols (an alphabet) we are expecting to read or write to the tape 
we can do some validation on a tape to check that at any point the content of the tape is in an acceptable 
state according to the alphabet we have defined.

### tape-validator.py

```python
class TapeValidator:
    """
    Check state of the tape to make sure all entries are valid
    according to the defined alphabet of symbols allowed.
    """

    def validate(self, tape, alphabet):
        errors = []

        for index, symbol in enumerate(tape):
            if not symbol in alphabet:
                message = (
                    "Invalid symbol at ["
                    + str(index)
                    + "]:"
                    + repr(symbol)
                    + ", expected one of "
                    + repr(alphabet)
                )
                errors.append(message)
                # raise SyntaxError(message)

        return errors
```

Originally I had the first error discovered raise an exception (Syntax Exception) but I decided that it would be more useful to see all the errors 
together rather than trying to fix them one by one.

### tape-validator-tests.py

```python
class TapeValidatorTests(unittest.TestCase):

    def setUp(self):
        self.validator = TapeValidator()

    def test_tape_containing_valid_symbols_validates(self):
        alphabet = ["1", "2", "3", "4", "5", " "]
        self.assertEqual(
            0, len(self.validator.validate(["1", "2", "3", " ", "4"], alphabet))
        )

    def test_tape_containing_one_invalid_symbol_does_not_validate(self):
        alphabet = [
            "1",
            "2",
            "3",
            "4",
            "5",
        ]
        errors = self.validator.validate(["1", "2", "3", " ", "4"], alphabet)
        self.assertEqual(1, len(errors))

    def test_tape_containing_many_invalid_symbols_does_not_validate(self):
        alphabet = [
            "1",
            "2",
            "3",
            "4",
            "5",
        ]
        errors = self.validator.validate(["q", "2", "3_", " ", "4"], alphabet)
        self.assertEqual(3, len(errors))
```

This might seem like overkill but the overall intent is to put this all in place so that someone can load _any_ turing 
machine program onto the microbit and have it check it before trying to run it and give as many helpful messages as possible 
rather than just running and crashing or doing something unexpected but inscrutable in the interface. 
