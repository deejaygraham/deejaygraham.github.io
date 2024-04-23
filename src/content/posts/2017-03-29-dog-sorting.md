---
permalink: 2017/03/29/dog-sorting/
layout: post
title: Dog Sort
published: true
tags: [ csharp, code, tdd ]
thumbnail: /img/posts/dog-sorting/dog-sorting-420x255.webp
alttext: sorting
---

You've heard of bubble sort and insertion sort and all the other sorts of sorts. But what about sorting and grouping 
your favourite dogs?

I was experimenting with the IEnumerable.GroupBy function and was trying to come up with an abstract (non-work related), yet 
understandable example. And who doesn't like dogs? So I thought, what if we had an arbitrary list of dogs that we 
identify by name, breed and age. 

{% highlight "csharp" %}

{% include 'code/csharp/GroupBy-Dog.cs' %}

{% endhighlight %}

and a list of dogs at random...

{% highlight "csharp" %}

{% include 'code/csharp/GroupBy-DogList.cs' %}

{% endhighlight %}

Is there a way to group them into sets according to whatever criteria need. Ordinarily, I've seen code where we create one 
list per grouping then for-each around the list of dogs, select using the criteria and add to whichever list. This isn't 
very scalable since you have to create one list per grouping ahead of time and manage the complication of deciding which 
list we add each item into. 

GroupBy gives us a better way to manage that complexity without the need for managing lists by hand. First, we need a way to 
compare items in the list. We do this with a custom type I've called DogKey.


{% highlight "csharp" %}

{% include 'code/csharp/GroupBy-DogKey.cs' %}

{% endhighlight %}

We also need a way to compare each item based on that key. So we implement an IEqualityComparer<T> for the key. The selection criteria 
are down to us so here I'm comparing based on breed but it could be age, name or any combination. Any two items that match 
according to the comparision will be placed into the same group.

{% highlight "csharp" %}

{% include 'code/csharp/GroupBy-GroupByBreed.cs' %}

{% endhighlight %}

Then actually implementing the grouping comes out into a single function call. We can then print out the results


{% highlight "csharp" %}

{% include 'code/csharp/GroupBy-GroupAndPrint.cs' %}

{% endhighlight %}

![results](/img/posts/dog-sorting/console.webp "console output")
