---
layout: post
title: Microbit Id
tags: [microbit, python]
---

I have an idea for a new project with the microbits, one that requires that they need to be able to identify each other and 
pass messages between them with intended recipients. One aspect of the microbit that I haven't ever explored is the 
unique machine id that every microbit is supposed to come pre-programmed with and is stable between restarts of the device. 


## Code

The machine id is returned as a set of bytes so in this snippet I have chosen to represent them as a mac address format. This 
ought to be good enough to tag each microbit and have it both announce it's presence on the network and recognize that a message 
is for it in particular. 

```python

from microbit import *
import machine

id = machine.unique_id()
address = '{:02x}{:02x}{:02x}{:02x}'.format(id[0], id[1], id[2], id[3])
print(address) 

```

## Update

Typically, after posting this I discovered a repo from one of the microbit contributors - [Carlos Pereira Atencio](https://github.com/microbit-carlos) - 
documenting a challenge from EuroPython 2022 [Bird Activity](https://github.com/microbit-carlos/microbit-bird-activity/) which uses a fun approach 
to generating a better, friendly name for the birds but still based on the value returned from the microbit unique_id function.


### microbit-bird-activity/src/bird/complete/bird.py

```python

import machine
import struct

def friendly_name():
    """Returns a string with a friendly name based on the MCU Unique ID."""
    length, letters = 5, 5
    codebook = [
        ['z', 'v', 'g', 'p', 't'],
        ['u', 'o', 'i', 'e', 'a'],
        ['z', 'v', 'g', 'p', 't'],
        ['u', 'o', 'i', 'e', 'a'],
        ['z', 'v', 'g', 'p', 't']
    ]
    name = []
    # Derive our name from the unique ID
    _, n = struct.unpack("II", machine.unique_id())
    ld = 1;
    d = letters;
    for i in range(0, length):
        h = (n % d) // ld;
        n -= h;
        d *= letters;
        ld *= letters;
        name.insert(0, codebook[i][h]);
    return "".join(name);

```
