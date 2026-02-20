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
    """
    Return a list of words with some punctuation removed
    """
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
    """
    Build a markov model from a source text.
    Model is a dictionary of words/phrases -> list of potential next words
    """
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

    def generate(self, length=0):

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

### peter.py

For a slightly lighter reading, here is the text from a well-known storybook which can be used in place of the
sandia text

```python
# from https://www.gutenberg.org/ebooks/author/292
tale_of_peter_rabbit = "Once upon a time there were four little Rabbits, and their names \
were Flopsy, Mopsy, Cotton-tail, and Peter. \
They lived with their Mother in a sand-bank, underneath the root of a \
very big fir-tree. \
'Now my dears,' said old Mrs. Rabbit one morning, 'you may go into \
the fields or down the lane, but don't go into Mr. McGregor's garden \
your Father had an accident there; he was put in a pie by Mrs. \
McGregor.' \
'Now run along, and don't get into mischief. I am going out.' \
Then old Mrs. Rabbit took a basket and her umbrella, and went through \
the wood to the baker's. She bought a loaf of brown bread and five \
currant buns. \
Flopsy, Mopsy, and Cottontail, who were good little bunnies, went \
down the lane to gather blackberries \
But Peter, who was very naughty, ran straight away to Mr. McGregor's \
garden and squeezed under the gate! \
First he ate some lettuces and some French beans; and then he ate \
some radishes; \
And then, feeling rather sick, he went to look for some parsley. \
But round the end of a cucumber frame, whom should he meet but Mr. \
McGregor! \
Mr. McGregor was on his hands and knees planting out young cabbages, \
but he jumped up and ran after Peter, waving a rake and calling out, \
'Stop thief!' \
Peter was most dreadfully frightened; he rushed all over the garden \
for he had forgotten the way back to the gate. \
He lost one of his shoes among the cabbages, and the other shoe \
amongst the potatoes. \
After losing them, he ran on four legs and went faster, so that I \
think he might have got away altogether if he had not unfortunately \
run into a gooseberry net, and got caught by the large buttons on his\
jacket. It was a blue jacket with brass buttons, quite new.\
Peter gave himself up for lost, and shed big tears; but his sobs were \
overheard by some friendly sparrows, who flew to him in great \
excitement, and implored him to exert himself. \
Mr. McGregor came up with a sieve, which he intended to pop upon the \
top of Peter; but Peter wriggled out just in time, leaving his jacket \
behind him. \
And rushed into the tool-shed, and jumped into a can. It would have \
been a beautiful thing to hide in, if it had not had so much water in it. \
Mr. McGregor was quite sure that Peter was somewhere in the \
tool-shed, perhaps hidden underneath a flower-pot. He began to turn \
them over carefully, looking under each. \
Presently Peter sneezed--'Kertyschoo!' Mr. McGregor was after him in \
no time. \
And tried to put his foot upon Peter, who jumped out of a window, \
upsetting three plants. The window was too small for Mr. McGregor, and \
he was tired of running after Peter. He went back to his work. \
Peter sat down to rest; he was out of breath and trembling with \
fright, and he had not the least idea which way to go. Also he was \
very damp with sitting in that can. \
After a time he began to wander about, going lippity--lippity--not \
very fast, and looking all round. \
He found a door in a wall; but it was locked, and there was no room \
for a fat little rabbit to squeeze underneath. \
An old mouse was running in and out over the stone doorstep, carrying \
peas and beans to her family in the wood. Peter asked her the way to \
the gate, but she had such a large pea in her mouth that she could not \
answer. She only shook her head at him. Peter began to cry. \
Then he tried to find his way straight across the garden but he \
became more and more puzzled. Presently, he came to a pond where Mr. \
McGregor filled his water-cans. A white cat was staring at some \
gold-fish, she sat very, very still, but now and then the tip of her \
tail twitched as if it were alive. Peter thought it best to go away \
without speaking to her; he had heard about cats from his cousin, \
little Benjamin Bunny. \
He went back towards the tool-shed, but suddenly, quite close to him, \
he heard the noise of a hoe--scr-r-ritch, scratch, scratch, scritch. \
Peter scuttered underneath the bushes. But presently, as nothing \
happened, he came out, and climbed upon a wheelbarrow and peeped over. \
The first thing he saw was Mr. McGregor hoeing onions. His back was \
turned towards Peter, and beyond him was the gate! \
Peter got down very quietly off the wheelbarrow; and started running \
as fast as he could go, along a straight walk behind some \
black-currant bushes. \
Mr. McGregor caught sight of him at the corner, but Peter did not \
care. He slipped underneath the gate, and was safe at last in the wood \
outside the garden \
Mr. McGregor hung up the little jacket and the shoes for a scare-crow \
to frighten the blackbirds. \
Peter never stopped running or looked behind him till he got home to \
the big fir-tree. \
He was so tired that he flopped down upon the nice soft sand on the \
floor of the rabbit-hole and shut his eyes. His mother was busy \
cooking; she wondered what he had done with his clothes. It was the \
second little jacket and pair of shoes that Peter had lost in a \
fortnight! \
I am sorry to say that Peter was not very well during the evening. \
His mother put him to bed, and made some camomile tea; and she gave a \
dose of it to Peter! \
'One table-spoonful to be taken at bed-time.' \
But Flopsy, Mopsy, and Cotton-tail had bread and milk and \
blackberries for supper. "

```
