---
title: PSake Turtles All The Way Down
tags: [powershell]
hero: power
thumbnail: "/assets/img/thumbnails/shell-420x255.png"

---

I have been trying for a while to come up with a way to redesign a long PowerShell script into discrete
<a href="https://github.com/psake/psake/">PSake</a> Tasks. Lots of the code is repeated throughout the script as
small components are required in different configurations for different scenarios.

My original approach was to move chunks of repeated code to separate .psake.ps1 files and name tasks according to
the component and the action. For example, Component1-CopyLocal and Component1-RunInstaller, while other components had
similar long-winded names to avoid namespace clashes when each file was included the larger scenario/parent script.

```powershell

{% include 'code/powershell/PSake-Turtles-Include-1.ps1' %}

```

```powershell

{% include 'code/powershell/PSake-Turtles-Include-2.ps1' %}

```

```powershell

{% include 'code/powershell/PSake-Turtles-Scenario-1.ps1' %}

```

This arrangement had three particular disadvantages, task names were particularly long but not really descriptive or helpful,
the calling script had to know the names of each of the child tasks (or at least the names of all of the initiating tasks) making
refactoring and renaming difficult and, finally, none of the child components were able to be standalone due to the namespace clash
for the Default task.

That all changed when I discovered PSake has support for <a href="https://psake.readthedocs.io/en/latest/nested-build/">nested builds</a>.
We can redesign each component to be standalone, reduce the names of each task so they make sense at the component level, hide all of the
task names from the calling scripts while still preserving the reuse of scripts and the mix-and-match nature that I wanted to begin with.

```powershell

{% include 'code/powershell/PSake-Turtles-Include-3.ps1' %}

```

```powershell

{% include 'code/powershell/PSake-Turtles-Include-4.ps1' %}

```

```powershell

{% include 'code/powershell/PSake-Turtles-Scenario-2.ps1' %}

```

And of course, we can repeat this nesting as needed with each component.

### Error Handling

One thing to watch out for is error handling and exceptions when calling nested psake scripts. If a sub-task throws an exception,
psake won't report that problem in the calling script and will just terminate all succeeding tasks. You will need to wrap the
Invoke-Psake call in a Try block and use Write-Error in the Catch. To continue with succeeding tasks in a psake script, use
the ContinueOnError switch in a Task that may throw.
