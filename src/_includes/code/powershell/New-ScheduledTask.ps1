[string]$TaskName = 'MyScheduledTask'
[string]$TaskDescription = 'Runs a powershell script every day'

$Task = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue

If ($null -eq $Task) {

	[string]$here = Split-Path -Path $MyInvocation.MyCommand.Path
	[string]$ScriptPath = Join-Path -Path $here -ChildPath MyScheduledTask.ps1 
    [string]$ArgumentList = '-NoProfile -Command "' + $ScriptPath + '" '
    
	$Action = New-ScheduledTaskAction -Execute 'Powershell.exe' -Argument $ArgumentList
    $Trigger = New-ScheduledTaskTrigger -Daily -At 2am
    
	Register-ScheduledTask -Action $Action -Trigger $Trigger -TaskName $TaskName -Description $TaskDescription | Out-Null
} 
