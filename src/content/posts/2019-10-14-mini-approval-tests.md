---
permalink: 2019/10/14/mini-approval-tests.html
layout: post
title: Mini Approval Testing
published: true
categories: [ csharp, code, tdd ]
thumbnail: img/posts/mini-approval-tests/mini-approval-tests-420x255.webp
alttext: mini-approval-tests
---

I always learn a lot from <a href="https://twitter.com/emilybache">Emily Bache</a> everytime I hear her speak or read her blog. 
Recently on an automation project we needed the idea of an assertion that wasn't really an assertion or the ability to make 
more than one assertion in a block so that a test wouldn't stop on the first error but would report on all failures or differences 
at the end of test was raised by the team. 

After some digging, I found <a href="http://coding-is-like-cooking.info/2019/08/approvals-and-mutation-testing/">Approvals and Mutation Testing</a> 
and the idea of approval testing. This is the idea that, even if you don't know anything about a "legacy" software system, you can create a 
kind of image of the output of the program at some level and treat that as a golden copy so that any changes you make to the code must still conform 
to that output and any deviations are reported as differences and ultimately errors. 

This way, you are free to experiment and refactor and know that, even if you don't a proper set of unit tests, you have got a reference point 
to compare your changes against. Hopefully, the unit tests can evolve as you refactor the code to be more amenable to testing. 

## Mini Approval

Back to the automation project. This was a Selenium-based web automation project that used the Page Objects pattern to define screens and 
interact with them. One test scenario is to load a screen, pick an option and validate that all of the values on the screen in each of the 
controls is as it was in the past and any difference needs to be flagged up. That sounded like just the thing for approval tests. 

Unfortunately, the only Nu-Get package I could find required .Net Core or v 4.6.1 or greater to be the target plaform for the application. Due to 
other constraints of the project, this wouldn't be suitable so I decided to hand roll a mini approval test suite to work alongside the 
NUnit framework we had built. 

## Code 

This is what that looks like. First we need a way to record all the values of all the fields in a form's page object. The name of the InstanceSnapshot is 
the class name of the instance and the values are name-value pairs corresponding to the controls and the value of each one as provided by 
reflecting on the page object's gettable properties. 

```csharp

{% include 'code/csharp/ApprovalTests-ObjectMetadata-1.cs' %}

```
We also need a way to persist the snapshot so the ToString method gives us the simplest possible rendering. 

Conversely, if we render to a file, we need to be able to reconstruct so I added another constructor to take a list of lines read from a file:

```csharp

{% include 'code/csharp/ApprovalTests-ObjectMetadata-2.cs' %}

```

## Compare

Now we can create snapshots from objects and persist them, we should compare them. First something to capture the differences - the property name, 
expected value from the original object and the actual value from the new object:

```csharp

{% include 'code/csharp/ApprovalTests-Difference.cs' %}

```

And the compare method so we can compare an existing "golden" image of an instance with a new instance from the test.

```csharp

{% include 'code/csharp/ApprovalTests-Compare.cs' %}

```

We use Intersect to determine the common set of properties by name and those that exist in only the original object or the new object using the 
Except method. We further examine the common properties to check for differences in value. 

## Assert

The output is then a list of differences. If there are no differences the list is empty, if there are, they can be submitted to your test 
framework of choice to generate test errors. In this case, NUnit.


```csharp

{% include 'code/csharp/ApprovalTests-Assert.cs' %}

```

## Tiny

That's the majority of this tiny framework. Still outstanding is some functionality to create a snapshot if there is not one already available and 
persist it to a file so that it can be checked in to source control as the golden image for that test scenario, ready for the next test run. This can 
all be wrapped up in a handy class called Approve so we can use it to approve and instance of a class for a given scenario. 

```csharp

{% include 'code/csharp/ApprovalTests-Approve.cs' %}

```
I included an optional hint parameter to the Instance method so we can distinguish between difference scenarios for instances of the same type 
because, in this example, we don't want to confuse a person in an initial state with one where they may have changed state by reacting to a message.
