Import-Module Pester

Invoke-Pester -Script @{ Path = '.\*.Tests.ps1'; Parameters = @{ Cookie = 'Chocolate Chip'; Count = 99 } }
