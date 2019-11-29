---
layout: post
title: Querying Azure Log Analytics with PowerShell
published: true 
categories: [ powershell, code ]
hero: power
thumbnail: img/posts/querying-log-analytics-with-powershell/querying-log-analytics-with-powershell-420x255.jpg
alttext: logs
---

I have used the Azure portal to query log analytics in the past, usually typing in a query then pressing "run". I may have 
even used the **export** option to save a csv of the results. Typically, the portal restricts you to 10k worth of records in 
a single query bu suddenly I had the need to extract more data and on a rolling basis. Clearly, the portal wasn't going to 
cut it for me.

I was about to start writing some code to hit the web api when I thought, 'I wonder if PowerShell could help here?' Of course the 
answer was yes, there's a cmdlet for that. All you need is an authenticated session, the workspace id which you get from the analytics 
blade in the portal, and away you go. 

```powershell

{% include code/powershell/Query-LogAnalytics.ps1 %}

```

Anything that works in the interactive query runner will work in code. Aside from this one off use, I can see this being useful for 
pre- and post-deployment monitoring to check for errors when services start up. 
