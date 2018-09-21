---
layout: post
title: NUnit Test Actions for Great Good
tags: [ code ]
published: true
---

Lots of c# unit tests I see build up a set of abstract base classes to allow for things like setting up common environments and handling 
common startup and teardown tasks. This is never a good approach, in my opinion, and can lead to some difficult workarounds due to the 
high level of coupling this implies. NUnit has a better approach by allowing a text fixture or method to be decorated with a custom 
attribute that allows code to be run before and/or after all the tests in that test fixture or just the one affected test method. 

~~~cs 

{% include code/csharp/nunit-testaction-use.cs %}

~~~

~~~cs 

{% include code/csharp/nunit-testaction-attribute.cs %}

~~~

Now rather than having all that coupling to a base class, if you decide your test no longer needs the housekeeping, you remove the attribute 
and nothing else changes.
