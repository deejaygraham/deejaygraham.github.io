---
layout: post
title: Knapsack Packing
published: true
categories: [ csharp, code, tdd ]
thumbnail: img/posts/knapsack-packing/knapsack-packing-420x255.webp
alttext: packing
---

The <a href="https://en.wikipedia.org/wiki/Knapsack_problem">knapsack problem</a> came up the other day when I 
was thinking about how best to "defrag" a set of objects that are added and removed over time with the overall 
effect that one day the objects are scattered throughout an area when they could be rearranged to 
<a href="https://en.wikipedia.org/wiki/Packing_problems#Packing_squares"> fit</a> into a 
<a href="https://en.wikipedia.org/wiki/Bin_packing_problem">smaller area and save cost</a>.

## Box

~~~csharp

{ % include code/csharp/Knapsack-Box.cs %}

~~~

## Bin

~~~csharp

{ % include code/csharp/Knapsack-Bin.cs %}

~~~

## Greed

After some reading up on the problem, I thought that the greedy approximation algorithm proposed by George 
Dantzig would do the job. This algorithm takes a list of the objects, sorted by decreasing order of "size", 
then tries to insert the largest object into the first container and continues with the next largest until there 
is no more room for that object (but there may be room for smaller objects). 

We create a new container for the object that wouldn't fit into any of the other containers and add it there. 
Every time we try to fit an object, we start at the first container and test them all until we find a space, 
then continue with the next largest. 

## Setup 

For our purposes, I have set each container or bin to have a fixed size. Each box is allocated a random size between 
1 and the maximum size of the bin. 

~~~csharp

{ % include code/csharp/Knapsack-Setup.cs %}

~~~

## Statistics

For testing purposes we need a random ordering of the items to begin with some randomly assigned boxes and 
containers or bins with a calculable wastage score. 

~~~csharp

{ % include code/csharp/Knapsack-PrintStats.cs %}

~~~

## Setup 

~~~csharp

{ % include code/csharp/Knapsack-RandomAllocation.cs %}

~~~

Since the random allocation may not fill up all the bins, we remove any completely empty bins so we don't skew 
the figures too much. 

After testing the random allocation for a few samples, rough figures are about one quarter of the bins are 
fully allocated and the remaining three quarters are partially allocated and with wastage (empty space 
in bins) for 800 boxes measured in the low thousands.

## Greedy 

Running the greedy approximation algorithm, first sorting the list into decreasing sizes, we allocate to bins in order 
of fit and create new bins as appropriate.  

~~~csharp

{ % include code/csharp/Knapsack-GreedyAllocation.cs %}

~~~

## Results

After running the algorithm, the stats say that we save about 25-30% of bins and have wastage of zero or one bins and 
typically in single figures for wastage of free space units across all the bins.  

