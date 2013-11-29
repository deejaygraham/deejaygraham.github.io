---
layout: post
title: What the World Needs Now is Another IoC project
published: true
tags: [IOC, tdd, open source]
---

Ok, I admit it. In a moment of weakness I created an IoC framework, br**IoC**he. I am a bad person.

I didn't do it because there aren't already enough out there. It was just something I've never done and wanted to see how 
easy/difficult it was to create a minimal viable, simplest-thing-that-could-possibly-work framework which was just enough 
to support the requirements I had at the time. 

Turns out **it was** easy!

Here's the [github repo](https://github.com/deejaygraham/brioche).

To use it, create a type registry object and an instance creation object:

````
var typeRegistry = new SimpleTypeRegistry();
var instanceCreator = new ResolvingInstanceCreator(typeRegistry);
````

Then set up the type container depending on whether you want to auto-discover all the composable types we can find:

````
var container = new AutoTypeContainer("MyNamespace", typeRegistry, instanceCreator);
````

or add types manually:
 
````
var container = new TypeContainer(typeRegistry, instanceCreator);
````

and register the types you will need:

````
DependencyInjection.Container.Register<ISpeak, Cat>();
DependencyInjection.Container.Register<ISpeak, Dog>();
DependencyInjection.Container.Register<ISpeak, Parrot>();
DependencyInjection.Container.Register<ISpeak, Hydra>();
````

Then set the IoC container:

````
DependencyInjection.Container = container;
````				

Then when you need to create a type:

````
var speaker = DependencyInjection.Container.Resolve<ISpeak>();
speaker.Speak();
````

Simple.



