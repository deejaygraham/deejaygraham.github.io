Set-Location IIS:\Sites

Get-ChildItem | Where-Object { $_.State -eq 'Started' } | ForEach-Object { Stop-Website -Name $_.Name }
