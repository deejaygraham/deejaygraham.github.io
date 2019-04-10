
FormatTaskName "------- Executing {0} Task -------"


FormatTaskName {
   Param($TaskName)
   Write-Host "------------------ $TaskName ------------------ " -ForegroundColor Green
}
