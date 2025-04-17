---
title: Azure Startup Tasks
tags: [powershell, cloud]
hero: power
thumbnail: "/assets/img/thumbnails/parcel-420x255.png"

---

When you deploy a cloud service to Azure, it's often the case that there are admin tasks to do to
the operating system before running the service proper. This is done by creating a
startup task in the .csdef file.

```xml

<Startup>
  <Task commandLine="startup.cmd" executionContext="elevated" taskType="simple" />
</Startup>

```

Startup tasks don't directly support running PowerShell (always our tool of choice for this kind of
situation) so we need to invoke it from a batch file.

I have seen a lot of this form of invokation in batch files:

```shell

PowerShell -Command "Set-ExecutionPolicy Unrestricted"
PowerShell .\DoStartupStuff.ps1
PowerShell -Command "Set-ExecutionPolicy Restricted"

```

Where we turn off the execution policy, run a command, then turn it back on, even for
a single script. It is much nicer and easier to maintain, I feel, to embed the execution policy
into the call of the script:

```shell

PowerShell -ExecutionPolicy Unrestricted .\DoStartupStuff.ps1 >> "%TEMP%\StartupLog.txt" 2>&1
EXIT /B 0

```

There are a couple of things to note here. Capturing 2>&1 (stderr and stdout) to a startup log file helps
with debugging command line problems in environments. The other is ending the script with an EXIT /B 0 to
reset the error level. Anything other than a zero will mean that the service will not be started by
Azure. This may be the case if one of the applications you are running doesn't set it's return value correctly
and may even be an intermittent problem, depending upon what random value is returned. If all your start up
applications are well behaved (as they should be), then you can return using %errorlevel% rather than a slightly
fudge-y zero.
