---
layout: post
title: Using Custom Module Paths in PowerShell
published: false 
tags: [ powershell ]
---

There seem to be two camps I come across when in the badlands of PowerShell use. 

First is the IT use where a set of scripts or cmdlets are packaged up into 
a neat little module and released to a wider audience to be installed permanently 
in each user's profile as The One True Version. Each cmdlet has commented help, 
mandatory parameters, support for WhatIf and all kinds of wonderful PowerShell 
goodness. But the bad thing about it is, in my opinion, the almost concrete 
permanence of installing the code as a module. Changes are slow and when a bug is 
fixed or a change happens, the One True Version gets overwritten by One True 
Version 2.0. 

Second is the more adhoc Developer use where scripts are hacked together, treating 
the language as an slightly advanced batch file or shell script with not much 
thought for the "rules" of PowerShell or playing nice with other parts. These adhoc 
scripts are usually run as part of a build or deployment but often have hard-coded 
values that really could be pulled out as parameters if they were written as cmdlets. By 
their nature, they are more ephemeral, they won't get installed into the user's 
profile because each code branch or build configuration has a slightly different version 
or slightly different parameters. 

Is there some middle path between the solid reliability but permanence of the IT code 
and the wild west of the developer code? Refactoring the adhoc code to be better behaved 
in the PowerShell ecosystem is one thing but is there a way to "install" them as 
required by different controller scripts?           

Most of the guidance when you come to refactor your powershell scripts into cmdlets 
doesn't talk about this kind of scenario.  

![example image](/img/posts/using-custom-module-paths-in-powershell/example-image.png)
