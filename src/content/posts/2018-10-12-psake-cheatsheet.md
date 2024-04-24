---
permalink: 2018/10/12/psake-cheatsheet/
layout: post
title: PSake Cheatsheet
published: true
tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell
---

<a href="https://github.com/psake/psake/">PSake</a> is a PowerShell module, similar to msbuild, that allow you to parcel up chunks of code into discrete Tasks and
create dependencies between them. PSake then determines the order they should run and handles that complexity. Here are the highlights of
functionality I use all the time.

### Tasks

The basic unit of execution in PSake is the Task:

{% highlight "powershell" %}

{% include 'code/powershell/PSake-Cheatsheet-1.ps1' %}

{% endhighlight %}

You can give each task a description as well as a name to help with documenting what each task is supposed to do.

### Running

We run the task by invoking PSake (after Importing the module if we need to):

{% highlight "powershell" %}

{% include 'code/powershell/PSake-Cheatsheet-2.ps1' %}

{% endhighlight %}

A nice feature of running is a report at the end showing how long the process took overall and how
long each individual task took.

### Discoverability

PSake scripts can become complicated to read through in one go so it supports self-documenting of all of
your Tasks and their dependencies using the -docs switch:

{% highlight "powershell" %}

{% include 'code/powershell/PSake-Cheatsheet-3.ps1' %}

{% endhighlight %}

### Dependencies

More than one Task can depend on a sub-task and PSake will work out the correct order of
execution to honour each dependency statement.

{% highlight "powershell" %}

{% include 'code/powershell/PSake-Cheatsheet-4.ps1' %}

{% endhighlight %}

### Default

A default task can be run if nothing is specified from the command line.

{% highlight "powershell" %}

{% include 'code/powershell/PSake-Cheatsheet-5.ps1' %}

{% endhighlight %}

### Parameters

PSake can accept parameters that it makes available as variables in your tasks to allow them to be a little more flexible:

{% highlight "powershell" %}

{% include 'code/powershell/PSake-Cheatsheet-6.ps1' %}

{% endhighlight %}

### Alias

A task can have more than one name.

{% highlight "powershell" %}

{% include 'code/powershell/PSake-Cheatsheet-7.ps1' %}

{% endhighlight %}

### Assertions and Required Variables

To add to the robustness of a script you can ask that PSake will error if one or more variables are not declared. You can
also check that a condition is met inside a task by using the Assert statement.

{% highlight "powershell" %}

{% include 'code/powershell/PSake-Cheatsheet-8.ps1' %}

{% endhighlight %}

### Preconditions

PSake will skip a Task if the precondition is not met.

{% highlight "powershell" %}

{% include 'code/powershell/PSake-Cheatsheet-9.ps1' %}

{% endhighlight %}

### Task formatting

You can make individual tasks stand out by formatting the task name output. Either
by setting FormatTaskName with a string or a code block.

{% highlight "powershell" %}

{% include 'code/powershell/PSake-Cheatsheet-10.ps1' %}

{% endhighlight %}
