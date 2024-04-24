---
permalink: 2015/10/30/executing-sql-scripts-in-powershell-are-go/
layout: post
title: Executing SQL Scripts in PowerShell are GO
published: true
tags: [powershell]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

Another quick snippet showing how to split a SQL script at the GO statements to execute a potentially large set
of script in smaller chunks - and be better able to work out which piece went wrong.

{% endhighlight %}

Import-Module "sqlps" -DisableNameChecking

# Run these scripts in order...

$SqlFiles = @(
'Example1.sql',
'Example2.sql'
)

# Using a trusted connection...

$SqlServer = "MyMachine\MyInstance"
$SqlDatabase = "MyNewDatabase"

$SqlFiles | ForEach-Object {

    $SqlFile = $_

    Write-Host "Running Script $SqlFile"

    # Read each group of statements separated by a "go"
    Get-Content $SqlFile -Delimiter "GO" | ForEach-Object {

    	$SqlStatement = $_

    	Write-Host $SqlStatement

    	Invoke-Sqlcmd $SqlStatement -ServerInstance $SqlServer -Database $SqlDatabase
    }

}

{% endhighlight %}

This is for illustration only so I'm using Write-Host. Obviously if I was a serious PowerShell person I would
use Write-Verbose or Write-Progress.
