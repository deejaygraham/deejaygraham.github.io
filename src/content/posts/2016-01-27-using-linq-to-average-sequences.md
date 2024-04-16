---
permalink: 2016/01/27/using-linq-to-average-sequences.html
layout: post
title: Using Linq to Average Sequences
published: true 
categories: [ csharp ]
---

One of my standard application scenarios when learning a technology or a language is 
writing a good old Rss parser or podcast downloader. This is often a good test of 
my understanding because it will usually involve all or most of: file system, 
networking, xml processing, asynchrony. While working through another version of this 
scenario, I wondered if it would be possible to programmatically predict the next day a 
particular podcast would be published. This would save continually pinging each site 
every time we want to check for a new episode, cutting network traffic and general load
on the system.

Each entry in an RSS stream is meant to contain a published date reflecting the date (and 
sometimes the time) that the episode was put online. Parsing the RSS can then provide a 
list of episodes each with a published date. One way to predict when the next episode will 
drop is by taking an average over all the previous episodes and then projecting this forward 
from the most recent episode.

Linq makes this easy using the Zip and Average extension methods for IEnumerable<T>. 


```csharp

{% include 'code/csharp/DatePrediction.cs' %}

```

Here we build a list of TimeSpan objects to represent the differences between successive 
episodes, comparing 1st to 2nd, 2nd to 3rd etc. using the offset given by Skip(1). Then, 
Average (surprise!) gives the average timespan which we can then use for our projection.  
