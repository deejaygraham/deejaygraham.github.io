---
layout: post
title: Turing Machine 3
tags: [microbit, python, tdd]
---

Continuing on the Turing Machine series, this is a generic version of the machine using all the pieces so far, as a trial 
before I adapt it specifically to the microbit platform.

## The Machine

Now that I have invested some over-engineering into some of the lower level components, the main loop of the application 
and how the machine itself works came out much cleaner than some of my original sketches. 
Originally, I had the tape and program validation outside of the machine code but opted to refactor things slightly to 
include them in the constructor which I think makes more sense and improves the calling code.

## Code

### turing-machine.py

```python
class TuringMachine():

    def __init__(self, program, tape, alphabet):

        tape_valid = TapeValidator()
        tape_errors = tape_valid.validate(tape, alphabet)

        if len(tape_errors) > 0:
            raise RuntimeError(tape_errors[0])
    
        self.tape = tape

        program_valid = ProgramValidator()
        program_errors = program_valid.validate(program, alphabet)

        if len(program_errors) > 0:
            raise SyntaxError(program_errors[0])
        
        self.program = program
        

    def run(self, starting_pos, starting_state, halting_state = 0):

        reader = TapeReader(self.tape, starting_pos)
        state = starting_state

        while state != halting_state:
            print(reader)
            symbol = reader.read()
            instruction_table = self.program[state]
            instructions = instruction_table[symbol]
            
            new_symbol = instructions['write']
            reader.write(new_symbol) 
        
            direction = instructions['move']
            if direction < 0:
                reader.move_left()
            elif direction > 0:
                reader.move_right()
                    
            state = instructions['state']

```

## Program 

Here's a super simple program to exercise all of the parts so far. This program reads in a tape with "binary" characters and 
changes 1's to 0's and 0's to 1's. The program stops when it finds an underscore character.

The initial state of the tape and the program are validated before being fed to the machine proper for running. 

### program.py 

```python

alphabet = ['1', '0', ' ', '_']
tape = ['1', '0', '0', '1', ' ', '_']
starting_pos = 0

# change all 1's to 0s and all 0s to 1s
# stop on underscore
program = {
    0: {

    },
    1: {
        '1': {
            'write': '0',
            'move': 1,
            'state': 1
        },
        '0': {
            'write': '1',
            'move': 1,
            'state': 1
        },
        '_': {
            'write': '_',
            'move': 0,
            'state': 0
        },
        ' ': {
            'write': ' ',
            'move': 1,
            'state': 1
        }
    }
}

starting_state = 1

tm = TuringMachine(program, tape, alphabet)
tm.run(starting_pos, starting_state)

```

## Print

I snuck in a print statement in the middle of the run method's while loop so I could visualize the process using the 
__str__() function I created in the first post of this series. I think the text illustration came out quite well in the 
console with the circumflex showing the head position as it moves down the tape from left to right:

```shell
1001 _
^
0001 _
 ^
0101 _
  ^
0111 _
   ^
0110 _
    ^
0110 _
     ^
```

Next stop, converting to microbit-ese and adding some animations to make it come to life better on that tiny platform.

## Note

After doing some of this work, I discovered quite a good explanation and worked example of a similar approach from 
the [Computer Science Department](https://www.cl.cam.ac.uk/projects/raspberrypi/tutorials/turing-machine/one.html) at 
Cambridge University, targeted at the raspberry pi and using the GPIO to light leds to represent state transitions.

