---
layout: post
title: Using Trello for Retrospectives
published: true
tags: [ agile, retrospectives, kanban, tfs, team ]
---

One of the things we routinely struggle with when it comes to retrospective 
time is building a timeline of what everyone did and the difficulties and 
successes we experienced. 

Even though we use Microsoft's TFS to capture individual work item tasks 
we have found it difficult to reconstruct a view of the sprint that is more 
fine grained than product backlog items but not as detailed as invidual 
sprint backlog items. 

Once it was identified as an issue, we undertook a number of experiments: 

* Sticky notes on a board that fell off when someone walked past
* Pinned notes on a board which stayed put but were hard to move around.
* Gantt charts in MS Project (well, it's Project for one thing). 
* Trawling through individual TFS items to reconstruct the month.

Nothing seemed to exactly match what we felt we needed and was either too 
heavy-weight or just plain got in the way. At the start of the last sprint 
we discovered a tool called [Trello](https://trello.com) and decided to 
try experimenting with it during the sprint. 

Trello is a simple, one page browser-based application that supports team 
collaboration in the style of a virtual Kanban board. It's developed by Joel 
Spolsky's company, FogBuzz, who are actively using it in their projects to 
track work and have several public boards you can use to see the full power 
and flexibility of the platform. 

The general idea is the screen is split into three columns - not done, doing, 
done - you create cards to represent work and assign them to the appropriate 
column. As work progresses, you can drag the cards between columns and assign 
ownership among the team members to track who's working on what task. 

Cards move through the columns until at the end of the sprint everything 
should arrive in the "done" column. The application uses a realtime update 
mechanism so a change made by one team member immediately gets pushed to 
all the others.

The way our team uses Trello is to set up a blank board for each sprint. As 
team members pick up PBIs from TFS, we create new cards as required to track 
general themes in our work. Where PBIs are measured in days or weeks of effort 
and SBIs are generally measured in hours, we found creating cards that 
grouped together several related PBIs to work best.

At the end of the sprint it was easy to see, in order, how the sprint had 
progressed and we found that a normally difficult part of the team retrospective 
was sped up significantly. Probably the best endorsement of the tool came 
at the end of the retrospective when it was unanimously decided to keep using 
it for now on.

The technology used by Trello is described [in a blog post](http://blog.fogcreek.com/the-trello-tech-stack) 
if you are interested in how such a wonder was built. 
