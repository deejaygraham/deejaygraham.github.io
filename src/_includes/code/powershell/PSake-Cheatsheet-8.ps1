Task Copy-Files -RequiredVariables BuildPath, Version, MachineName {

}

Task Verify {

  Assert (Test-Path 'c:\scripts\debug.txt') 'Debug.txt file has not been deployed'
  Assert (![string]::IsNullOrEmpty($Version)) '$Version was null or empty'
}



