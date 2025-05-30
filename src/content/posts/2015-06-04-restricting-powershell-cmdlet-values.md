---
title: Restricting Powershell Cmdlet Values
tags: [powershell]
hero: power
---

In any program or script, it's (nearly) always a good thing to validate user input
and try to catch errors early. In PowerShell, if you need to only allow a
choice of one from a set of values, you can use the ValidateSet attribute
to define what they are.

I use PowerShell enough nowadays that I know the syntax exists but not enough
that it's made it's way into my long term memory. So this is more for me
than it is for you :)

```ps1
Param (
  [Parameter(Position=0)]
  [ValidateSet("Fee","Fi","Fo","Fum")]
  [string]$Giant,
  ...
)
```

The other common use case is limiting input to a range of values. For this we
need the ValidateRange attribute.

```ps1
  ...
  [Parameter(Position=1)]
  [ValidateRange(1,100)]
  [int]$Percent=100,
  ...
```
