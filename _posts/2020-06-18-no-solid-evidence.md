---
layout: post
title: no SOLID evidence
published: true
categories: [xp]
thumbnail: "img/posts/no-solid-evidence/thumbnail-420x255.png"
alttext: SOLID
---


### Update

<a href="https://ne-rpc.co.uk">NE RPC conference</a> went live so my video is available: 

<iframe width="960" height="540" src="https://www.youtube.com/embed/0l-kX9y5IaE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Transcript

Here is a rough transcript of my talk "no SOLID evidence" from the 
very first <a href="https://ne-rpc.co.uk">NE RPC conference</a> happening on the 19th of June.


## Intro

Hello, good morning, good afternoon or good evening. Thanks for coming to this talk. 

My name is Derek Graham and I am a principal developer at Sage in Newcastle, working on Azure Cloud in .Net and more recently with Javascript and React. 

I've been writing code for a while now and as well as my day job, I run a programming camerata for junior developers  and local .net user group "NE Bytes". 


## SOLID

What I want to talk about today is the SOLID principles, why I don't think they are a good idea and what I talk to people about when they mention SOLID. I'm not claiming to have invented anything here but this has been my experience over the last few years of being annoyed by SOLID. 

This talk originally came about from a discussion with a couple of colleagues, converted it into a haiku on twitter, then Sam asked me to try making it into a talk. 

I will try not to be the old guy shouting at clouds.

But I've noticed it in an interview context and in general dev conversation where someone will confidentally volunteer they know all about SOLID and they can maybe remember the 'S' but not anything else. 

I don't think it's really a personal failing, I think SOLID is over sold, it's confused in itself (Confused in each part, some advice, some strategy, some are goals), the academic evidence it claims is not bourne out and it's not really appropriate anymore if it ever was.  

Open Closed and Liskov particularly. Others are tautologies of two basic concepts in CS. The two Cs - Coupling and Cohesion.

They factor so heavily in this talk that I was thinking of branding the talk "Brought to you by the letter C"

SOLID is like exercise, eating healthily or writing unit tests. We all know we should do it but no one ever does :)

I also want to confess this is not a preaching kind of talk. I once had the honour of maintaining a system early on my career where one function was 7000 lines of C code so I’m definitely not pointing fingers.


## Writing software is hard

Maybe not for simple console applications and tools but for stuff we want to be around for a while, libraries, apps, products we want to be able to continue to work with them easily into the future without them becoming a mess.

Hard to keep things simple, uncluttered and flexible so that as you add code the design doesn't get harder to use and add to in the future. We know we need to organize the code so that we can find things and we know that we WILL need to make changes in the future. 

Every choice you make in writing code means that future you and your team 's work can be harder or easier depending on what you choose. Writing code is hard, reading code can be harder. We do more reading than writing but the writing has to take the reader into account.

Making a good job of that requires experience and discipline and, since programming is more art and craft than science, we need heuristics to guide us. Medicine and civil engineering are older professions and have more grounding in the real world. If you don't build a bridge correctly 
you find out pretty quickly. Or your patient dies. If you add a line of code in the wrong place, you may not find out for a long time and have people following your choice to build up a set of code that becomes unmaintainable. 


## Complication

