---
permalink: 2021/02/20/autoit-extensions/
layout: post
title: AutoIt Extensions
published: true
tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell
---

I've been using <a href="https://www.autoitscript.com/site/">AutoIt</a> on and off for small windows automation tasks
when PowerShell or CLI tools aren't available. There are two or three functions that, while not complicated, improve the
scripts so I keep having to invent variations around them: hence the documentation of them here.

### Active Window

First, in automation we do something like start a program or push a button and we want to wait for an expected window
to appear. This can be almost immediately in the case of a dialog but could take some seconds and, in extreme cases,
say where we kick off an install and want to wait for the final screen to close things down, we don't care about the
intevening windows that pop up or what happens until we get to the window we are expecting.

Here we are waiting for a window with a specific title and containing specific text to appear. There is an optional timeout
when waiting for the window to appear as well as a retry switch to wait even longer for the window.

{% highlight "powershell" %}

Function Wait-ForWindowToBeActive {
<#  
 Wait for a window to pop up before continuing with a script. Used
to make sure that the program is progressing and we are finding and
clicking or typing into the correct control.
#>
[CmdletBinding()]
Param(
[Parameter(Mandatory=$True)]
[string]$Title, 
		
		[Parameter(Mandatory=$True)]
[string]$Text, 
		
		[Parameter()]
		[int]$TimeoutInSeconds,

    	[Parameter()]
    	[switch]$Retry
    )

    $Splat = @{

    	Title = $Title
    	Text = $Text
    }

    If ($TimeoutInSeconds -gt 0) { $Splat.Add('Timeout', $TimeoutInSeconds) }

    [int]$MaxAttempts = 1

    If ($Retry) { $MaxAttempts = 10 }

    [int]$Window = 0

    For ($Attempt = 0; $Attempt -le $MaxAttempts; $Attempt++) {

    	Write-Verbose "Waiting for $Title, attempt $Attempt"
    	$Window = Wait-AU3WinActive @Splat

    	If ($Window -ne 0) {
    		Write-Verbose "$Title active"
    		Break
    	} Else {

    		# If we time out, try to find and set this window to be active.
    		Write-Verbose "Timed out waiting for $Title, activate"
    		Show-AU3WinActivate -Title $Title -Text $Text | Out-Null
    	}
    }

    Write-Output $Window

}

{% endhighlight %}

### Typing

Data entry is another big part of automating a process. For AutoIt I have found it useful to
include a delay between each character typed, sometimes to more closely model how a user interacts,
and sometimes to allow for network requests and background processing to occur in the application.

Importantly, this function also translates some special characters (bangs and hashes) into escaped characters
so that AutoIt doesn't try to interpret them itself.

{% highlight "powershell" %}

Function Write-TextContent {
<#
Type text into a control. Optionally with a delay between each character typed.
Escapes any characters in text that AutoIt considers special.
#>  
 [CmdletBinding()]
Param(
[Parameter(Mandatory=$True)]
[string]$Text,

    	[Parameter()]
    	[int]$Delay = 0
    )

    $EscapeTheseCharacters = @('!', '#')

    $Text.ToCharArray() |
    ForEach-Object {

    	$Character = $_

        If ($Null -ne ($EscapeTheseCharacters | Where-Object { $_ -eq $Character})) {
    		$Character = "{$Character}"
    	}

    	Write-Verbose "Typing $Character"
    	Send-AU3Key -Key $Character

    	If ($Delay -gt 0) { Start-Sleep -Seconds $Delay }
    }

}

{% endhighlight %}

### Keys

Most automation seems to work well when driven by the keyboard (rather than using the mouse) but again in
common with text entry, there's often the need to include explicit delays between character presses.

{% highlight "powershell" %}

Function Invoke-KeyPress {
<#
Press a single key and (optionally) wait before returning.
#>
[CmdletBinding()]
Param(
[Parameter(Position = 0, Mandatory=$True)]
[string]$Key,

    	[Parameter(Position = 1)]
    	[string]$Description,

    	[Parameter(Position = 2)]
    	[int]$Delay = 0
    )

    If ($Description) { Write-Verbose $Description }

    Send-AU3Key $Key

    If ($Delay -gt 0) { Start-Sleep -Seconds $Delay }

}

{% endhighlight %}
