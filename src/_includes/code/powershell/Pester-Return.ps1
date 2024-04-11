Import-Module Pester

$Result = Invoke-Pester -Script @{ Path = '.\*.Tests.ps1'; Parameters = @{ Cookie = 'Chocolate Chip'; Count = 99 } }

If ($Result.FailedCount -ne 0) {
	Write-Error 'Cookie Monster Tests failed'
    exit 1
}
