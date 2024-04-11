# Turn off app pool restart after 'n' hours
Set-ItemProperty IIS:\AppPools\$ApplicationPoolName -Name Recycling.periodicRestart.time -Value '0.00:00:00'

# Turn on app pool restart at a random time between midnight and 2am.
Clear-ItemProperty IIS:\AppPools\$ApplicationPoolName -Name Recycling.periodicRestart.schedule

[int]$Hour = Get-Random -Maximum 2
[int]$Minutes = Get-Random -Minimum 1 -Maximum 60
[string]$FormattedTime = (New-TimeSpan -Hours $Hour -Minutes $Minutes).ToString("hh\:mm")

New-ItemProperty -Path IIS:\AppPools\$ApplicationPoolName -Name Recycling.periodicRestart.schedule -Value $FormattedTime
