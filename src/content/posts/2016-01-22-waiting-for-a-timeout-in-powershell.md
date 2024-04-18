---
permalink: 2016/01/22/waiting-for-a-timeout-in-powershell/
layout: post
title: Waiting for a Timeout in PowerShell
published: true 
tags: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

I've been working on continuous deployment of an application to Azure which we do by
uploading a new image to the Staging environment, waiting for all the new instances to 
create, come online and stabilise then performing a Vip-swap of Staging for Production, 
finally removing what was the old version which is now in the Staging slot. 

One of the challenges was waiting for a "reasonable" amount of time for things to settle down 
before either doing the swap or abandoning the deployment and flagging an error. Often if 
there is a problem with the new build it's because there is a missing dependency or a 
mistake in the startup scripts which will cause one or more instances to recycle indefinitely.

In this case, what we need is the ability to query all the instances and wait for them all to be ready 
and set a maximum wait time, after which we abandon and throw and exception. 

PowerShell (pseudo) code:

<script src="https://gist.github.com/deejaygraham/39c822ed5ef62d89fca3.js"></script>