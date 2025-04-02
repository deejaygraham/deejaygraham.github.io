---
title: If At First You Don't Fail
tags: [tdd, code, python]
---

The usual saying is "If at first you don't succeed..." but I think developers need the reverse "If at first you don't fail...you don't have 
a very good unit test". The reason for believing this has come around again very recently with a real world example - but with details elided 
for obvious reasons. 


## Evil Copy and Paste

We often hear about the problems of copy-paste when it comes to writing code. This happens where one needs to write some code but there is some 
code already in existence that almost matches the thing that you want. The great temptation is to copy that code, paste it in place of the new code
and change some details so that the copy no longer does what the old code does but instead does the new thing. There's perhaps nothing inheritly 
evil about that but it can cause problems that we have all experienced many times. How many times have we copied and pasted innocently, made the 
required changes to the new code ... and then a bug is reported because we missed one or more places where the original code should have been edited
to fit the new situation but we forgot or just didn't see it. 

This gets even worse when we talk about unit tests and I'll demonstrate with an (almost) real-life but much simpler example. 

## Example

Let's say we have a fictitious module called maths.py which has two functions, add and subtract.
Now let's say that add works as expected but subtract has a coding error:

### maths.py

```python

def add(first, second):
    return first + second

def subtract(first, second):
    # spot the subtle error
    return first * second + 22

```

## Test

Now let's write a test for the add function (and ignore what I normally say about test naming:)

```python
import unittest

class TestMaths(unittest.TestCase):

    def test_addition(self):
        self.assertEqual(add(2, 3), 5)

```

This all works beautifully and gives us the expected result. We don't make sure the test fails first (as TDD says we should) but 
maybe that's ok. When we review the tests though we realise we aren't testing the subtract function so we should add something for that.


## Test2

Being a bit lazy and wanting to get the job completed as soon as possible, we copy and paste from the test addition function and change 
the name of the test so that it all runs.

```python
import unittest

class TestMaths(unittest.TestCase):

    def test_addition(self):
        self.assertEqual(add(2, 3), 5)

    def test_subtraction(self):
        self.assertEqual(add(2, 3), 5)
```

Run the code and both tests work, we can commit the code with full confidence. Except...that we missed the fact that we are still calling 
the add function, not the subtract function. 

## Failure

Because we relied on the test showing green and didn't force the test to fail and confirmed it failed for the right reason, we missed what 
ought to have been an obvious defect.


## How to Fail

There are a couple of strategies to force a test failure so that you can be sure, or at least increase your chances, that you are testing 
the right thing.

### Change the Test

- Change the test's expected value

### Change the Code 

- Rename the function under test
- Return a null or default value from the function
- Return a specific value (999?) from the function


## Disclaimer

None of the code above is actually production code obviously but demonstrates the problem. This is based on a real-life issue I reviewed 
recently but with more involved code and test setup which only served to hide the issue hence this stripped back version.
