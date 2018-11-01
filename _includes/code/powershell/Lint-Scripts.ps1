# Install-Module PSScriptAnalyzer 

$here = Split-Path -Parent $MyInvocation.MyCommand.Path

Get-ChildItem -Path $here -Filter *.ps1 -Recurse | ForEach-Object {

    Invoke-ScriptAnalyzer -Path $_.FullName -IncludeDefaultRules -OutVariable Failures

	If ($Failures.Count -gt 0) {
		Write-Output "$_.FullName - $($Failures.Count) rule failures"
	}
}
