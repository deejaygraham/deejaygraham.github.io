---
permalink: 2019/11/19/refactoring-away-from-static-constructors/
layout: post
title: Refactoring Away from Static Constructors
published: true
tags: [ csharp, code, tdd ]
thumbnail: img/posts/refactoring-away-from-static-constructors/static-constructors-420x255.webp
alttext: static
---

One of the great barriers to making code testable is the idea of the static constructor. This is a constructor for a class which 
is usually put in place to initialize a finite, shared resource so that any instance of the class can use it. I've usually seen 
this in database connections, service client instances, any sort of place where we don't want to be creating lots of different 
copies of essentially the same thing. 

Imagine a telemetry service in which we need to create a connection to a client library. The static constructor version 
would look like this.

~~~csharp

{% include 'code/csharp/Static-Constructor.cs' %}

~~~

Unfortunately, because this constructor code is invoked as soon as anything about that class is touched by other code, unit tests 
which might want to sneak in and replace a concrete (think database, network, file system) connection with a fake or a mock, end up 
invoking the real code (perhaps causing an exception) before they can do their work and make the code safe to test. 

We also have a problem if the static constructor doesn't have all of its needs met at the time it is invoked. The CLR will try to run it 
the first time and will throw a TypeInitializationException (and maybe deadlock itself if there are blocking operations involved). This can 
be extremely difficult to diagnose at runtime and what's more the CLR won't try to run it again after the first failure. We have effectively 
a zombie static class that can't be used.  

A slightly nicer pattern, if we have to use static instances of services is to use make the class in question instance based without a static 
constructor and wrap it with a static initialization function in a factory. This may provide a stepping stone to a better, more explicit 
initialization sequence and more opportunities to refactor the static code into instance based code. 

~~~csharp

{% include 'code/csharp/Static-FactoryWrapper.cs' %}

~~~

Interposing a factory-like object which takes up the static-ness allows us to unit test the interesting instance of the internal class while 
maintaining a simple version of the factory whose only responsbility is creating and maintaining the instance and providing access to it 
to its clients. 

The final thing to mention about static constructors is that this feature of the language seems to trip up less experienced developers 
with a high degree of regularity. It seems they are difficult to reason about in code and the initialization in a method is, in my experience, 
easier for everyone to understand and diagnose faults when they occur without lots of head scratching.

