Import-Module WebAdministration 

Set-Location IIS:\AppPools

Get-ChildItem |
ForEach-Object {

    [string]$ApplicationPoolName = $_.Name

    Write-Output "Doing stuff with app pool $ApplicationPoolName"
	
	...
	
}
