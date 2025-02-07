---
permalink: 2018/08/24/refactoring-away-from-static-code/
layout: post
title: Refactoring Away from Static Code

tags: [code, refactoring]
---

A common problem with many c# codebases I see is a lot reliance on static classes and
developers who say "we can't unit test our code because we need static classes to make it easy
to do stuff". This is the kind of code where you see static constructors and singletons are everywhere.

For example, a logger class which instantiates a Windows event log object in the static constructor
but could just as easily created a new file, read from a file or made a network call to initialize code
before we have a chance to intervene for testing purposes.

```csharp

{% include 'code/csharp/static-logger-class.cs' %}

```

There is a little refactoring that we can use to make this situation a little bit more testable while still
preserving the horrific static outer we present to the world. I don't
know if there's an official term for it but I like to think of it as splitting the code into a testable
core object, containing the subtle code we are worried about, and a static wrapper that we are fairly
sure we won't mess up.

Bit by bit we can create a new instance of a core class and gradually move properties and methods across to
that class, forwarding those static calls to the instance we create in the static constructor.

```csharp

{% include 'code/csharp/instance-logger.cs' %}

```

This way, we can write tests against instances of the core class and be sure the functionality is what we
expect but also preserve the interface to the outside world with the simpler implementation in the static wrapper
class via delegation to the core.
