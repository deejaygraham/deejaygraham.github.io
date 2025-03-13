---
permalink: 2019/03/08/create-a-scheduled-task-in-powershell/

title: Create a Scheduled Task in PowerShell

tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell
---

Creating a windows scheduled task from PowerShell is both harder than I expected and easier and is a good example of a
multi-step cmdlet process coming together to build something that can have a lot of complication to it when viewed from
the UI.

First we need to make sure the task does not already exist with Get-ScheduledTask. If it has not already been created, we need to
work in three stages. We need:

<ol>
<li>An action to perform, in this case run powershell.exe with our own .ps1 file as the argument.</li>
<li>A trigger, say run the action daily at a given time.</li>
<li>Registration of the task, bringing together the trigger, the action and a name and description.</li>
</ol>

```powershell

{% include 'code/powershell/New-ScheduledTask.ps1' %}

```
