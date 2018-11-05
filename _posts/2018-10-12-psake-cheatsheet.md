---
layout: post
title: PSake Cheatsheet
published: true 
categories: [ powershell ]
hero: power
---

<a href="https://github.com/psake/psake/">PSake</a> is a PowerShell module, similar to msbuild, that allow you to parcel up chunks of code into discrete Tasks and 
create dependencies between them. PSake then determines the order they should run and handles that complexity. Here are the highlights of 
functionality I use all the time. 


### Tasks 

The basic unit of execution in PSake is the Task:


```powershell

include code/powershell/PSake-Cheatsheet-1.ps1

```

You can give each task a description as well as a name to help with documenting what each task is supposed to do.


### Running

We run the task by invoking PSake (after Importing the module if we need to):


```powershell

include code/powershell/PSake-Cheatsheet-2.ps1

```

A nice feature of running is a report at the end showing how long the process took overall and how 
long each individual task took.


### Discoverability

PSake scripts can become complicated to read through in one go so it supports self-documenting of all of 
your Tasks and their dependencies using the -docs switch:


```powershell

{% include code/powershell/PSake-Cheatsheet-3.ps1 %} 

```


### Dependencies 

More than one Task can depend on a sub-task and PSake will work out the correct order of 
execution to honour each dependency statement.


```powershell

{% include code/powershell/PSake-Cheatsheet-4.ps1 %}

```


### Default 

A default taks can be run if nothing is specified from the command line. 


```powershell

{% include code/powershell/PSake-Cheatsheet-5.ps1 %}

```


### Parameters

PSake can accept parameters that it makes available as variables in your tasks to allow them to be a little more flexible:


```powershell

{% include code/powershell/PSake-Cheatsheet-6.ps1 %}

```


### Alias

A task can have more than one name. 


```powershell

{% include code/powershell/PSake-Cheatsheet-7.ps1 %}

```


### Assertions and Required Variables

To add to the robustness of a script you can ask that PSake will error if one or more variables are not declared. You can 
also check that a condition is met inside a task by using the Assert statement. 


```powershell

{% include code/powershell/PSake-Cheatsheet-8.ps1 %}

```


### Preconditions 

PSake will skip a Task if the precondition is not met. 


```powershell

{% include code/powershell/PSake-Cheatsheet-9.ps1 %}

```

