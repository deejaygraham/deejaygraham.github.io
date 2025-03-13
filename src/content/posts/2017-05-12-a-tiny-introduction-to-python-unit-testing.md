---
title: A tiny introduction to Python unit testing
tags: [code, python, tdd]
---

As I go deeper and deeper into Python, lead by experiments with the Microbit, I thought
it was about time I experimented with some tests. That should have been the first
thing I did, right?

Well, on the microbit - an embedded device - it's not easy to see whether a self-hosted
test framework would be much use (or is it - I may revisit this again). For now,
I'm going to concentrate on writing and running tests only on vanilla desktop machines.

To get started we need to have a test framework and Python has <code>unittest</code>.
The shape of this module will be familiar to anyone who has used an xUnit kind of
framework before. You need to create a class derived from <code>unittest.TestCase</code>
and define methods that start with <code>test</code> within the class. <code>setUp</code> and
<code>tearDown</code> methods are reserved by the framework to do preparation and clean up
before and after each test.

### Assertions

As you might expect from xUnit frameworks, assertions are the way to test your code. unittest
provides some nicely familiar <code>assertEqual</code>, <code>assertNotEqual</code>,
<code>assertTrue</code>, <code>assertFalse</code> among others. Be careful to use
self.assert\* to make sure that python knows which function you are invoking, otherwise
you will get see something like:

```

NameError: global name 'assertEqual' is not defined

```

and your unit test will be failing for the wrong reason.

### Code

```

import unittest

# All these tests will fail !

class TestMyCode(unittest.TestCase):

def test_jimi_hendrix_lyrics(self):

    self.assertNotEqual(6, 9)
    self.assertEqual(6, 9)

def test_black_is_white(self):

    self.assertTrue('black' == 'white')

def test_up_is_down(self):

    self.assertFalse('up' != 'down')

```

### Running

```

python -m unittest test_my_code

```

Of course, I have been a good red-green-refactor-er and written failing tests first. This is
the output from running the tests:

<img alt="results" src="/img/posts/a-tiny-introduction-to-python-unit-testing/results.webp" />

Each failure shows you the title of the test that failed (which is why naming your tests
descriptively is important), the line of the failing assertion and why the framework
thought the test failed.