Fred Brooks in his book “The Mythical Man Month” talked about writing software as managing two forms of complication - essential (the difficulty of the problem domain) and accidental  (where we get in our own way and write "bad" code, we don't have good support from our tools, our knowledge is incomplete). SOLID and other guidelines like it are aimed at helping us reduce accidental complexity in the code we write.

So what is SOLID?


## History 

Way back in mid 90s, Robert Martin ( who you may have heard about from the Agile Manifesto, TDD, Clean code, software craftsmanship) was discussing the 10 commandments of OOP online and proposed 11 of them! Michael Feathers identified 5 of those as making up the acronym SOLID. 

Martin went on to write articles and books (Clean *) about each one of the 5 principles.

So Robert Martin happened to be the right person at the right time and was one of the first internet influencers! 


## OOP 

At this time we are talking about writing OOP code in Java was pretty much the only game in town so SOLID sort of fitted nicely with the view of software at the time.

Object oriented programming (from early 2000s ) so maybe not so appropriate now with the world seemingly only doing javascript and OOP being less of a hot thing.


## 5 "Principles"

SRP, OCP, LSP, ISP, DIP

What's wrong with them, I can't hear you ask? Let's look at them one by one. 


## SRP

A class or piece of code should have one Single responsibilty. 

Right out of the gate, this is often discribed as “A chunk of software should have one reason to change". Not the same thing as a single responsibilty. Difficult because what we really want I think is not a single responsibility a sense of coherence in the code, that all the pieces belong there, they aren't too big and they aren't too small. It's trying I think to discourage huge classes or code files.

This principle was originally described in the work of Tom DeMarco and Meilir Page-Jones. They called it "cohesion". They defined cohesion as the functional relatedness of the elements of a module. 

“Each software module has one, and only one, reason to change” Not a single responsibility.

1996 - Meilir Page-Jones What every programmer should know about object oriented design.

This is really a coding strategy not a principle.


## OCP 

Open - Closed. Open for extension but closed for modification. This is really about writing code so that you don't depend on concrete types but instead depend on abstractions. Make software easy to extend to new behaviour without having to make lots of changes to existing code.

It's really about dealing with coupling. Coupling is a measure of how quickly your code will break if something about the code you depend on changes. Tightly coupled code may change constantly for small changes in other parts of the system. 

But not backed up by the justification. 


## Meyer's Principles

Open-Closed gets it's name from one of the 5 principles that Bertrand Meyer outlined in his OO book from the late '80s.Unfortunately, he's not talking about the same thing. Meyer is more talking about a long forgotten time, closing a piece of software by publishing an interface to a library that is shipped and never changed and strategies that you might use to mitigate that. Not talking about polymorphism, more about using inheritance to copy an existing implementation and add to it rather than processing different kinds of subclass to offer different behaviours.

OC is also in tension with YAGNI principle from XP, allowing extension where it possibly won’t ever be used. From my experience, it’s application often results in more horrible code - encourages hierarchies of code to provide openness where it’s not needed.

This is a goal for a piece of software not a principle


## LSP

Sub types can be substituted for super types. Another inheritance based principle which is really talking about the same thing as open-closed, deriving one type from another and changing behaviour in the common understanding of it. 

Unfortunately, Martin took Liskov's original research and paraphrased it to better fit the OO world but in doing that relaxed the original constraints that made it meaningful and changed what the point of the principle was. 


## Liskov

Let me say a couple of things about Liskov before I go on. Many people picture an Old Russian guy who came up with this rule in the 1800s and are surprised to find out that Liskov is a woman, Dr Barbara Liskov, an American CS researcher, who was awarded the two prizes in CS that would amount to the nobel in any other field. So much of what Liskov talked about in her early research looks super close to modern programming. 
 
Original said something like:

"Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program."

This is quite a strict constraint, much stricter than the LSP in SOLID and is really talking about being able to substitute one object for another and not being able to tell that it has happened. This is operating in a time when we didn’t have abstract data types so it’s setting up rules for that world, not really inheritance and polymorphism.

This original research came from a time when we didn't have things like abstract data types. Liskov wrote a paper in 1974 based on her research which basically invented Java, static type systems, inheritance, data hiding, exception handling, classes everything but interfaces!!

Her research programming language CLU actually invented what we now know as Generic Type Constraints in .Net

She talks about no knowing anything about the adoption of her work in SOLID until she went looking for “what was happening in modern programming” and found a load of people online debating about what she meant and whether one case or another of OO code adhered or broke her principle. She was very amused by that.


## ISP

"Many client-specific interfaces are better than one wide, general-purpose interface."

Wide interfaces may change for many reasons causing undesired changes in all the code. 

Hyrums law (Hyrum Wright) https://www.hyrumslaw.com 

With a sufficient number of users of an API,
it does not matter what you promise in the contract:
all observable behaviors of your system
will be depended on by somebody.

Don't accidentally include lots of stuff in interfaces because someone, somewhere will eventually depend on it and then the code becomes harder to change. Keep interfaces small and tighly focussed on what you are doing. Cohesion again. And Coupling because it's interfaces we're talking about 


## DIP 

Dependency Inversion. Don't depend on concrete types, depend on abstractions. We've heard this before haven’t we? Coupling

Don't create types in the body of your code - that's coupling, move stuff you need to your constructor and have them passed in by whatever invokes the code. Coupling again.

This is another coding strategy not a principle

I think all five principles can be boiled down to two concepts - both beginning with CO. Coupling, Cohesion. 

Cohesion and Coupling can often be as wooly as something like SOLID so I want to talk a little about another CO - Connascence


## Connascence

I think connascence is a great tool for thinking through coupling. Coupling is everywhere. And you can improve code not by removing it but making it stronger is some places to achieve cohesion and weaker in others to achieve decoupling. 

Two software components are connascent if a change in one would require the other to be modified in order to maintain the overall correctness of the system.

Graphic from XP Surgery Kevin Rutherford. As we go from bottom to top 
we are increasing the connascence.

Static code (easier to detect and refactor)
Name (agree on the name of something to use it - function, variable)
Type (agree on type of something, returned from a function, to create something)
Meaning (agree on what a string is, id represents)
Algorithm (agree on algorithm used - eg. encryption)
Position (one call has to follow or be used in order, height and width in correct order)

Running code (dynamic)
Executing order (make tea before drinking it) locking e.g.
Timing (timeouts in network)
Value (two values are related) invariance
Identity (two components reference the same object)

Refactoring successfully should take code from more red area down to greener area. More than one form of connascence can occur in the same piece of code.

Imperfect measure but we can look at several factors:
strength - how hard to refactor or discover
locality - how far apart components are. Far apart should be weak. Strong in same function, module etc. 
Degree - size of impact, connacsecnt with one or thousands.


## Simple Design

Lastly I want talk about a set of guidelines from Kent Beck (he didn't invent them) called the 4 elements of simple design which I think make more sense and are more memorable than SOLID.

According to Kent Beck Simple software is…

– Appropriate for the intended audience. The people that have to work with it have to understand it
– Factored. No duplication of logic or structure (knowledge). Structure duplication is preferable to knowledge duplication (Sandi Metz).
– Communicative. Every idea that needs to be communicated is represented in
the system
– Minimal. The system should have the fewest elements possible

This isn’t a good acronym but I think it can be simplified into a better form that many of you may have seen before:


- Passes all tests (refactoring, documentation) it should have tests. Making your code testable is a Good way of making looser coupling and improving coupling
- Minimises duplication - duplication of knowledge not duplication of code (implying inheritance)
- Reveals intent (least astonishment), naming, meaningful abstractions - Reading more than writing. Accurate description you can trust.
- Has fewest elements to maintain other rules. 

This is cyclic because improving naming helps with abstraction and shows higher level duplication, factoring out duplication in knowledge means new structure emerges that you have to give a name to the new thing. Which means you can discover more about the code, new tests emerge or tests and code are removed (simpler) and you go around again. 

Once you have code that works and keeps working, tests should keep themselves passing if you run them frequently enough. Simple should also take care of itself because you are improving clarity and removing duplication where possible. 

The thing about clarity and duplication is that the majority of that comes down to finding the right names for things. Identifying when names don’t match the thing they are describing or you have names which are at odds with each other - e.g. business domain concepts butting up against database concepts or machine specific concepts. All hints that the code is not in the right structure or the names are not correct. 

This is the major thing I am known for in code reviews, pulling names apart and trying to find the correct name for the thing under consideration because I think it is so important. 

A few months ago, I was pairing with a colleague and we had no clue how to solve a problem other than a vague idea. We started out with a set of code to modify and by inspecting names and changing them into increasingly more fitting names as we went, we understood better what the solution looked like and improved the code so that the eventual solution looked like it had been carefully designed by a genius. 


## Wrap Up

So it’s been a bit of a rollercoaster - we’ve gone from 5 principles which aren't really principles, no on can remember, least of all apply them. We thinned them out into two concepts - Cohesion and Coupling - then 1 in Connascence. Then we made it more complicated by considering 4 rules for simple design but they actually became two concepts - removing duplication and improving clarity. I think that’s a fairly good place to stop and is fairly memorable but we could go one further step and say that we get most benefit from improving the names we give things So 5 to 2 to 1 back up to 4 back to 2 then 1.

Unfortunately I don’t have a good memorable acronym so I’ll stop there.
