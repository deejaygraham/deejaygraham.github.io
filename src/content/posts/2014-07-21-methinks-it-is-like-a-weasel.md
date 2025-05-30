---
title: Methinks it is like a Weasel
tags: [code, csharp]
---

I'm posting this older code example of a simple evolutionary algorithm to get
it off my hard drive :)

I've been interested in [evolutionary algorithms](http://en.wikipedia.org/wiki/Evolutionary_algorithm)
for a while now with an idea of using them to solve some interesting puzzles
(more of that in a later post, honest).

This is the canonical example provided by Richard Dawkins in his book
[The Blind Watchmaker](http://en.wikipedia.org/wiki/The_Blind_Watchmaker)
which attempts to start with a random series of letters of the right length and
by random mutation, generates a quote from Act 3 Scene 2 of Hamlet:

<blockquote>
<p>HAMLET</p>
<p>Do you see yonder cloud that’s almost in shape of a camel?</p>
<p>POLONIUS</p>
<p>By th' mass, and ’tis like a camel indeed.</p>
<p>HAMLET</p>
<p>Methinks it is like a weasel.</p>
</blockquote>

## Interfaces

```csharp

{% include 'code/csharp/Weasel_ICrossover_T.cs' %}

```

```csharp

{% include 'code/csharp/Weasel_IMutator_T.cs' %}

```

```csharp

{% include 'code/csharp/Weasel_IPopulationFactory_T.cs' %}

```

```csharp

{% include 'code/csharp/Weasel_IFitnessScore_T.cs' %}

```

```csharp

{% include 'code/csharp/Weasel_IMatchesTarget_T.cs' %}

```

## Implementations

```csharp

{% include 'code/csharp/Weasel_WeaselMutator.cs' %}

```

```csharp

{% include 'code/csharp/Weasel_WeaselPopulationFactory.cs' %}

```

```csharp

{% include 'code/csharp/Weasel_WeaselFitnessScore.cs' %}

```

## Extension Methods

```csharp

{% include 'code/csharp/Weasel_RandomExtensions.cs' %}

```

## Events

```csharp

{% include 'code/csharp/Weasel_InitialConditionEventArgs_T.cs' %}

```

```csharp

{% include 'code/csharp/Weasel_FitnessProgressEventArgs_T.cs' %}

```

```csharp

{% include 'code/csharp/Weasel_FinalConditionEventArgs_T.cs' %}

```

## Algorithm

```csharp

{% include 'code/csharp/Weasel_GeneticAlgorithm_T.cs' %}

```

## Main

```csharp

{% include 'code/csharp/Weasel_Program.cs' %}

```

Using as many interfaces as I have and using generic types may seem a little like
overkill but, as I said, I am hoping to complete a project using some alternate
implementations for a more interesting purpose. Stay tuned :)
