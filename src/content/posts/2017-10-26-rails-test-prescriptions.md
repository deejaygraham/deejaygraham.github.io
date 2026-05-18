---
title: Rails Test Prescriptions
tags: [code, books, pragprog]
---

Here are my comments on the technical review for [Rails 5 Test Prescriptions](https://pragprog.com/titles/nrtest3/rails-5-test-prescriptions/) 
by Noel Rappin. 

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

