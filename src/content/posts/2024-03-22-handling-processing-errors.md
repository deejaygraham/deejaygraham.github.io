---
permalink: 2024/03/22/handling-processing-errors/
layout: post
title: Handling Processing Errors
published: true
tags: [code, processing, python]
---

One frustrating thing about running the python version of processing is that any errors in the script tend to crash it and may not leave you with a good explanation of what went wrong. Sometimes if 
the error happens in the setup portion, you can be left with a gray screen and no hint about how to correct the problem. It can mean you start using print statements to demonstrate how far into the script 
you got before things exploded ```print('got here!')``` 

Processing has a [try/catch construct](https://py.processing.org/reference/try) which seems to help with this and I've started using it to diagnose runtime errors and to keep the program/sketch running so that debugging becomes easier. 

```python

def draw():
        
  try:
    # do slightly unusual stuff - no idea if it will work
    # may not work...

  except exception as e:
    # oops didn't work but now I have an idea of where
    # to look first
    print(e.message)

```
