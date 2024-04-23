---
permalink: 2015/04/10/mocking-multiple-return-values-with-rhino-mocks/
layout: post
title: Mocking Multiple Return Values with Rhino Mocks
published: true 
tags: [ tdd ]
---

It's been a while since I've found the need to write unit tests using any 
kind of mocking framework. It always feels a little like cheating to me, like 
the design is better broken down into smaller chunks and I'm really just 
ignoring something my code is trying to tell me. That was until my current 
project really needed it to allow a complicated piece of coordinating glue 
code to be tested to make sure it was coordinating the right things in the 
right order. 

Having used [Rhino Mocks](http://hibernatingrhinos.com/oss/rhino-mocks) 
before I fell naturally into using the 
	

{% highlight "csharp" %}	

	MockRepository.GenerateMock<IMyInterface>() 

{% endhighlight %}

	
syntax.

Everything was going nicely until I found I needed to do a bit of conditional logic 
where the first call to a method needed to return false (stuff is not setup, so 
please do the work for me) and the next call needed to return true (the pre-work 
is done, move on to the next stage). I thought this might mean a nasty bit of 
involved logic but I was surprised to find Rhino gives you this *Repeat* control 
relatively easily.


{% highlight "csharp" %}	

	var mockRepo = MockRepository.GenerateMock<IMyMultiStageInterface>();
	
	mockRepo.Expect(r => r.WorkHasBeenDone()).Return(false).Repeat.Once();
	mockRepo.Expect(r => r.WorkHasBeenDone()).Return(true);
		
{% endhighlight %}	
