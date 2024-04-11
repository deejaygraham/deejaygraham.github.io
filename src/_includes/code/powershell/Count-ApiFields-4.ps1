
Function Get-FieldCount {
	[CmdletBinding()]
	Param(
		[Parameter(Mandatory=$True, ValueFromPipeline=$True)]
		$InputObject
	)
	
	Process {
		ForEach ($apiObj in $InputObject) {
			$FieldCount = (Get-Member -InputObject $apiObj -MemberType NoteProperty).Count
			Write-Output $FieldCount
		}
	}
}
