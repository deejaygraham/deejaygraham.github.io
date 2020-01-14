---
layout: post
title: Test-Driving a File System
published: false
categories: [ csharp, code, tdd ]
thumbnail: img/posts/testable-filesystem/testable-filesystem-420x255.jpg
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


### Box

~~~csharp

{% include code/csharp/Knapsack-Box.cs %}

~~~

### Bin

~~~csharp

{% include code/csharp/Knapsack-Bin.cs %}

~~~

### Greed

After some reading up on the problem, I thought that the greedy approximation algorithm proposed by George 
Dantzig would do the job. This algorithm takes a list of the objects, sorted by decreasing order of "size", 
then tries to insert the largest object into the first container and continues with the next largest until there 
is no more room for that object (but there may be room for smaller objects). 

We create a new container for the object that wouldn't fit into any of the other containers and add it there. 
Every time we try to fit an object, we start at the first container and test them all until we find a space, 
then continue with the next largest. 

### Setup 

For our purposes, I have set each container or bin to have a fixed size. Each box is allocated a random size between 
1 and the maximum size of the bin. 

~~~csharp

{% include code/csharp/Knapsack-Setup.cs %}

~~~

### Statistics

For testing purposes we need a random ordering of the items to begin with some randomly assigned boxes and 
containers or bins with a calculable wastage score. 

~~~csharp

{% include code/csharp/Knapsack-PrintStats.cs %}

~~~

### Setup 

~~~csharp

{% include code/csharp/Knapsack-RandomAllocation.cs %}

~~~

Since the random allocation may not fill up all the bins, we remove any completely empty bins so we don't skew 
the figures too much. 

After testing the random allocation for a few samples, rough figures are about one quarter of the bins are 
fully allocated and the remaining three quarters are partially allocated and with wastage (empty space 
in bins) for 800 boxes measured in the low thousands.

### Greedy 

Running the greedy approximation algorithm, first sorting the list into decreasing sizes, we allocate to bins in order 
of fit and create new bins as appropriate.  

~~~csharp

{% include code/csharp/Knapsack-GreedyAllocation.cs %}

~~~

### Results

After running the algorithm, the stats say that we save about 25-30% of bins and have wastage of zero or one bins and 
typically in single figures for wastage of free space units across all the bins.  

