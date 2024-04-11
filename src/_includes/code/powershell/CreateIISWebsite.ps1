Import-Module WebAdministration

[string]$IISAppPoolName = "my-lovely-site"
[string]$IISAppPoolDotNetVersion = "v4.0"
[string]$IISAppName = "MyLovelySite"
[int]$Port = 3000

[string]$ScriptFile = $MyInvocation.MyCommand.Path
[string]$ScriptFolder = Split-Path $ScriptFile -Parent

[string]$DirectoryPath = Join-Path $ScriptFolder -ChildPath html

cd IIS:\AppPools\

If (Test-Path $IISAppPoolName -PathType container) {
    Remove-WebAppPool $IISAppPoolName
}

$AppPool = New-Item $IISAppPoolName
$AppPool.managedRuntimeVersion = $IISAppPoolDotNetVersion

cd IIS:\Sites\

If (Test-Path $IISAppName -PathType Container) {
    Remove-Website $IISAppName
}

New-Website -Name $IISAppName -PhysicalPath $DirectoryPath -ApplicationPool $AppPool.name -Port $Port | Out-Null

Start-Process -FilePath "http://localhost:$Port/index.html"
