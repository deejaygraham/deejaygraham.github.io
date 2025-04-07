---
title: Markov Speech
tags: [code, python]
---

A <a href="2025-03-22-microbit-markov-text.md">recent post</a> generating psuedo-random text for the microbit 
had me wondering about using something like it on a bigger machine. I've not played with text to speech outside of the 
microbit ecosystem since studing for my CS degree. 

As you would expect, python has a number of text to speech modules available. I, mostly at random, picked pyttsx3 which 
can be installed very easily using your preferred package manager and seems to give pretty good results. 


## Code

Here I am using text to speech to speak whatever the earlier markov generator is producing. I used some of the 
gettting started sample code to play around with the voice used for this example. 


```python

import pyttsx3 

engine = pyttsx3.init()
engine.setProperty('rate', 125)
engine.setProperty('volume',1.0)  

# list current voices
voices = engine.getProperty('voices') 
# Index 0 is male, 1 is female
engine.setProperty('voice', voices[1].id)  

markov = MarkovGenerator('example source text here')
text = markov.generate()

engine.say(text)
engine.runAndWait()

```
