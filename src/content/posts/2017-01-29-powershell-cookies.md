---
title: PowerShell Fortune Cookie
tags: [code, cloud, powershell]
thumbnail: "/assets/img/thumbnails/parcel-420x255.png"

---

Ahead of writing a post about writing a fortune cookie cmdlet in C#, I wanted to
post the simplest possible implementation in PowerShell first.

### Get-FortuneCookie.ps1

```powershell
[CmdletBinding()]
Param (

    [Parameter()]
    [string]$Path = '<Default Path>\fortunes.txt'

)

$CookieJar = Get-Content $Path -Encoding UTF8 -Delimiter '%'

$Cookie =  Get-Random -InputObject $CookieJar
$Cookie = $Cookie -replace '%', ''

Write-Output $Cookie
```
