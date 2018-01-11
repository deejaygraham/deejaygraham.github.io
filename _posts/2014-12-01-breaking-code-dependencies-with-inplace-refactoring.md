---
layout: post
title: Breaking code dependencies with inplace refactoring
published: true
tags: [ tdd, csharp, refactoring ]
---

There's a common symptom of monolithic applications that I see fairly
frequently. First, a developer writes a simple little program to solve a
simple little problem or to plug a little gap in a solution.

Because it's just a simple app, not much attention is paid to separation
of concerns, cohesion or any of the other Good Things we should be doing
all the time.

If they and the application are lucky, the application will be useful and
requests for new features and modifications will come in from its users.
What started as a small utility is now blossoming into a bigger project and
a bigger problem.

## Crufts
By the time the project begins to reach to multiple files, multiple classes,
configuration files, databases, multiple developers stretching out over time
it is starting to suffer from accumulations of [cruft](http://en.wikipedia.org/wiki/Cruft).
Anyone who works on the application is happy to add code, perhaps by copying,
pasting and modifying, but not many are confident about refactoring when the
code begins to scream out for it.

A monolithic application, for my purposes here, is definded as a single executable
containing lots of functionality, perhaps in Windows Forms code-behind style,
that cannot be unit tested.

## Refactoring
Refactoring this kind of application can be challenging because you want
to identify repeated pattens in the code and extract them into separate methods
or classes, break out dependencies, factor out interfaces, separate concerns.
Classically, we would extract code into a separate assembly and point the
application and our new unit tests at that new assembly.

Of course, to refactor code we need to be as confident that we can be that
we are not going to break the existing functionality.

But what happens if the code has been written in "utility" style with large "god"
classes, implicit dependencies and mixed responsibilities? We may not be able
to do a straight extract without breaking lots of dependent pieces or dragging
along code which does not belong in the new "clean" assembly. Often, if UI
and business logic are intertwingled in the same code, we don't want to bring
the UI code with us into the new, refactored code.

Add to this, the majority of the unit test frameworks I have used don't
support testing code in executables.

## In-Place Refactoring

One way around this is to use an inplace refactoring technique. I've used this
a number of times, so thought it was time I captured it in a gist.

Basically, I wrote a tiny, super-simple unit test framework that can be added
to a project as a single .cs file. As part of the framework, I am "spoofing" a
very lightweight facsimile of the client code-facing attributes and Assert
statements found in MsTest or NUnit.

In this way, you can create the tests in your application so, at the source
code level, they look like they are targetting your favourite framework (but
you're really using the inplace, lightweight one). When you come to move the
code into a separate assembly and are ready to use the real framework, the
test code shouldn't need to change and you just need to add the correct references.

## The Process

Step 0 in this approach is to include (copy and paste is your friend in this situation)
the code below somewhere in your application and call it from your "main" method.
The next step is to identify some candidate functionality that could be refactored. Wherever this
code happens to be, create a test for it in a separate method, named and attributed
as if targetting your favourite unit test framework. Continue identifying and writing tests
in place until you have built up a description of the current functionality in small tests
inside the application. With all the tests passing, we can begin to refactor:
breaking dependencies; inserting interfaces; extracing methods; renaming etc. all while
making sure the tests still pass.

Each time you want to run the tests, run the application and the tests run too.
Leave all of the code in the application, don't be tempted to move anything out
into another assembly yet.

## Crunch Time

Once you are happy with the new structure, you can copy and paste the tests into
a test assembly, copy the refactored code into separate assembly and point both the
tests and the until-recently-monolithic-application at it. Delete the inplace test
framework (or comment out if you want to do more refactoring). Remember to include
references to your targetted unit test framework in your moved tests.

This technique has helped me more than once so I hope someone else finds it useful.

## Code

<script src="https://gist.github.com/deejaygraham/758be0abcea99f122c4c.js"></script>
