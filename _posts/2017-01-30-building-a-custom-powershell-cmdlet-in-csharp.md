---
layout: post
title: Building a Custom PowerShell Cmdlet in C#
published: true
categories: [ code, cloud, powershell ]
thumbnail: "/img/thumbnails/parcel-420x255.jpg"
alttext: powershell
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

To make this class into a Cmdlet, I need to derive the class from <code class="powershell">System.Management.Automation.Cmdlet</code>. I also need
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
console, we can run <code class="powershell">Get-Module</code> and see this:

![get-module](/img/posts/building-a-custom-powershell-cmdlet-in-csharp/get-module.png)

We can then run <code class="powershell">Import-Module .\ExampleCmdlet.dll</code>, followed by another
 <code class="powershell">Get-Module</code> and see this:

![get-module](/img/posts/building-a-custom-powershell-cmdlet-in-csharp/get-module2.png)

and run it using <code class="powershell">Get-FortuneCookie</code>. Granted that doesn't do much. We need
to actually execute some code...


### Execution

To execute actual code, we need to override the <code>ProcessRecord()</code> method. The
simplest thing we could do is write out the first fortune cookie. Like this:

<script src="https://gist.github.com/deejaygraham/f9b29fa95f9c609adbf5b3ed9d73560d.js"></script>

As you would expect, that writes out to the console:

![first output](/img/posts/building-a-custom-powershell-cmdlet-in-csharp/first-output.png)

Now that we have some kind of output, it's not a massive leap to add in some randomness.

<script src="https://gist.github.com/deejaygraham/82a0ffece4620cbd50d6e4717317e788.js"></script>

Running the command multiple times, behaves as expected.

![random output](/img/posts/building-a-custom-powershell-cmdlet-in-csharp/random-cookie.png)


### Debugging and Verbosity

Maybe now is a good time to add some debug logging. The <code>WriteDebug()</code> method
gives us what we want here. We could also add some verbose information when the user
runs our cmdlet with the <code>-Verbose</code> switch.

<script src="https://gist.github.com/deejaygraham/61fbf319ac4b5e10546222c3384b3d1e.js"></script>

### Returning Data

So far we are writing text to the output using the <code>WriteOutput</code> method. It would be nice if
we could return an object with a bit more context built in. First, we need to define a type <code>FortuneCookie</code>.
Second we need to refactor the internal code to deal in FortuneCookie objects. Finally, we
need to tell PowerShell that we want to return that type from the cmdlet. Note, we leave the
call to <code>WriteObject</code> since PowerShell will now understand something about our new type.

<script src="https://gist.github.com/deejaygraham/b90a4e9432acbd687883b7d639198f1a.js"></script>

![output](/img/posts/building-a-custom-powershell-cmdlet-in-csharp/output-type.png)


### Parameters

Now that we have a functioning cmdlet, it would be nice to add parameters so that we can
change the behaviour at runtime. Perhaps we should change the default behaviour so that running
Get-FortuneCookie will return all the cookies and we can pick a random cookie by passing the
-Random switch? First we create a member property to hold the setting and apply a <code>Parameter</code>
attribute to alert PowerShell to it.

<script src="https://gist.github.com/deejaygraham/4e8c797651118be7f3d837e3903598b5.js"></script>

So running with no parameters as before we get:

 ![full output](/img/posts/building-a-custom-powershell-cmdlet-in-csharp/all-cookies.png)

and running it with the -Random switch returns to the original functionality:


![switch](/img/posts/building-a-custom-powershell-cmdlet-in-csharp/random-switch.png)

Most parameters are native types but the <code>SwitchParameter</code> type allows us to pass the
name of the option. If we had declared Random to be a <code>bool</code> we would have been forced to write:

<code class="powershell">Get-FortuneCookie -Random $true</code>

Which I think we can all agree is not an elegant experience for the user.


### What, If?

Finally, one of the most useful and yet under used arguments to a cmdlet is the WhatIf switch. I like this
because it allows you to try out a dummy run of a scary command like <code class="powershell">Delete-TheInternet</code> without
actually doing anything. A well written but potentially high risk cmdlet will implement this
option to allow someone to make sure all their parameters are correct before running it for real.

<script src="https://gist.github.com/deejaygraham/ba3e953304d3e5dd59de3a45103fa3d8.js"></script>

### Done

And that's our example cmdlet completed. There are more options to explore - for error reporting,
throwing exceptions, mandatory parameters, handling pipeline input - which I may come
back to later once I've had longer to play around building some real world cmdlets.
