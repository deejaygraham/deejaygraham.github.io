---
title: Custom Microbit Modules
tags: [code, microbit]
hero: microbit


---

As long as I have been working with the BBC microbit, I have always - for simplicity and ease of explanation - crammed all my code into a single tab in the mu editor,
regardless of how I would structure things in my day job, knowing what is good practice and what is not. 

Microbit can handle executing code spread across multiple files but the process is slightly clunky and not too intuitive.

### Process

* Write a file containing some code

```python
# maths.py


def add(first, second):
    return first + second


def multiply(first, second):
    return first * second
```

* Save that file into the mu_code folder locally (as maths.py)
* import the file into the main source tab as you would with

```python
from microbit import *
```

```python
# main.py

from maths import *

print(add(1, 2))
print(multiply(2, 6))
```

* Flash the source to the microbit
* Expect an error complaining that import does not exist
* Open the "Files" console in the mu editor
* Drag the maths .py source file across to the microbit
* Restart the microbit
* Watch the code execute!

