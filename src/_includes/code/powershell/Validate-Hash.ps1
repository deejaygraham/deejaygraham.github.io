$OriginalHashes = @{ }

# Record pre-whatever state.
Get-ChildItem -Path $here -Filter *.* | ForEach-Object {

	[string]$File = $_.Name
	[string]$Hash =  (Get-FileHash $_.FullName).Hash

	$OriginalHashes.Add($File, $Hash)
}

# ... Do something potentially destructive

# Regenerate hashes and compare to existing.
Get-ChildItem -Path $here -Filter *.* | ForEach-Object {

	[string]$File = $_.Name
	[string]$NewHash =  (Get-FileHash $_.FullName).Hash

	If ($OriginalHashes.ContainsKey($File)) {

		$OldHash = $OriginalHashes[$File]

		If ($OldHash -ne $NewHash) {
				
			Write-Host "Hash values differ for $File - old: $OldHash new: $NewHash" -ForegroundColor Red

		} Else {

			Write-Host "Hashes for $File match" -ForegroundColor Green
		}

	} Else {
			
		Write-Host "New file: $File"  -ForegroundColor Yellow
	}
}
