---
layout: post
title: Another IOC project
published: false
tags: [IOC, tdd, open source]
---

Ok, I admit it. In a moment of weakness I created an IoC framework. I am a bad person.

I didn't do it because there aren't already enough out there. It was just something I've never done and wanted to see how 
easy/difficult it was to create a minimal viable, simplest-thing-that-could-possibly-work framework which was just enough 
to support the requirements I had at the time. 

Turns out it *was* easy!

To use it, create the type of container first:

InversionOfController.Container = new DefaultContainer();

Then register the types you will need:

InversionOfController.Container.Register&lt;ITalkingAnimal, Parrot&gt;();
InversionOfController.Container.Register&lt;ITalkingAnimal, Dog&gt;();
InversionOfController.Container.Register&lt;ITalkingAnimal, Cat&gt;();

Then when you need to create a type:

var animal = InversionOfController.Container.Resolve&lt;ITalkingAnimal&gt;();

Here's the [github rep](https://github.com/deejaygraham/brioche).

