Compress-Archive `
	-Path "$($ZipSourceFolder)\*" `
	-DestinationPath (Join-Path -Path $OutputFolder -ChildPath "$($_).zip") `
	-Force