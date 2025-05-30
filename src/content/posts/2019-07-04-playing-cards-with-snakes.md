---
title: Playing Cards with Snakes
tags: [code]
thumbnail: "/assets/img/posts/playing-cards-with-snakes/thumbnail-420x255.png"
---

Another random discussion in our regular coding dojo led me to think about representing individual playing cards and decks of cards in python. Playing cards with Snakes rather than Sharks, if you will :)

### Card

Here's a card class I came up with to model the suit and rank of an instance along with string conversion and comparison operators - which seem to make sense for cards so that they can be sorted or we can tell if they aren't in order.

```python

{% include 'code/python/cards-1.py' %}

```

### Deck

Next we need to collect the cards into a deck so we can order, shuffle, add and remove cards from the collection.

```python

{% include 'code/python/cards-2.py' %}

```

### Magic

In the dojo we talked about card tricks and ways in which magician's use maths and probability in their favour to give the illusion that cards are randomly arranged but they can predict a card you chose.

One example of this is I had never heard of before is "Si Stebbins Order". This is a way of making the cards look like they are shuffled in random order to the casual observer but follow a repeatable pattern. A magician can ask you to select a card "at random" and if they can get a glimpse of the card before or after it in the order, they can use a simple pattern to work out exactly what the card will be.

See <a href="https://www.deceptionary.com/ftp/SStebbins.pdf">this link</a> for a booklet on magic tricks using this system.

Here's the ordering of the cards for this system.

<img src="/assets/img/posts/playing-cards-with-snakes/sistebbins.png" alt="booklet page 1" />

<img src="/assets/img/posts/playing-cards-with-snakes/sirules.png" alt="booklet page 2" />

One of the magical properties of this ordering is that the pattern rolls over at the edges so if you can see the last card in the deck, you can know what the first card is. Cutting the cards also preserves the pattern so we can do some really cool tricks just with this simple ordering.

### Cutting

For our deck of cards we want to be able to cut the cards into two stacks and place the bottom stack onto the top stack.

```python

{% include 'code/python/cards-3.py' %}

```

### Si Stebbins Order

Now if we implement the Si Stebbins ordering algorithm, we can cut the cards and demonstrate that the ordering still works. Magic!

```python

{% include 'code/python/cards-4.py' %}

```
