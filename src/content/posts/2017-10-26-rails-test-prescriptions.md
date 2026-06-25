---
title: Rails 5 Test Prescriptions
tags: [code, books, pragprog]
---

<img src="/assets/img/posts/rails5-test-prescriptions/rails5-test-prescriptions.jpg" alt="Book Cover" />

Here are my comments on the technical review for [Rails 5 Test Prescriptions](https://pragprog.com/titles/nrtest3/rails-5-test-prescriptions/) 
by Noel Rappin. I got access to the manuscript in two parts, the first bit was early chapters in July/August and then 
an update with fixes and additions in September/October. 

For the first part: 

### Introduction

Talking about surface area of the code in Test First Design, I think that the more
clients a piece of code has, the more flexible and general (cohesive, low coupling etc)
it becomes which is why libraries tend to be better factored than monolithic applications
and why TDD code is better for having tests and the application as clients. The tests
have one perspective, the application another.

When TDD needs some help - Spikes are not canonical TDD technique, they are an XP technique
so not dependent on whether you write tests or not.

Towards the end of the introduction, Noel mentions tests not being appropriate for some complex
areas of code. In my experience the complex pieces can be written Test First from the inside
out via temporarily public methods and when complete, the tests can be deleted or commented out
in case the code needs to be worked on again in the future (chapter 3 alludes to this).


### Chapter 1

I found the explanation and diagram of the initial RSpec test to be very useful,
I have found some developers have problems understanding the fluent style when seeing
it for the first time and it looking a bit like magic. Also the fuller description of
how spec file execution finds the code, setup, running code etc. was a good overview of
the process.


### Chapter 2

Chapter 2 seems to get complicated quite quickly and feels like the good habits that you have
been espousing in the previous chapter go out of the window to fit the Rails way of
structuring the MVC world with ActiveRecord and Controllers. I would like to see some discussion
of other ways to do this so that the object model is not tied so tightly to one web
framework making other choices much harder later (or maybe for later chapters to come?). Lots of
developer take on board the simplest way of writing an application using inheritance to
share code and lose the benefits of lower coupling and some agnosticity from the particular
technology framework. Often the quicker solution leads them to think they will be done
sooner just by implementing easiest way and then why do you need TDD? Ideas on how to
avoid falling into this trap?


### Chapter 3

Good advice to keep tests simple and clear without cleverness. Was going to mention the Kernighan
quote about debugging but you beat me to it :)


### Chapter 4

Continuing with the better style of imperatively named tests - specification of what the
code does when well behaved - rather than "it should..." which implies a very weak opinion
or optional behaviour.


### Chapter 5

Good advice about abstracting time functions replacing or using relative times. Beware of
relative times that cross month and year or leap year/second boundaries and can make tests
fail only very occasionally but lead to lots of hunting for bugs.

I don't have any specific feedback for Chapters 6 & 7, nice to see those topics included and
both seem to covered in good detail, especially using cucumber. I know a tester who could
have done with the advice section a few months ago. I am looking forward to seeing
the coming chapters.

----

After additions: 


I'm really glad to see that testing has been split up across all of the levels in a conventional 
app and I think there's a lot to get to grips with in the whole book but I can't find fault 
with any of the advice or the approach. I do think there are a dizzying array of technologies and tools that 
the less experienced developer will probably find confusing (as Noel notes in the chapters about 
JavaScript) but unfortunately that's the state of things at the moment and not really anything 
that Noel can do much about. From polling some opinions of junior devs and some of the web 
automation teams where I work, I think it will need some careful reading and study and isn't the kind of text 
that you can skim for ideas - and that's not a bad thing!

On the subject of study and reviewing later, I'd like to make a suggestion for an appendix (or 
wherever you think suitable). I found the "prescription" boxes were very useful summaries when reading through the text
first time but I didn't see anywhere where they were collected together. I would like to see 
a list of them (with page numbers or chapters names?) so that I can use it as a quick refresh and, say 
6 months after reading, I can quickly find a piece of advice and the surrounding context without having to 
trawl through the paper copy.

I do still have some issues with test naming in the book. A lot of them do talk about the concrete 
intent of the test but there are still some which are a little wooly. For example, in Chapter 10, 
in the first set of tests, the last two tests use very general "handle" that doesn't say what the behaviour 
should be without reading through the code - should it warn, 
ignore? Developers will use these examples of how to write and name tests so it's critical to model
good naming for when they come back to the book and use it as a reference for how to do it.

The chapter on security was a welcome addition but I felt like the other parts of security, cross 
site scripting, replay, injection attacks were given minimal coverage compared to the more obvious 
authentication and authorization sections. If not including anything about this, it might be better to move the 
section about other security resources and OWASP to the front of the chapter to at least make people aware 
that this is a bigger area than given space in the book. The danger is that you can test for the headline 
issues in Chapter 13 but totally miss the last section or skip it - I initially read it as a skippable "if you 
have more time" section and I think it needs more attention than that (but full marks for having something 
about security).

One thing that was unanswered by the security code and occurred during my reading, Noel doesn't say 
anything about existing sessions. Running the test once will log into the application but is the user explicitly 
logged out or will it happen when the session expires? Does running the tests twice in quick succession (and maybe 
running in random order) accidentally allow you to access resources that you shouldn't when not "logged in" but with 
a valid session in the background. False positives or negatives?

