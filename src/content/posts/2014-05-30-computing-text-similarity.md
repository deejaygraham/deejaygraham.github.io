---
permalink: 2014/05/30/computing-text-similarity/
layout: post
title: Computing Text Similarity
published: true
tags: [csharp, code]
---

A part of the implementation of the [NDifference](http://deejaygraham.github.io/ndifference/)
project is finding similarities between pieces of code, specifically finding
the closest match between several candidates for an overloaded method.

Recently I discovered an article on Wikipedia describing the
[Levenshtein distance algorithm](http://en.wikipedia.org/wiki/Levenshtein_distance),
a measure of how similar two pieces of text are, or how many changes would be
required to turn one into the other. Identical texts have a score of zero, changing
"cat" into "dog" would score 3. Changing "cog" into "dog" would score 1.

Taking the reference implementation, it seemed that it could benefit from losing
the arrays and some of the more manual parts of the algorithm and using some
built-in .Net goodness.

{% highlight "csharp" %}

{% include 'code/csharp/LevenshteinDistance.cs' %}

{% endhighlight %}

For example, the first part of the algorithm is concerned with initialising
data and in the original implementation this is 5-6 lines of very C-like code.

Here, I have replaced it with simple initialisations of two lists, one from
_Enumerable.Range_ the other from _Enumerable.Repeat_. So, the first list is
filled with an increasing sequence of numbers and the second is filled with all
zeroes. It takes longer to say it than to write or read it.

Next, towards the end of the first loop, there is a copy operation which has been
replaced by another simple assignment.

Finally, the inner loop calculation tries to find the lowest value of three
alternatives. Originally, this used repeated, nested calls to _Math.Min_ but
here has been replaced with a variant from the _IEnumerable<T>_ extension methods
which picks the lowest value from a sequence.

I'm still not completely happy with the implementation, particularly the index values
required to access elements of the previous and current row values. I will update
this as I discover better techniques :)
