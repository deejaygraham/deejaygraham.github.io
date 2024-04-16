---
permalink: 2015/06/18/secret-azure-debugging-tools.html
layout: post
title: Secret Azure Debugging Tools
published: true 
categories: [ cloud ]
hero: cloud
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

I recently stumbled on a [blog post](http://blogs.msdn.com/b/kwill/archive/2013/08/26/azuretools-the-diagnostic-utility-used-by-the-windows-azure-developer-support-team.aspx) 
by Kevin Williamson that talks about a utility, used by Microsoft's internal support teams, that collects 
together a good selection of debugging tools in one package so you can do investigations over RDP on an Azure 
PaaS instance. 
 
From that post:

- RDP to the instance
- Open a PowerShell console
- Paste and run the command


```powershell

{% include 'code/powershell/Secret-Azure-Tools.ps1' %}

```

[Download](https://gist.github.com/deejaygraham/d1c6d861d971a0f86094)

![powershell](/img/posts/secret-azure-tools/powershell-tools-install.webp)

This should automatically start the AzureTools.exe and show the following UI:

![first ui](/img/posts/secret-azure-tools/azure-tools.webp)

Clicking on one of the items in the Tools list will download and install that tool from the URL. Download progress 
is shown in the bottom half of the window:

![installing](/img/posts/secret-azure-tools/azure-tools-install.webp)

One of the most useful tools from the point of view of a developer trying to troubleshoot a worker role is 
using a debugger to attach to a process. Azure Tools comes with an installer for windbg (which for download and 
install is much better than a full Visual Studio install). 
 
![attach](/img/posts/secret-azure-tools/attach-debugger.webp)

WaWorkerHost is the process responsible for hosting WebRole instances. When Windbg starts you get the full 
capabilities of a debugger and a trace client for <code>OutputDebugString</code> calls.
 
![windbg](/img/posts/secret-azure-tools/windbg-running.webp)

Obviously, this is only just scratching the surface of all the goodness that the team have made available so I'm 
sure I will report back on other utilities as time goes on.

I'd also like to recommend Kevin's [other posts in this series](http://blogs.msdn.com/b/kwill/), particularly the 
troubleshooting scenarios:

* [Role Recycling](http://blogs.msdn.com/b/kwill/archive/2013/08/20/troubleshooting-scenario-1-role-recycling.aspx)
* [Role Recycling 2](http://blogs.msdn.com/b/kwill/archive/2013/08/26/troubleshooting-scenario-2-role-recycling-after-running-fine-for-2-weeks.aspx)
* [Role Stuck in Busy State](http://blogs.msdn.com/b/kwill/archive/2013/09/06/troubleshooting-scenario-3-role-stuck-in-busy.aspx)
* [Azure Traffic Manager](http://blogs.msdn.com/b/kwill/archive/2013/09/06/troubleshooting-scenario-4-windows-azure-traffic-manager-degraded-status.aspx)
* [Internal Server Error](http://blogs.msdn.com/b/kwill/archive/2013/09/19/troubleshooting-scenario-5-internal-server-error-500-in-webrole.aspx)
* [Role Recycling 3](http://blogs.msdn.com/b/kwill/archive/2013/09/23/troubleshooting-scenario-6-role-recycling-after-running-for-some-time.aspx)
* [Role Recycling 4](http://blogs.msdn.com/b/kwill/archive/2013/10/03/troubleshooting-scenario-7-role-recycling.aspx)

