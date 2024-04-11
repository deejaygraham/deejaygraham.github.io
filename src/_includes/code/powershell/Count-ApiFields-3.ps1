
Describe 'API Get Method' {

	$ApiObject = Invoke-RestMethod -Method Get -Uri $Resource 

	It 'Contains correct number of fields' {
	
		(Get-Member -InputObject $ApiObject -MemberType NoteProperty).Count | Should Be 5
	}
}
