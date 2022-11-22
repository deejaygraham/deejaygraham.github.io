---
layout: post
title: How to be Psychic
published: true
categories: [ presentations ]
thumbnail: img/posts/dddnorth-2022/thumbnail-420x255.png
alttext: DDD North 2022
---

## Abstract

How much better and less stressful would your work life be if you were psychic?

In this session I want to show you how to simplify your life working with code by at least pretending to be psychic. From designing 
a solution, to small refactoring or heavily modifying a design to eliminate technical debt, we can feel trapped by the design 
decisions we or our predecessors made in the far or recent past. With your new, entirely fake, psychic ability this becomes much 
easier and you can design and write code with the confidence that it will always look to outsiders that you had amazing 
foresight and crafted the perfect solution for the applications needs at this exact moment.

No cards or crystal balls required.

## Intro Hey Hi Hello

Here is the rough transcription of my talk from DDD North 2022 at University of Hull.

Hello, thanks for being here and it's very nice to be back at DDD in person. 

My name is derek graham and I am a principal developer at Sage in Newcastle (if anyone can't tell from my accent).
We are looking to hire so if you want to know more about that, please grab me sometime outside of this session.

## Clickbait

Clickbait titles get you in trouble, don't they? Last time I gave a talk at DDD North (pre-pandemic), it was on ensemble or 
mob programming and one part featured this lady, Margaret Rutherford, playing the part of Madame Arcati, the medium in 
Noel Coward's play Blythe Spirit. That was a bit of fun to make a point about typing but after the talk it got me thinking 
what would modern day psychics look like for software development?

Psychic cold reading example ?
I'm not talking about "I can tell someone here has a close connection to someone with the name starting with J" kind of psychic.
"You will meet a tall dark stranger" kind of psychic.


## Houdini

Let me back up a bit... (check facts)

Does anyone know why Houdini hated mediums and other people who claimed to speak for the dead? He was devastated when his mother
died and the fashion of the time was very much in favour of spiritualism and seances and all that. He went to visit a medium 
who, recognizing one of the most famous people of the time, was absolutely able to contact his dear departed mother and bring 
her forward to speak to him. *imitates old lady* "Ah yes, it is me, your dear departed, snow-white haired old mother back to 
talk to you from beyond the grave" which was all fine. "I love you very much, person who is definitely my son, since I am your 
dead mother, back to speak to you" also fine. Then: "I love you so much Harry... I think of you often, bye bye. Remember to 
pay the nice lady". Big mistake! Because Harry Houdini is a stage name. His mother never used that (why would she?), she only 
knew his as Erich - Erich Weiss.Erik Weisz 1920s


## Confession

Who here has felt in the past like they are trapped by their code? It's hard to make changes, and any kind of change they make 
is going to make things more difficult in the future? The kinds of changes where you just want to abandon it to the elements 
and start again? 

This is a safe space, anything confessing to in here stays in the room? I am giving this talk because I have painted myself into 
so many corners with bad designs that I know exactly what that kind of thing feels like.

In new systems, businesses typically have one of two strategies: locking down functionality as the first phase of a multi-phase 
plan (what we often call waterfall) and no plan at all - adhoc design.

In existing (legacy!) systems, you might be brought in after the original developers have long since left or died (happened to me)
and there seem to be two different reactions developers naturally have to this kind of thing - look at the crap that's there now and 
throw it all away, burn it to the ground and start again, or rewrite a huge chunk how you would like it and then somehow smash that 
new square peg into the round hole where the old code currently lives.

But it's Extremely difficult to design a complete architecture before you start building. The Simplicity Principle. At any time (said by Kent Beck and 
Ward Cunningham) the system should have exactly enough architecture to implement the current set of stories (and therefore tests).
Architecture evolves as the system grows. Anything like a BDUF system is purely based on guesswork and will necessarily be overly complex and bloated with 
code we aren;t going to have needed in the end. This unnecessary complexity adds expense - time - takes longer to implement, to maintain when not needed.

You must know that up front when you know the least (KEnt Beck again). If you spend a year designing before building, the thing will be obsolete 
before you get to write any code (one example of where that did work).

Possibly appocraphal story about the US Federal Aviation Authority hiring IBM to build an air traffic control system - new requirements 
and technology meant that design was always out of date with legal regulations.

This can all lead to horrific outcomes and stress for us as developers. I said before that clickbait can 
get us in terrible trouble didn't I? How about I change the title of the talk to be...

## n Ways that you can improve you life developing software using evolutionary design

(you won't believe number 5)

There is a lot here and probably I could do a talk on each one of these so my intention here 
is to make you aware if you aren't already, point you to some resources and hopefully there 
will be loads for you to study and learn in the next year (and you can come back to DDD and present
what you learned :)


## Evolutionary Design ?

Starting with something small, making it bigger and adding to it, all while keeping it and making it more complex over time.
How do you get a big, complex design that works? Start with a small one that works and grow it. * Growing a garden


Desciplined
Simple Design - simplest - don't anticipate the future.
Incremental Design - rework to match current requirements as they come in.
Continuous Design - Design all the time - every day / hour.


## Example ? If we have time



## Shitty first draft

'Almost all good writing begins with terrible first efforts'

Annie Lamott "Bird by Bird" 1994

## Story splitting or narrowing

## Ditch SOLID

Connascence
Coupling
Cohesion

## Four Rules of Simple Design

## All the tests

## Refactoring

## Refactor Names

## How to Draw

'The mind a great place to have ideas but a terrible place for keeping them'
David Allen - Author of Getting Things Done


## Keyboard


## Code Smells and 
## Deliberate Practice

## DDD

## Event Storming

## IF in doubt
Add a test
reduce the scope
make a better name













# Possible Lightning Talk

Also for anyone with a little bit of experience delivering software who wants to practice their mentoring skills, 
I want to just mention my work with We Think Code. It's a non-profit organization in SA that provides training for 
people who normally who not have access to university or higher education. It's a two year course and mentors are drawn 
from SA itself, and also from around the world, as counsellors to groups of about 4-6 new developers. It is a great joy
and again, if you would like to be involved or hear more about it, please let me know. 
