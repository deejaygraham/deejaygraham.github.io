Start-Process "iisreset.exe" -NoNewWindow -Wait

$Path = "C:\Windows\Microsoft.NET\Framework*\v*\Temporary ASP.NET Files"
Get-ChildItem $Path -Recurse | 
Remove-Item -Recurse