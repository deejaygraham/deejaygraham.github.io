Function TypeCharacters([string]$Text) {

    $EscapeTheseCharacters = @('!', '#')

	$Text.ToCharArray() | ForEach-Object {
	
		$Character = $_
		
		If (($EscapeTheseCharacters | Where-Object { $_ -eq $Character}) -ne $null) {
			$Character = "{$Character}"
		}
		
		Send-AU3Key -Key $Character
	}
}

TypeCharacters('Hello!#')
