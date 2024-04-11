[string]$here = Split-Path -Path $MyInvocation.MyCommand.Path
[string]$File = $MyInvocation.MyCommand.Name -replace '.ps1', '.psd1' 
[string]$DataFile = Join-Path -Path $here -ChildPath $File

Write-Verbose "Reading configuration from $File"
$TestConfig = Import-PowerShellDataFile $DataFile
