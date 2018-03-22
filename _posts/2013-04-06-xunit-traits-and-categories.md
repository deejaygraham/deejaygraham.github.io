---
layout: post
title: XUnit Traits and Categories
published: true
categories: [ tdd, code ]
---

One of the things I love about [xUnit.net](xunit.codeplex.com) is how small
the feature set is while allowing you to extend it with the minimum of effort.

One project had a number of [**bad** unit tests](http://www.artima.com/weblogs/viewpost.jsp?thread=126923) 
that needed to touch the file system - write a file and then read it back in.
The functionality I wanted to test was interesting enough to warrant a set of tests
and yet if I stubbed out the file system part I was removing most of the value
from having the tests in the first place.

The thing to do in this case is to segregate the tests into *fast*, genuine 
unit tests and *slow, nasty, evil* integration tests. One approach is to build
them into separate assemblies and run them as two separate tests.

The other approach is to put them into categories and run them according to the 
context. Perhaps, all tests are run on a developer's local machine and only the
fast unit tests are run in an automated build.

In xUnit, this segregation is achieved using a *Trait* attribute. xUnit test runners 
can filter tests based on the name "Category".

I created a set of *traits* to be applied to fast and slow unit tests as appropriate.

{% gist 11375398 %}

