---
layout: post
title: Avoiding avoidable errors in PowerShell
published: true 
tags: [ powershell ]
---

Two wonderful features of PowerShell that don't seem to get used enough are embodied by the 
cmdlet **Set-PSDebug**

##Tracing some of the things

~~~

PS C:\>Set-PSDebug -Trace 1 

~~~

Trace level 1 gives you an idea of the execution of a script, like which path is taken after a 
conditional is evaluated.

##Tracing all the things

Even better is level 2 which shows everything level 1 does plus variable assignments (**! SET** ) and function calls
(**! CALL**).

~~~

PS C:\>Set-PSDebug -Trace 2

~~~

##Strict

The other nice feature of Set-PSDebug is the strict option:

~~~

PS C:\>Set-PSDebug -Strict

~~~

Strict will error if you accidentally mistype the name of a variable thereby 
creating a new, uninitialised one with a slightly different name.

Unfortunately, if you mistype the name in an expanded string it won't be flagged 
by strict.

Turn off strict mode again using 

~~~

PS C:\>Set-PSDebug -Off

~~~
