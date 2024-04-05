---
layout: post
title: How to be Psychic
published: false
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

Hello, thanks for being here in Hull on a cold Saturday monring. It's very nice to be back at DDD in person. 

My name is derek graham and I am a principal developer at Sage in Newcastle (if anyone can't tell from my accent).
We are looking to hire so if you want to know more about that, please grab me sometime outside of this session.

## Confession

Who here has ever felt they are trapped by their code? It's hard to make changes, and any kind of change they make 
is going to make things more difficult in the future? The kinds of changes get so mired down in details 
and breakages and irrelevant abstractions, and even seemingly small changes spiral out of control across the 
codebase and what you really want to do is just to abandon it to the elements and start again? 

Congratulations, you are not psychic and never have been. I am also just as not psychic as you are not.

In fact, I am giving this talk because I have painted myself into so many corners with bad designs that I know 
exactly what that feels like.

What I want to talk about is giving the appearance of being psychic without all the bother of all of that supernatural
carry on. In particular I want to talk about being psychic in design rather than in debugging. Psychic debugging or 
suggesting areas to look at to find the cause of a bug in the software is a useful but still not supernatural skill but 
that's a whole other talk probably.

## Maximum Value

It was either Kent Beck or Ward Cunninghma (or another XP person) said that the system should have exactly enough 
architecture to implement the current set of stories (and therefore tests). To get maximum value from the 
development process, we want the design to look like it was purpose built for your application features 
as it is now and nothing else (so we don't waste anything).


## Clickbait

Clickbait titles get you in trouble, don't they? Last time I gave a talk at DDD North (pre-pandemic), it was on ensemble or 
mob programming as it was then and one part featured this lady, Margaret Rutherford, playing the part of Madame Arcati, the medium in 
Noel Coward's play Blythe Spirit. That was a bit of fun to make a point about typing and not really related to the subject at hand. 
Spookily when I was coming up with this talk, I discovered that the 2020 remake of Blithe Spirit was going to be broadcast on Sky 
at 4 this morning! 4 am the spookiest of times and I took that as a sign from the great beyond that I needed to give this talk.

Since the start of the pandemic I have been much more involved with a lot of early career developers and graduate developers and the same 
subjects keep coming up. One is stress and anxiety about building "the right thing" or the "right abstraction", and how the design decisions 
we make day to day add up to the "perfect unchangeable solution". Talking about this topic with them I said "Oh, I can do that because I'm 
so totally awesome, plus I'm actually psychic" and to a person they were all "Well, cool but we aren't psychic" and something about 
that made me think back to Margaret Rutherford in the film. 

What I want to talk about this morning is Evolutionary Design, a technique or set of techniques that have been around since the early days 
of XP in the early 2000s? This, for me, has been the biggest shift in my development as a software person and has meant that I spend much 
less time stressing about making perfect decisions and am much more productive as a result.

## Back up

But first let's just back up a bit and talk about traditional design

In new systems, businesses typically establish one of probably three strategies: 

* locking down functionality as the first phase of a multi-phase plan (what we often call waterfall) - BDUF 
* iterating and incrementing as they go with a 3-6 month horizon 
* no plan at all - what we call adhoc design.

In existing (legacy!) systems, it's often the case that someone (you) might be brought in after the original developers have long 
since left or died (happened to me) and faced with code that you don't understand or just outright HATE, there seem to be two different 
reactions developers naturally have - look at the crap that's there now and throw it all away, burn it to the ground and start again, or 
rewrite a huge chunk how you would like it and then somehow smash that new square peg into the round hole where the old code currently lives.

Both of those approaches, delete and start again, or retrofit something different, and BDUF seem to carry maximum risk to the project and the 
business because we are often trying to make predictions about the future when we know least about the system we are working on. Starting 
from nothing with no feedback and trying to imagine the entire system (BDUF) or else trying to reverse engineer the system into a shape we like.

## BDUF

Out of all of my career, one of my first jobs, I did see that BDUF approach worked spectacularly well. This was to build a CNC-type machine control 
system and a CAD package as a shared single codebase to build engraving, cutting, laser machines etc. The product definition was 3 huge ring binders
of specs that the company worked on for a year or so before cutting code. The reason it worked I think was that the 3 developers and 4 hardware engineers
who designed the system were the only stakeholders, they knew what they wanted to achieve, their expertise helped define the system and there was no
feedback required from a "customer". CAD and motion control (e.g. phsyics) were very well understood problem domains so the measure of uncertainty was
very low. Other times I have seen this approach taken, it has never worked out. There is too much to know and we never seem to notice that the picture 
we build in our heads isn't exactly correct until we start coding. We need to accept the idea that we can't understand everything up front. As you know 
the devil is in the details and programming is all details. It doesn't take many details to be a little bit off before all you have is a big pile of 
bits and no working software. In BDUF we are making a bet on a few key people (architects) and their cognitive capacity to know and remember all 
the details that count in each situation at exactly the right time.

Generally, if you spend a year designing before building, the thing will be obsolete before you get to write any code. There's a possibly 
appocraphal story about the US Federal Aviation Authority hiring IBM to build an air traffic control system - As you might imagine, new requirements, 
legal regulations and technology changes kept happening each year which meant that design was always out of date at about the time when the next spec
was completed. They never got to build the code.

## Incremental Iterative Design

Incremental is at least moving in the right direction, adding functionality in smaller, but still very large, chunks where there is still a heavy onus 
on the designer to make big bets about the likely shape of the code into the next few months and add code to support that now rather than when it is needed.

In incremental designs, we can feel trapped by past design decisions, each decision almost set in concrete pushing us further into a smaller and smaller 
box of options. This can lead to us hating the code we have and perhaps even wanting to change jobs to escape it.

## Ad Hoc

As if it needs saying, an adhoc approach almost never gives great results unless the program you are working on is sufficiently small that the majority of 
it can live in your head comfortably and the cost of throwing away a system and rewriting is not that much. In that kind of case, any sort of design 
doesn't matter too much.

## XP

The design should evolve as the system grows. Anything like a BDUF system is purely based on guesswork and will necessarily be overly complex and bloated with 
code we aren;t going to have needed in the end. This unnecessary complexity adds expense - time - takes longer to implement, to udnerstand 
and maintain when a good proportion of it may not be needed.

Simple Desing -> Enabled by Refactoring -> Backed by fast and reliable tests

This can all lead to horrific outcomes and stress for us as developers. I said before that clickbait can 
get us in terrible trouble didn't I? How about I change the title of the talk to be...

9 minutes

## Evolutionary Design ?

So what do I mean when I say evolutionary design? It means starting with something small, making it bigger and adding to it, all while keeping 
the design clean and making it more complex over time.

John Gall's Law: 

"All Complext systems that work evolved from simpler sytsms that worked". If you want to build a complex system that works, build a 
simpler system first, then improve it over time.

This is Very much like growing a garden rather than building a bridge. Evolutionary design lets you build a design for right now and adapt 
it as you go along and thereby protects your capacity to deliver features over the longer term. Often when looking at code, we feel a vague idea 
that we should be able to make a small change but often it can be a lot of effort. You can't get to where you want to be from where you 
currently are. 

Evolutionary design lets us adapt code to meet the needs of the future without having to actually anticipate the needs of the future. 
It lets us pretent that the system we have right now is the result of all of the correct decisions we made at the beginning rather 
than along the way. 
We can pretend that we were psychic at the beginning when in fact we have been moving the seance goalposts all the time - to 
painfully mix a metaphor.

Good news is that this is a skill or set of skills that can be learned, and you can be competent and improve as you practice.

If we can defer decisions about the software, we can make the design better, make design decisions less expensive to change, 
reverse mistakes or allow you to change your mind whenever you need to. This leads us to having less stress and more spare 
energy to devote to harder problems.

Now I've dispensed with the silly clickbait headline to grab your attention, the rest of my talk is really about...

## n Ways that you can improve you life developing software using evolutionary design (you won't believe number 5!!!)

(you won't believe number 5)

There is a lot here and probably I could do a talk on each one of these so my intention here 
is to make you aware if you aren't already, point you to some resources and hopefully there 
will be loads for you to study and learn in the next year (and you can come back to DDD and present
what you learned :)

## Cold Reading 

What would modern day psychics look like for software development?

I can tell someone here has a close connection to someone with the name starting with J" kind of psychic.
You will meet a tall dark stranger" kind of psychic.

## Houdini

Does anyone know why Houdini hated mediums and other people who claimed to speak for the dead? He was devastated when his mother
died and the fashion of the time in 1920s was very much in favour of spiritualism and seances and all that. He went to visit a medium 
who, recognizing one of the most famous people of the time, was absolutely able to contact his dear departed mother and bring 
her forward to speak to him. *imitates old lady* "Ah yes, it is me, your dear departed, snow-white haired old mother back to 
talk to you from beyond the grave" which was all fine. "I love you very much, person who is definitely my son, since I am your 
dead mother, back to speak to you" also fine. Then: "I love you so much Harry... I think of you often, bye bye. Remember to 
pay the nice lady". Big mistake! Because Harry Houdini is a stage name. His mother never used that (why would she?), she only 
knew his as Erich - Erich Weiss.Erik Weisz 1920s

## N Ways 

## Walking Skeleton

Evolutionary Design often means starting with the simplest possible design and we call a walking skeleton. the barest bones of 
an application, perhaps something as simple as a console application that proves something about the system. 
This is the foundation that we will hook all of the rich functionality on going forard. Something that grows in complexity 
as the application grows

Desciplined
Simple Design - simplest - don't anticipate the future.
Incremental Design - rework to match current requirements as they come in.
Continuous Design - Design all the time - every day / hour.

## 1. Shitty first draft

'Almost all good writing begins with terrible first efforts'

Annie Lamott "Bird by Bird" 1994

Free yourself from having to be perfect. If you aren't building a bridge or a nuclear 
power station, then does the design need to be entirely correct at the beginning? Annie Lamott
came up with the idea of the shitty first draft, the idea that we know the first time we do 
something it will be awful and that is what keeps us from taking that first step. But Annie 
says, so what? It;s awful but we can improve it. I've seen this approach free people from 
analysis paralysis and other forms of procrastination and get going on something.

## Ditch SOLID

I have another talk (on youtube) about my hatred of SOLID but all I want to say here is 
that I find it much more effective to follow simple design and think about the 3 C's.

Connascence stolen from Kevin Rutherford, a useful set of measures for the degrees of coupling
that exist within your code. Ranked from least to most coupled and named so that they can be 
identified, talked about and resolved (or not).

Coupling

Cohesion

## Four Rules of Simple Design

Another good guideline that doesn't get talked about an awful lot but really should is "The four rules of simple design" 
they are wonderfully elegant but are sometimes challenging to achieve in practice without an evolutionary approach.

Passes all the tests
Clearly expresses intent
No duplication of knowledge
Contains the fewest elements

## Refactoring

Refactoring is the discipline that makes all this work. When I say refactoring, I mean tiny, tiny small,
reversable steps that we can use to change code in almost imperceptible ways that add up to large changes over 
time but are safe and mostly entirely automated by our IDEs. There are more elaborate refactorings that can be done 
e.g. Martin Fowler's book that are too wide ranging or require too much context to be automated, 
but you can go a long way just by using the automated refactorings provided by your IDE.

I mentioned right at the start, that refactoring is not rewriting from scratch (although I have heard people call it that)
Here are the most common refactorings I find people use - both myself and my colleagues:

Extract Method
Introduce Variable
Introduce Constant
Extract Parameter
Rename (Method, variable)
Move method
Got to definition, show usage

## Keyboard and IDE

Pick the IDE you want to use and then stick with it, so that you can learn the keyboard shortcuts you need, both for 
navigation and selecting text, and then to invoke the most common refactorings. When you know the shortcuts so well
that you don't have to think about them, you are free to think about the problem not the mechanics of where your fingers
need to be. 

I have used Visual Studio for a long time and now use Resharper and I am often asked the shortcut for something I've just done.
I can't tell you what it was, I have to sort of trick myself into doing it again and then watching what my fingers did and then 
noting it down. I can't just say, Shift+Alt+F12 or whatever.

As well as refactorings, it's good to know how to comment and uncomment a block of code, and how to invoke all the tests, 
all the tests in a file or a single test from the keyboard. This needs to be in your muscle memory and practiced so that like 
when you maybe drive to work, it's so automatic sometimes you can't remember doing it.

Refactoring of your code constantly implies that we need tests to make sure the changes we make don't break anything we don't expect.

## All the tests

As a self-taught programmer, early in my career, I felt I wasn;t particularly good at writing code. I was working in 
C++ and the stress I endured when finishing a piece of work and handing it over to be integrated and tested where someone would 
inevitably find a critical null pointer kind of bug, meant that when TDD came along or just the idea of writing a test before, 
at the same time, or just after you had written the code, I was immediately on board with that idea and way of working. It meant I 
could write a bit of code, and test a bit in cycles and made much more progress that way. 

Having complete code coverage is obviously the best to enable you to go fastest at evolutionary design but if we don't start out 
in that perfect way then any tests you can do help you along. Manually testing the code yourself only gets you so far and quickly 
gets old having to setup the same test time and time again to run against your code takes time and can be exhausting or just plain boring.

At a minimum you can try integrating some form of testing into your legacy app or using something like approval tests in the application 
if you can find a way to create a physical output from your program if one does not already exist. 

Contract tests are a good way of ensuring that you don't accidentally change an external interface that you expose to clients, such that 
they will be very unhappy about changing their code to match your changes.

Microtests are best if you have them or can add them as you go along as you modify your system. I stole the term microtests from Mike Hill 
who uses it in preference to Unit Tests since using that word seems to immediately start arguments between developers about what a unit is 
and how you should test it. A microtest for me could be a test of a single function, a group of functions in a class or a group of logically 
related classes to test a piece of behaviour. These are all tests that are done according to Michael Feathers definition without touching the 
network, file system, global variables etc. Fast to run and reliable.  

Tests are also an awesome indicator of the quality of your production code and give instant feedback on your design decisions like if the code is 
going in a better or worse direction. Whenever you feel like the tests are getting annoying, painful, large setup, slow, anything you don't like. 
Don't blame the tests (at least at first), suspect your production code is causing that pain. Often changing the design makes the tests better.

## Refactor Names

## How to Draw

'The mind a great place to have ideas but a terrible place for keeping them'
David Allen - Author of Getting Things Done

A whiteboard and a few boxes are sometimes all you need to start getting a feel for a design and how it can be improved, away from 
staring at the code. Here's a picture of me with one of our junior devs - we have huge whiteboards in our office that many people 
never seem to notice much less use. I was discussing a problem with Scott when I suggested he draw out what the problem was. We took a 
"collaboration" picture here but then got into discussing the problem and Scott, for all the "design" was horribly rendered on the board
by us, it really helped us see clearly what the issues were and how we could get around them. 

UML is a wonderful language but I often hear people complain about it. I don't go the full distance using all the notation and each diagram type
but sticking to boxes and lines for class diagrams and something similar for interaction diagrams is about all you need most of the time. 
What I like most about UML is it's designed for this kind of informality. A box can be anything but I can connect it to another box 
with a line and all that tells me is it's two entities which have some sort of connection. There's nothing else to read into it. As you 
begin to flesh out the design, you can add to the diagram to add more detail in but at no point does it have to stop being a sketch of an idea
rather than an "official" document. Very good for evolution.

even better C4 and plantuml are great for creating text based descriptions of systems that can be checked into source control and 
treated like other source files.

## Code Smells

Code Smells are a good way of helping us to identify and talk about problems there may be in the code. 

Industrial logic has a code smells to refactoring cheatsheet 
https://www.industriallogic.com/img/blog/2005/09/smellstorefactorings.pdf

Refactoring: Improving the Design of Existing Code by Martin Fowler
Refactoring to Patterns by Joshua Kerievsky

Like all smells, Code Smells are not always a problem but the fact that you can point to something in the code and give it a name is highly suggestive.

## Reading Code

Reading code is something that it seems not many developers practice but looking at code, reviewing it critically and identifying ways it could be better 
is a great skill to have. Going back to Kent Beck, when he was writing JUnit with Erich Gamma, they talked about how they read the source code 
much, much more than they actually wrote it. Studying and reviewing code without the expectation of making changes gives you a chance to see 
what impressions you can pick up from the code rather than worrying about the clock ticking in your head that tells you you need to be CODING! now.

## Deliberate Practice

A few years ago a friend introduced me to the idea of deliberate practice. I used to play a musical instrument and was well aware of the 
need to practice thank you, but he introduced me to the idea of slowing down, really practicing tiny, tiny steps and perfecting (or at least 
improving them) rather than what I used to do rushing through practice to get to the good bits. Jon Jagger actually built Cyber-dojo as a 
TDD programming environment to encourage deliberate practice. The IDE is minimalist to say the least so there is no code completion, or anything 
to help you get faster. This is by design but makes some developers really unhappy. You can use it to TDD with a group where everyone has their
own environment but can see each other's work, look at history of changes etc. It's a really powerful tool when you need to build good habits
through repetition, perhaps working on a familiar problem in a new way or an existing code kata. 

Whenever you are about to check in some code, stop and think about anything you can clean up in the code using a tiny, tiny refactoring. Make the 
change and think, is this better, is it worse? Then you can decide if you want to keep the change and commit it or throw it away and just commit the original 
code. 

Whatever you can spare to practice, that over a week, a few months, a year will amaze you have much better you can become rather than trying 3 hours
after this conference, getting fed up and never trying again!

### Getting started

There are a number of strategies for you to get started, either as an individual or as a group.

In mob/ensemble programming there is the idea of the learning hour. Spending an hour at the beginning of the day where the whole team 
come together and learn about a refactoring technique, practice a technique on some safe code, reading and discussing a piece of "good" 
code.

Actually working as an ensemble can help everyone pick up and practice evolutionary design techniques with immediate feedback from 
everyone else present.

How much time do you spend struggling with code? If you are spending a day working on a piece of code, could you spend an hour, half an 
hour, 20 minutes trying to improve? 20 minutes working on how to extract a method and give it a name? Undo and try again. Practice to 
make it an automatic thing so when you see that something can be changed, you can make the change without stressing about where in the menu 
the specific command is and you can spend time doing and undoing and evaluating whether the change makes things better or worse.

If you can't get feedback from an ensemble or a pair, ask for help from a mentor, someone you respect online or from a user group local to you.

The difference between someone with bad judgement of design and someone with good judgement is usually that the person with good 
judgement has already run a large number of "experiments" e.g. failed projects.

Bad Judgement -> Terrible Mistakes -> Good Judgement

## Example ? If we have time

## Story splitting or narrowing

## DDD

## Event Storming

## IF in doubt
Add a test
Remove duplication of knowledge (not implementation)
reduce the scope
make a better name

## When not to

If refactoring is difficult or is expensive (error prone, takes a long time to get feedback, long time to do) ED may 
not be right for you. ED is good for internal systems but be careful of evolving interfaces that other teams or customers 
rely on. Any client of you code can be affected by changes and if you don't have the power to change their code then 
any consumer of your code can make that difficult.






# Possible Lightning Talk

Also for anyone with a little bit of experience delivering software who wants to practice their mentoring skills, 
I want to just mention my work with We Think Code. It's a non-profit organization in SA that provides training for 
people who normally who not have access to university or higher education. It's a two year course and mentors are drawn 
from SA itself, and also from around the world, as counsellors to groups of about 4-6 new developers. It is a great joy
and again, if you would like to be involved or hear more about it, please let me know. 
