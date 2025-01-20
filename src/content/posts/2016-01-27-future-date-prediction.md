---
permalink: 2016/01/27/future-date-prediction/
layout: post
title: Predicting a Future (Podcast) Date
tags: [code, csharp]
published: true
---

Working on my c# podcast subscription app I added a small piece of code to try to work out when next to check a feed for a new episode rather than pinging every feed every few minutes because, 
in reality, most podcasts produce an episode once per day, once per week or once per month. 

## Code

Given a list of episodes, with a property PublishedDate, we can look at the previous data and work out an average of the dates of last episodes. Add that to the most recent episode date 
and we should get a rough idea of when the next episode will be published. 

```csharp

var episodeList = new List<Episode>();

// fill the list - elided for clarity

// now work out average refresh frequency.
var differencesInDate = episodeList.Zip(episodeList.Skip(1), (first, second) => first.PublishedDate - second.PublishedDate);

TimeSpan betweenEpisodes = TimeSpan.FromTicks(Convert.ToInt64(differencesInDate.Average(ts => ts.Ticks)));

DateTime predictedDate = mostRecentDate.Add(betweenEpisodes);

```

Of course, this assumes that each episode is published on a roughly consistent schedule and nobody publishes every day for a week, then publishes once a month.
