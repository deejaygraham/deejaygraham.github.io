
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$here = Split-Path -Path $MyInvocation.MyCommand.Path
Import-Module $here\RestAPI.psm1
Import-Module Pester

$BaseUrl = 'https://swapi.co/api/'

Set-ApiBaseUrl -Url $BaseUrl

Invoke-Pester "$here\*.Tests.ps1" -Verbose:$VerbosePreference 
