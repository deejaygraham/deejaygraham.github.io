---
title: Avoiding avoidable errors in PowerShell
tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"

---

Two wonderful features of PowerShell that don't seem to get used enough are embodied by the
cmdlet **Set-PSDebug**

##Tracing some of the things

```shell

PS C:\>Set-PSDebug -Trace 1

```

Trace level 1 gives you an idea of the execution of a script, like which path is taken after a
conditional is evaluated.

##Tracing all the things

Even better is level 2 which shows everything level 1 does plus variable assignments (**! SET** ) and function calls
(**! CALL**).

```shell

PS C:\>Set-PSDebug -Trace 2

```

##Strict all the things

The other nice feature of Set-PSDebug is the strict option:

```shell

PS C:\>Set-PSDebug -Strict

```

Strict will raise an error if you accidentally mistype the name of a variable
thereby creating a new, uninitialised one with a slightly different name.
This setting applies globally across all functions that you run.  
One gotcha to watch out for, if you mistype the name in an expanded string it
won't be flagged by strict.

## Strict some of the things

A more nuanced version of strict is the **Set-StrictMode** cmdlet which is scope aware
and can be applied to single functions rather than the global reach of **Set-PSDebug**.
StrictMode comes in two flavours, **version 1** works in the same way as the Set-PSDebug -Strict  
switch and suffers from the same gotcha in expanded strings.

```shell

PS C:\>Set-StrictMode -Version 1

```

As you might have guessed, StrictMode also has a **version 2** setting.

```shell

PS C:\>Set-StrictMode -Version 2

```

Version 2 **does** catch uninitialized variables in expanded strings as well as in normal code. It also
looks for functions being called as methods, unnamed variables, mistyped object properties.

##Strict none of the things

Turn off strict mode again using:

```shell

PS C:\>Set-PSDebug -Off

```

or

```shell

PS C:\>Set-StrictMode -Off

```
