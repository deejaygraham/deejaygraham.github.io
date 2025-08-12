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
