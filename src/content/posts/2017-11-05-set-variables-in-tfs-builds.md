---
permalink: 2017/11/05/set-variables-in-tfs-builds/
layout: post
title: Setting variables in TFS builds
tags: [code, msbuild, tfs]
published: true
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

I am usually a big fan of Tfs and VS TFS 2015 onwards and the improvements the team made to the build system as compared to the
old XAML build system. You can sense a "but..." coming, can't you?

The but is, a weird hack I have discovered when trying to pass values created in one build step/task to other steps. One common reason is
you want to read the version number given to you by the build, consume it in a task, modify or transform it so it can be used by other
build scripts. The only way I have found that works reliably is by taking advantage of what I think is the biggest hack I have ever
seen since Ada Lovelace first whispered to a piece of rock and convinced it to think.

Actually, there are two ways: setting an environment variable or creating a temporary tfs variable _shudder_. To make things easier for the
future, I wrote both techniques up as either an inline msbuild task, a powershell snippet or both.

First, setting an environment variable from MsBuild:

```xml

{% include 'code/msbuild/environment-variable.xml' %}

```

The surrounding markup for the inline task is not import, the important part is the Fragment of code in the CDATA section.

Include the task then call it from the running script like this.

```xml

{% include 'code/msbuild/set-environment-variable.xml' %}

```

Now, to create a temporary Tfs variable that MsBuild can read as a dollar variable - $(Greeting), say - as if it were set by the
command line, you have to pull a weird trick by writing to output with a special ##vso syntax:

```xml

{% include 'code/msbuild/tfs-variable.xml' %}

```

Apparently, the build system is watching for these chunks of data appearing in the output and will build a variable for you
when it finds one. Awesome/terrible.

Happily, that can also be hidden behind an inline task and called from a script:

```xml

{% include 'code/msbuild/set-tfs-variable.xml' %}

```

You can also do the same thing in a PowerShell task in Tfs using Write-Host rather than MsBuild's Log:

```powershell

{% include 'code/powershell/Set-Variable.ps1' %}

```

Once we have created a variable, we can read it back in PowerShell as an environment variable.

```powershell

{% include 'code/powershell/Get-Variable.ps1' %}

```

I don't think I will ever feel clean again.
