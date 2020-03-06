var episodeList = new List<Episode>();

// fill the list - elided for clarity

// now work out average refresh frequency.
var differencesInDate = episodeList.Zip(episodeList.Skip(1), (first, second) => first.PublishedDate - second.PublishedDate);

TimeSpan betweenEpisodes = TimeSpan.FromTicks(Convert.ToInt64(differencesInDate.Average(ts => ts.Ticks)));

DateTime predictedDate = mostRecentDate.Add(betweenEpisodes);