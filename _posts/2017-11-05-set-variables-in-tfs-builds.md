---
layout: post
title: Setting variables in TFS builds
categories: [ code ]
published: true
---

I am usually a big fan of Tfs and VS TFS 2015 onwards and the improvements the team made to the build system as compared to the 
old XAML build system. You can sense a "but..." coming, can't you?

The but is, a weird hack I have discovered when trying to pass values created in one build step/task to other steps. The only way I have 
found that works reliably is by taking advantage of what I think is the biggest hack I have ever seen since Ada Lovelace first whispered to 
a piece of rock and convinced it to think. 

Actually, there are two ways: setting an environment variable or creating a temporary tfs variable *shudder*. To make things easier for the 
future, I wrote both techniques up as either an inline msbuild task, a powershell snippet or both. 

First, setting an environment variable from MsBuild:


```xml

{% include code/msbuild/environment-variable.xml %}

```

Include the task then call it from the running script like this.


```xml

{% include code/msbuild/set-environment-variable.xml %}

```

Now, to create a temporary Tfs variable that MsBuild can read as if it were a built-in variable you have to pull a weird trick by writing 
to output with a special syntax:

```xml

{% include code/msbuild/tfs-variable.xml %}

```

Happily, that can also be hidden behind an inline task and called from a script:


```xml

{% include code/msbuild/set-tfs-variable.xml %}

```

You can also do the same thing in a PowerShell task in Tfs:

```powershell

{% include code/powershell/Set-Variable.ps1 %}

```

I don't think I will ever feel clean again.

