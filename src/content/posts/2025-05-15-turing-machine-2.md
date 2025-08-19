---
layout: post
title: Turing Machine 2
tags: [microbit, python, tdd]
---

Following on from the last post, here is a program validator that checks for common problems in our eventual 
implementation of a program that the Turing Machine will run (from within the python program).

The program is a set of states, each containing some possible instructions to carry out while in that state. 
The exact instructions selected depends on the symbol read from the tape but are always three distinct 
actions - what to write back to the tape, where to move next (left, right, no move) and which 
state to move to next.

A placeholder state is used (by convention state 0) to stop the program from running endlessly. See the 
unit tests at the end of this post for some example programs (both good and bad).


## Program Validator

Since the whole point of a turing machine is that the program can be anything, the program 
validator works to at least check that there are certain minimum requirements. 

For the top level state I decided we needed a halting/resting state and at least one other state 
where the action will happen. The other state(s) should include at least one symbol
acting as a key for a set of instructions. The symbol must come from a recognized alphabet since it is 
going to be read from the tape. Each instruction set must contain 3 mandatory instructions: 
a write instruction, a move instruction and a next state instruction.

The move can only be 1, 0 or -1 (move right, no move, move left). The write symbol must come from the 
same alphabet as the read symbol. The next state must exist in the top level dictionary keys so that we 
can be sure that we are moving to a valid state that exists.

I included some type checking as well for dictionaries and some of the values so that we can catch 
some of the more obvious errors early on. I also tried to make the errors messages as useful and 
descriptive as possible. 


## Code

### program-validator.py

```python
class ProgramValidator:

    def validate(self, program, alphabet):
        errors = []

        if not isinstance(program, dict):
            errors.append(f"Expecting top level dictionary, given {type(program)}")
            return errors
        elif len(program) < 2:
            errors.append(
                f"Expecting at least 2 top level state keys in program, found {len(program)}."
            )
            return errors

        if not isinstance(alphabet, list):
            errors.append(
                f"Expecting valid symbol alphabet to be a list, given {type(alphabet)}"
            )
        elif len(alphabet) == 0:
            errors.append(
                f"Expecting at least 1 item in valid symbol alphabet, found {len(alphabet)}."
            )

        for state_key, state_dict in program.items():
            if state_key == 0:
                # assume halting state, ignore
                continue

            # make sure every other state is a dictionary
            if not isinstance(state_dict, dict):
                errors.append(
                    f"Expecting dictionary for state [{state_key}], given {type(state_dict)}"
                )
            # and it contains something
            elif len(state_dict) == 0:
                errors.append(f"State [{state_key}]: Expecting at least 1 read symbol.")
            else:
                # inspect read symbols
                for key_symbol, symbol_dict in state_dict.items():
                    # ensure each one is from the alphabet we define
                    if not key_symbol in alphabet:
                        errors.append(
                            f"State [{state_key}]: Unexpected read symbol '{key_symbol}' found, expecting one of '{''.join(alphabet)}'"
                        )
                        continue

                    # make sure the dictionary for this symbol is the correct type and contains three instructions
                    if not isinstance(symbol_dict, dict):
                        errors.append(
                            f"State [{state_key}]:[{key_symbol}] Expecting dictionary for instructions, given {type(symbol_dict)}"
                        )
                    # and it contains something
                    elif len(symbol_dict) < 3:
                        errors.append(
                            f"State [{state_key}]:[{key_symbol}] Expecting 3 mandatory instructions."
                        )
                    else:
                        for (
                            instruction_symbol,
                            instruction_value,
                        ) in symbol_dict.items():
                            # item has to be write move or state
                            if instruction_symbol == "write":
                                # must be a character in the alphabet
                                if not instruction_value in alphabet:
                                    errors.append(
                                        f"State [{state_key}]:[{key_symbol}] Unexpected write symbol '{instruction_value}' found, expecting one of '{','.join(alphabet)}'"
                                    )
                            elif instruction_symbol == "move":
                                moves = [-1, 0, 1]
                                if not instruction_value in moves:
                                    errors.append(
                                        f"State [{state_key}]:[{key_symbol}] Unexpected move symbol '{instruction_value}' found, expecting one of '{','.join(map(str, moves))}'"
                                    )
                            elif instruction_symbol == "state":
                                # must be one of the existing states...
                                if not instruction_value in program:
                                    valid_state_values = ",".join(map(str, program))
                                    errors.append(
                                        f"State [{state_key}]:[{key_symbol}] Unexpected state symbol '{instruction_value}' found, expecting one of '{valid_state_values}'"
                                    )
                            else:
                                errors.append(
                                    f"State [{state_key}]:[{key_symbol}] Unexpected instruction '{instruction_symbol}' found, expecting one of 'move,write,state'"
                                )

            return errors
```


## Tests 

### program-validator-tests.py 

```python
import unittest


class ProgramValidatorTests(unittest.TestCase):

    def setUp(self):
        self.validator = ProgramValidator()

    def test_text_program_is_rejected(self):
        errors = self.validator.validate(" ", [])
        self.assertEqual(1, len(errors))

    def test_empty_program_is_rejected(self):
        errors = self.validator.validate({}, [])
        self.assertEqual(1, len(errors))

    def test_state_as_list_is_rejected(self):
        program = {
            0: {
                # halting state
            },
            1: [
                # incorrect type of state
            ],
        }

        errors = self.validator.validate(program, ["a"])
        self.assertEqual(1, len(errors))

    def test_program_with_read_symbols_from_alphabet_accepted(self):
        program = {
            0: {
                # halting state
            },
            1: {"a": {"move": 0, "state": 0, "write": "b"}},
        }

        alphabet = ["a", "b"]

        errors = self.validator.validate(program, alphabet)
        self.assertEqual(0, len(errors))

    def test_program_with_read_symbols_from_unknown_alphabet_rejected(self):
        program = {
            0: {
                # halting state
            },
            1: {
                "b": {
                    # should not be possible
                }
            },
        }

        alphabet = ["a"]

        errors = self.validator.validate(program, alphabet)
        self.assertEqual(1, len(errors))

    def test_program_with_invalid_instruction_keys_is_rejected(self):
        program = {
            0: {
                # halting state
            },
            1: {"a": {"invalid_move": 0, "state": 0, "write": "b"}},
        }

        alphabet = ["a", "b"]

        errors = self.validator.validate(program, alphabet)
        self.assertEqual(1, len(errors))

    def test_program_with_invalid_move_value_is_rejected(self):
        program = {
            0: {
                # halting state
            },
            1: {"a": {"move": 2, "state": 0, "write": "b"}},
        }

        alphabet = ["a", "b"]

        errors = self.validator.validate(program, alphabet)
        self.assertEqual(1, len(errors))

    def test_program_with_invalid_state_value_is_rejected(self):
        program = {
            0: {
                # halting state
            },
            1: {"a": {"move": -1, "state": 3, "write": "b"}},
        }

        alphabet = ["a", "b"]

        errors = self.validator.validate(program, alphabet)
        self.assertEqual(1, len(errors))

    def test_program_with_invalid_instruction_value_is_rejected(self):
        program = {
            0: {
                # halting state
            },
            1: {"a": {"move": -1, "state": 0, "write": "b", "read": "Q"}},
        }

        alphabet = ["a", "b"]

        errors = self.validator.validate(program, alphabet)
        self.assertEqual(1, len(errors))


if __name__ == "__main__":
    unittest.main()
```
