---
permalink: 2019/03/11/enable-assembly-binding-logging-without-fuslogvw/
layout: post
title: Enable Assembly Binding Logging without FusLogVw
published: true
tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell
---

<a href="https://docs.microsoft.com/en-us/dotnet/framework/tools/fuslogvw-exe-assembly-binding-log-viewer">Fusion Log Viewer</a> is a
convenient tool to catch weird .net assembly loading problems. It incorporates setting sensitivity levels with providing a semi-useful
view of the current logs. Fusion Log Viewer only comes with some of the Microsoft development SDKs. Increasingly I find instances where
I can't justify downloading and installing an SDK on a machine just to be able to run Fusion.

All of the capabilities it provides is already available, hidden, in the Windows operating system so all we need to get the benefit
of the tool without the SDK is to create some registry keys. There are a few flags to turn on and a path to the logging folder required.

```powershell

{% include 'code/powershell/EnableAssemblyBindingDebug.ps1' %}

```

The one slight niggle with this tool is that logs are written as html and don't appear in the folder in any kind of order. Sometimes
you just need to work your way through the logs to find the root cause of a loading problem.
