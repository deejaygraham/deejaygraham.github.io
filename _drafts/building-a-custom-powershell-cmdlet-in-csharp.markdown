---
layout: post
title: Building a Custom PowerShell Cmdlet in C#
published: true
tags: [ code, cloud, powershell ]
---


Over the time I've spent automating deployment and build processes, I have fallen
out with plain command line applications and batch files. In their stead, I favour
msbuild and writing custom tasks to wrap what would have been a command line application
in the past.

As I have transitioned into a more DevOps-y kind of world, the emphasis is more on running
commands to do configuration and admin at runtime. This really isn't the place for msbuild
so we have to take the step into writing custom code for PowerShell!


### New Project

First, we need to create a new Class Library for the Cmdlets to live in. The version of .Net
you target will depend on which version of PowerShell you want to work with.

![new project](/img/posts/building-a-custom-powershell-cmdlet-in-csharp/new-project.png)

The next thing to do is add references to PowerShell. This used to be a manual step to root out
the correct assemblies on your file system, until Microsoft have made their reference assemblies
for v3, 4 and 5 available as NuGet packages.

![nu-get](/img/posts/building-a-custom-powershell-cmdlet-in-csharp/add-reference-assemblies.png)


### Fortune!

As an example, I want to build a simple fortune cookie generator, like the unix "fortune" utility.
There is a great selection of fortunes collected on [github](https://github.com/bmc/fortunes/blob/master/fortunes), so
I borrowed a few and created a list of them to select from:

<script src="https://gist.github.com/deejaygraham/a54146d62f4846a0f85ec8fd1cb42cf6.js"></script>

To make this class into a Cmdlet, I need to derive the class from <code>System.Management.Automation.Cmdlet</code>. I also need
to decide what the class name is going to be and what it should be called in PowerShell.


### Names

PowerShell convention is to name a cmdlet using &lt;verb&gt;-&lt;noun&gt; form. The noun part is easy - it's a fortune
cookie generator - and the verb should probably be one of the standard PowerShell verbs -
"Get" seems to fit nicely. Declaring the name to PowerShell is done with by decorating the class
with <code>CmdletAttribute</code>.

If you have selected a common verb, you can use the <code>VerbsCommon</code> enum or, if not,
use the two string version of the attribute to provide the verb as text.

<script src="https://gist.github.com/deejaygraham/5c808a28d4dc5b9d1e10a332172773ee.js"></script>

Building the project into an assembly will let you write the PowerShell to use it. In a plain vanilla
console, we can run <code>Get-Module</code> and see this:

![get-module](/img/posts/building-a-custom-powershell-cmdlet-in-csharp/get-module.png)

We can then run <code>Import-Module .\ExampleCmdlet.dll</code>, followed by another
 <code>Get-Module</code> and see this:

![get-module](/img/posts/building-a-custom-powershell-cmdlet-in-csharp/get-module2.png)

and run it using <code>Get-FortuneCookie</code>. Granted that doesn't do much. We need
to actually execute some code...

### Execution

To execute actual code, we need to override the <code>ProcessRecord()</code> method. The
simplest thing we could do is write out the first fortune cookie. Like this:

<script src="https://gist.github.com/deejaygraham/f9b29fa95f9c609adbf5b3ed9d73560d.js"></script>

As you would expect, that writes out to the console:

![first output](/img/posts/building-a-custom-powershell-cmdlet-in-csharp/first-output.png)




### Parameters

specifying
validating
Help

### Returning Data

### Logging

### Verbosity

### Debugging


### Errors


### -WhatIf
