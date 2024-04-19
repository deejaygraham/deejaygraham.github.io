---
permalink: 2022/06/22/testing-all-the-things/
layout: post
title: Testing All The Things
published: true
tags: [ tdd ]
thumbnail: /img/posts/testing-all-the-things/thumbnail-420x255.png
alttext: screenshot
---

Talking to my new group of mentees for the year we began by talking about user stories (and why 
not to use the "As a .... I want ..." template), TDD and BDD, integration and unit tests. 

After this discussion, I mentioned that integration and unit are not the only kinds of tests possible 
and thought I would quickly brain dump as many useful ones as I could come up with.

## Micro Tests 

Borrowed from GeePaw Hill, I like microtests as an idea because we often are testing a small chunk of 
functionality that may cover more than one function or small collection of classes, where the 
more traditional "Unit Test" leads to debates about what even is a unit and how do we test a single 
class or method. Microtest seems to much more convey the intent without the ambiguity.


## Integration Tests

Testing how larger chunks of a system work together or even how the whole system works in an end-to-end 
scenario. Again creeping ambiguity here. 


## Walking Skeleton

Similar to the integration test, a walking skeleton is the smallest bit of functionality built into a working 
application, taking in a tiny slice of all of the layers or levels of code required. E.g. some mix of command line
of UI, some business logic, some database retrieval, some file handling, all to do one tiny bit of the application
and to prove that everything works together but in a very rough, unpolished fashion. 


## Contract Tests

We use contract tests to establish the behaviour of an external system, a service or an API that we wish 
to interact with in normal running but don't want to have to talk to from inside the tests. Contract tests 
let us specify the parts of the behaviour that we care about and find out what is and isn't supported as input 
and provided back as data by the service, any exceptions it might throw etc. Part of this validation may require 
looking into another system, database etc. to check that the data has been correctly handled.

We often write the contract tests against a simplified API that captures the parts we intend to use and ignores 
the others. We can then use this concrete implementation to derive an interface so that we can build a mocked or 
stubbed in-memory implementation for tests. 

The contract tests can then be used periodically to check that the fake and the real service are in agreement and 
highlight any changes we are not immemdiately aware of in version upgrades.


## Characterisation Tests

Characterisation tests are used to experiment and find out about a system when there is insufficient or no documentation 
or it's unclear how a system will behave in certain circumstances.


## Approval Tests

Useful for situations where the code you inherit is sufficiently "legacy" that you don't know how to add tests or have
low confidence in changing the code without breaking something. Approval tests can be added fairly easily so that an 
external file can be created of known good output data when the program is run and that is used as a "golden master" 
to judge the output from running the program after changes have been made. Differences in the output indicate that 
there is something accidentally changed. 


## Acceptance Tests

Usually a set of automated scripts that run the application end to end and validate that the things that the customer cares 
about are actually implemented correctly. This can be arranged, like in BDD, where it's essentially a list of features and 
scenarios that, when the application is finished, will all show green passing status and the project can be tracked by 
how many things in the list are unresolved and how many are completed/green.


## Finally

As always, software (including tests) is a libability not an asset so tests that don't serve the needs of the project 
should always be removed.

