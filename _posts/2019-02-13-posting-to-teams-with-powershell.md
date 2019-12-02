---
layout: post
title: Posting Messages to MS Teams with PowerShell
published: true 
categories: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.jpg"
alttext: powershell

---

We are starting to use Microsoft Teams more and more for (suprisingly) team communication. We have a dedicated channel for product 
releases that Azure DevOps pipelines post to for build notifications but strangely I had always thought of wiring that together as 
being really arcane and difficult. Turns out, I tried and it was super easy.

First, in Teams, you need a channel that you can post to. Click on the right-hand side '...' and pick connectors from the menu.

Next, select "Incoming Webhook", give the web hook a name, an optional icon that will appear in each posting, and copy out the 
url that is generated. 

Write a PowerShell script like this to post to the webhook and you're done.


```powershell

{% include code/powershell/Post-MessageToTeams.ps1 %}

```

So, the moral of the story is, try a project you know nothing about how to do, it may not be as bad as you thought. 
