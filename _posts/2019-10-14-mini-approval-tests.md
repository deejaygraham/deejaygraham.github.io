---
layout: post
title: Mini Approval Testing
published: true
categories: [ csharp, music, code ]
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

### Mini Approval

Back to the automation project. This was a Selenium-based web automation project that used the Page Objects pattern to define screens and 
interact with them. One test scenario is to load a screen, pick an option and validate that all of the values on the screen in each of the 
controls is as it was in the past and any difference needs to be flagged up. That sounded like just the thing for approval tests. 

Unfortunately, the only Nu-Get package I could find required .Net Core or v 4.6.1 or greater to be the target plaform for the application. Due to 
other constraints of the project, this wouldn't be suitable so I decided to hand roll a mini approval test suite to work alongside the 
NUnit framework we had built. 

### Code 

This is what that looks like. First we need a way to record all the values of all the fields in a form's page object. The name of the MetadataObject is 
the class name of the instance and the values are name-value pairs corresponding to the controls and the value of each one as provided by 
reflecting on the page object's gettable properties. 

```csharp

{% include code/csharp/ApprovalTests-ObjectMetadata-1.cs %}

```
We also need a way to persist the metadata so the ToString method gives us the simplest possible rendering. 

If we render to a file, we need to be able to reconstruct so I added another constructor to take a list of lines read from a file:

```csharp

{% include code/csharp/ApprovalTests-ObjectMetadata-2.cs %}

```

TBC...

