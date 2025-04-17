---
layout: post
title: Microbit Markov Text Generator
tags: [microbit, python]
---

I remember being fascinated by [Markov Chain Text Generators](https://en.wikipedia.org/wiki/Markov_chain) when I got my first programming job and had played about with it occasionally since reading 
Brian Kernighan's book "The Practice of Programming" - example [code here](https://www.cs.princeton.edu/~bwk/tpop.pngage/markov.c) written in C - 
but had forgotten about it until talking about it with a colleague recently. This lead me to [reading](https://www.haykranen.nl/2008/09/21/markov/) [some](https://chriscombs.net/2017/01/19/markov-radio/) 
more recent [posts](https://healeycodes.com/generating-text-with-markov-chains). 

Of course, as always, this interest needs to find its way into a microbit example program, so here it is. This code is based on Andrew Healey's [post](https://healeycodes.com/generating-text-with-markov-chains) 
which was a good refresher. 

I really liked the idea of the [Markov Radio](https://chriscombs.net/2017/01/19/markov-radio/) that Chris Combs designed and built and I thought that something similar might be fun for the microbit.
I have made some adaptations to the original code posted by Andrew, partly to port to the microbit but also to suit it to reading aloud rather than printing out: removing punctuation, starting with 
a random word rather than a capitalized word and running until a full stop is found. I have also applied some refactorings to rename variables and added comments to better describe what is happening 
at points in the process.

## Code

### markov.py

```python
import random

def clean_source(source):
    '''
        Return a list of words with some punctuation removed
    '''
    text = (
        source.replace(".", "")
        .replace(",", "")
        .replace("!", "")
        .replace("?", "")
        .replace("'", "")
    )
    split_text = text.split()
    # remove blank words
    words = [word.lower() for word in split_text if word]
    return words
    
def build_model(source, ngram_size):
    '''
        Build a markov model from a source text.
        Model is a dictionary of words/phrases -> list of potential next words
    '''
    words = clean_source(source)

    model = {}

    for i in range(ngram_size, len(words)):
        word = words[i]
        # which n words (n = ngram_size) immediately precede
        # this word in the model?
        preceding_phrase = " ".join(words[i - ngram_size : i])
        # have we seen this combination before?
        if preceding_phrase in model:
            model[preceding_phrase].append(word)
        else:
            model[preceding_phrase] = [word]

    return model


def generate_text(model, ngram_size, min_length):
    def get_new_starter():
        return random.choice([s.split(" ") for s in model.keys()])

    text = get_new_starter()

    i = ngram_size
    while True:
        # pick the phrase ending the current sentence
        phrase = " ".join(text[i - ngram_size : i])

        if phrase not in model:
            text += get_new_starter()
            i += 1
            continue

        # pick the next word
        next_word = random.choice(model[phrase])

        text.append(next_word)
        i += 1
        if i > min_length: 
            break

    return " ".join(text)
```

### generator.py

Handling text generation becomes a little easier if we wrap the intialisation in a class.

```python

class MarkovGenerator:
    
    def __init__(self, text):
        self.source = text        
        self.phrase_size = 1
        self.model = build_model(self.source, self.phrase_size)
        
    def generate(self, length = 0):
        
        if length == 0:
            length = random.randint(5, 30)
        return generate_text(self.model, self.phrase_size, length)

```

### sandia.py

In line with the radio announcer idea, I thought a small but foreboding text might work well so landed on some text taken from a wikipedia article on 
[sandia warning messages](https://en.wikipedia.org/wiki/Long-term_nuclear_waste_warning_messages)

```python
from microbit import *
import speech

# ^ code included from above ^

sandia_messages = "This place is a message and part of a system of messages pay attention to it! \
Sending this message was important to us. We considered ourselves to be a powerful culture. \
This place is not a place of honor no highly esteemed deed is commemorated here nothing valued is here.\
What is here was dangerous and repulsive to us. This message is a warning about danger. \
The danger is in a particular location it increases towards a center the center of danger is here of \
a particular size and shape, and below us. \
The danger is still present, in your time, as it was in ours. \
The danger is to the body, and it can kill. \
The form of the danger is an emanation of energy. \
The danger is unleashed only if you substantially disturb this place physically. This place is \
best shunned and left uninhabited. "

markov = MarkovGenerator(sandia_messages)

# babble on forever
while True:
    text = markov.generate()
    speech.say(text)

```
