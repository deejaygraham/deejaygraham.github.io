# Environment may be from cmdlet param.
$Environment = 'dev' 
$File = 'C:\MyData.psd1'

$Config = Import-PowerShellDataFile $File

Write-Output $Config[$Environment].url
