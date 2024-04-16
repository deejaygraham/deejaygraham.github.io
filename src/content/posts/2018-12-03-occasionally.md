---
permalink: 2018/12/03/occasionally.html
layout: post
title: Occasionally...
categories: [ code ]
published: true
---

Running an Azure classic cloud service, which at the top level is a big while(true) block, one sometimes needs 
to run an action *sometimes* and not every time around the loop. We could solve this in a multi-threaded way by 
creating a thread per action and blocking for a set amount of time in each thread. A more low-tech and more 
"tell-dont-ask" approach might be something like this.

An occasional task runs as part of a while loop, single threaded whenever it feels like the next run is required:

```csharp

{% include 'code/csharp/OccasionalAction.cs' %}

```

Tests confirm the shape of the client code I was shooting for:

```csharp

{% include 'code/csharp/OccasionalActionTests.cs' %}

```


And a collection of occasional tasks to round things off:

```csharp

{% include 'code/csharp/OccasionalActions.cs' %}

```


