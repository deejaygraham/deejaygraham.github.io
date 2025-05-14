---
layout: post
title: Turing Machine 1
tags: [microbit, python, tdd]
---

We were discussing the [Turing Machine](https://en.wikipedia.org/wiki/Turing_machine) recently and the many implementations of it that could be done in python.  
I had implemented a very quick and dirty version with all the code in one file but it was so quick and so dirty that it was very top of mind and full of bugs. 
With that in mind, I wanted to write a more robust version that can be run on the microbit with some features to help visualize processing on that platform. 
The first part of that, for me, is implementing the tape reading and writing mechanism as described on the above page. The head and the tape need to work as one 
so I implemented a tape reader (which also allows for writing). The head starts in the middle of the tape and can read from the current location, write to 
the current location and move left and right along the tape as the program will eventually demand. 

## Code

### tape-reader.py

```python
class TapeReader():
    
    def __init__(self):
        self.tape = []
        self.head = -1

    def __str__(self):
        return ''.join(self.tape)
            
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
            self.tape.insert(0, ' ')  
            
    def move_right(self):
        self.head += 1
        # Extend on right...
        if self.head >= len(self.tape):
            self.tape.append(' ') 

    # return n items either side of head
    def spotlight(self, n):
        as_str = ''.join(self.tape)

        if self.head == 0:
          return as_str[:n + 1]

        return as_str[self.head - n: self.head + n + 1]

```

## Tests 

I added some unit tests which were developed alongside the code and helped to surface some subtle bugs that I maybe would not 
have caught until I did some manual testing on the microbit itself.

### tape-reader-tests.py 

```python
import unittest

class TapeReaderTests(unittest.TestCase):
    
    def setUp(self):
        self.reader = TapeReader()

    def test_str_returns_full_tape_data(self):
        self.reader.load_tape(['1', '2', '3', ' ', '4'])
        self.assertEqual('123 4', str(self.reader))

    def test_reads_current_head_position(self):
        self.reader.load_tape(['a', 'b', 'c'])
        self.assertEqual('b', self.reader.read())

    def test_loading_an_odd_length_tape_sets_head_to_centre(self):
        self.reader.load_tape([' ', '1', '2'])
        self.assertEqual('1', self.reader.read())

    def test_loading_an_even_length_tape_sets_head_to_off_centre(self):
        self.reader.load_tape([' ', '1', '2', '3'])
        self.assertEqual('2', self.reader.read())

    def test_head_can_be_relocated_from_start_position(self):
        self.reader.load_tape(['1', '2', '3'])
        self.reader.start_at(2)
        self.assertEqual('3', self.reader.read())

    def test_setting_head_negative_forced_to_start(self):
        self.reader.load_tape(['1', '2', '3'])
        self.reader.start_at(-5)
        self.assertEqual('1', self.reader.read())

    def test_setting_head_beyond_end_of_tape_forces_to_last_index(self):
        self.reader.load_tape(['1', '2', '3'])
        self.reader.start_at(55)
        self.assertEqual('3', self.reader.read())

    def test_head_can_be_moved_right(self):
        self.reader.load_tape(['1', '2', '3', '4', '5'])
        self.reader.move_right()
        self.assertEqual('4', self.reader.read())

    def test_head_can_be_moved_left(self):
        self.reader.load_tape(['1', '2', '3', '4', '5'])
        self.reader.move_left()
        self.assertEqual('2', self.reader.read())

    def test_reading_off_beginning_of_tape_extends_with_blanks(self):
        self.reader.load_tape(['1', '2', '3'])
        self.assertEqual(1, self.reader.head)
        self.assertEqual(3, len(self.reader.tape))
        self.reader.move_left()
        self.assertEqual(0, self.reader.head)
        self.reader.move_left()
        self.assertEqual(0, self.reader.head)
        self.assertEqual(4, len(self.reader.tape))
        self.assertEqual(' ', self.reader.read())

    def test_reading_off_end_of_tape_extends_with_blanks(self):
        self.reader.load_tape(['1', '2', '3'])
        self.reader.move_right()
        self.reader.move_right()
        self.assertEqual(' ', self.reader.read())

    def test_writing_symbol_can_be_read_back(self):
        self.reader.load_tape(['1', '2', '3'])
        self.reader.write('Q')
        self.assertEqual('Q', self.reader.read())
        self.assertEqual('1Q3', str(self.reader))

    def test_spotlight_shows_n_characters_either_side(self):
        self.reader.load_tape(['1', '2', '3', '4', '5'])
        self.assertEqual('234', self.reader.spotlight(1))

    def test_spotlight_shows_more_characters_either_side(self):
        self.reader.load_tape(['0', '1', '2', '3', '4', '5', '6'])
        self.assertEqual('12345', self.reader.spotlight(2))

    def test_spotlight_towards_left_shows_fewer_characters(self):
        self.reader.load_tape(['0', '1', '2', '3', '4', '5', '6'])
        self.reader.move_left()
        self.assertEqual('01234', self.reader.spotlight(2))

    def test_at_hard_left_spotlight_shows_characters_from_right(self):
        self.reader.load_tape(['1', '2', '3', '4', '5'])
        self.reader.start_at(0)
        self.assertEqual('123', self.reader.spotlight(2))

    def test_spotlight_towards_right_shows_fewer_characters(self):
        self.reader.load_tape(['0', '1', '2', '3', '4', '5', '6'])
        self.reader.move_right()
        self.reader.move_right()
        self.assertEqual('3456', self.reader.spotlight(2))

    def test_at_hard_right_spotlight_shows_characters_from_left(self):
        self.reader.load_tape(['1', '2', '3', '4', '5'])
        self.reader.start_at(4)
        self.assertEqual('345', self.reader.spotlight(2))

if __name__ == '__main__':
    unittest.main()

```
