---
permalink: 2019/11/22/testable-filesystem/
layout: post
title: Test-Driving a File System
published: false
tags: [ csharp, code, tdd ]
thumbnail: /img/posts/tdd-filesystem/thumbnail-420x255.webp
alttext: filing
---

Michael Feather's definition of a unit-testness is such that a unit test shouldn't touch the network, 
database or file system. Bu what happens if your application is all about files and folders? Should we give up 
on trying to test it?

Lots of code I come across aspires to single responsibility but often forgets about the file system as an externality 
and a dependency. It's true that this type of code is harder to unit test and often fails because a file doesn't exist 
on the build server (works on my machine syndrome), or that test code can't delete or write to a temporary file 
somewhere on disk. 

Code like this that needs to read or write files, copy directory contents etc. usually gets declared 
"un-unit-testable" and removed from the testable surface area of the project. 

Like email, files and directory processing have a way of propagating through a codebase almost as given artifacts that 
can't be abstracted. If this untouchable nature of the file system persists and finds its way into other areas of the code, 
more and more of the testable surface area of the code is degraded or removed. Not just where explicitly used in code you are 
trying to test but in code that this code depends on, down to several layers. Having an untestable file system means that tests 
may pass or fail unpredictably depending on the machine environment they are run under and once it gets bad enough developers 
can give up with the idea of testing any of their code because it seems like an intractable problem. 

Much of the advice given to counter the effect of coupling to the file system like this is to hide the class using the files 
behind another abstraction. In general, this is good advice, we should be trying as much as possible to make technology agnostic 
choices that don't depend on a particular IO. Sometimes, though, the problem domain *is* the file system and it makes no sense to 
abstract that away behind an artificial domain class where we have to pretend that files and directories don't exist. 

What to do in this last case? Make a fake, testable file system, of course!


### IFileSystem

First I think we need some sort of single entry point where we can pick up which - real or fake - instances of the file system we will be working with, for unit tests or for production. 

To me, that seems to call for a File System object as a "root" of all other operations. An interface that we can pass to another 
class that can be implemented as real or fake or mocked. 

So, an IFileSystem that can tell us if a high level directory exists as a way to kick things off.

{% highlight "csharp" %}

{% include 'code/csharp/TDD-FileSystem/IFileSystem-1.cs' %}

{% endhighlight %}

and a rough test-as-spec...

{% highlight "csharp" %}

{% include 'code/csharp/TDD-FileSystem/IFileSystemSpecs-1.cs' %}

{% endhighlight %}

Here I'm using a library called NSubstitute to help me define what the shape of these initial interfaces should look like using 
mocks (the only use case for using mocks in my opinion). Essentially, it's a noop test that just gets our feet wet with defining what the interface should be.

That looks like how we would want the simplest sort of use case and it's then easily translatable to an actual implementation. 

{% highlight "csharp" %}

{% include 'code/csharp/TDD-FileSystem/LocalFileSystem-1.cs' %}

{% endhighlight %}


## Finally

Some of this was an exercise in TDD-ing a file system as plainly as possible. There are other implementations available - one that didn't work for me with my particular environment but looks very good for other contexts was <a href="https://www.nuget.org/packages/System.IO.Abstractions/">System.IO.Abstractions</a>. 

