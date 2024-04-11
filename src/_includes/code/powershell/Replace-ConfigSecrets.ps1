Function Replace-ConfigSecrets {
	[CmdletBinding()]
	Param (
		[string]$ConfigPath
	) 

$Replacements = @{

    '##MY_CREDENTIALS_USERNAME##' = 'This is not my user name' 
    '##MY_CREDENTIALS_PASSWORD##' = 'This might be my password'
}

Write-Verbose "Starting to process $ConfigPath"

(Get-Content -Path $ConfigPath) | ForEach-Object { 
    
	$EachLine = $_

    $Replacements.GetEnumerator() | ForEach-Object {
		
        if ($EachLine -match $_.Key)
        {
            Write-Verbose "Changing $EachLine to $($_.Value)" 
            $EachLine = $EachLine -replace $($_.Key), $($_.Value)

            Write-Verbose "Line is now $EachLine"
        }
   }

    $EachLine
} | Out-File $ConfigPath

Write-Verbose "Completed processing for $ConfigPath"
