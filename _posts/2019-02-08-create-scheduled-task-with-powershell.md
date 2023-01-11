---
layout: post
title: How to create a scheduled task with PowerShell
published: true 
categories: [ powershell, code ] 
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: logs
---

Another tiny snippet used very occasionally to create a scheduled task on an unattended Windows machine.

It uses the name of the task to determine if it is already installed (in which case it does nothing) and then
creates the scheduled task as a multi-step process: creating the action - the script to run, then the trigger 
to run on the schedule and finally registering the action and the task together as a scheduled task.

```powershell

[string]$TaskName = 'RunThisTaskRegularly'
[string]$TaskDescription = 'Run a task at a scheduled interval.'

# Does it exist?
$Task = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue

If ($null -eq $Task) {

    # Create it
    [string]$ScriptName = 'RunMe.ps1'
	[string]$here = Split-Path -Path $MyInvocation.MyCommand.Path
	[string]$ScriptPath = Join-Path -Path $here -ChildPath $ScriptName 
    [string]$ArgumentList = '-NoProfile -Command "' + $ScriptPath + '" '
    
	$Action = New-ScheduledTaskAction -Execute 'Powershell.exe' -Argument $ArgumentList
    $Trigger = New-ScheduledTaskTrigger -Daily -At 5am
    
	Register-ScheduledTask -Action $Action -Trigger $Trigger -TaskName $TaskName -Description $TaskDescription | Out-Null
} 

```
