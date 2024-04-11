
Describe 'API Get Method' {

	$ApiObject = Invoke-RestMethod -Method Get -Uri $Resource 

	It 'Contains correct number of fields' {
	
		$ApiObject | Get-FieldCount | Should Be 5
	}
}
