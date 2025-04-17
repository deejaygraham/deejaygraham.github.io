---
title: Remote Controlling Windows Services in PowerShell
tags: [powershell]
hero: power
thumbnail: "/assets/img/thumbnails/parcel-420x255.png"

---

Remote Desktop-ing into several machines just to enable or disable a service is a bit of a chore. PowerShell saves us from
this tedium by providing a graceful solution via remoting. In this instance I am playing around with TFS build machines, trying to
turn <a href="http://cloudscaling.com/blog/cloud-computing/the-history-of-pets-vs-cattle/">a few "pets" into repeatable "cattle"</a>.
Sometimes I want to experiment with a build server as a live build agent and most of the time I don't want it to appear in the build agent
pool. Whether a machine is available to take builds from TFS is controlled by the status of the build agent service.

```powershell

{% include 'code/powershell/Remote-Service.ps1' %}

```
I use -Status Stopped to stop each agent and -Status Running to restart.
