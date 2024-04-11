Set-Location IIS:\Sites

Get-ChildItem | Where-Object { $_.State -eq 'Stopped' } | ForEach-Object { Start-Website -Name $_.Name }
