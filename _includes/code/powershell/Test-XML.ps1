[CmdletBinding()]
Param (
	[Parameter(Mandatory=$true, HelpMessage="Path or wildcard to xml file to test.")]
	[ValidateNotNullorEmpty()]
	[string]$Path
)

Resolve-Path $Path | % {

	$XmlFile = $_.Path
	
	If (!(Test-Path -Path $XmlFile)) {
		throw "The file $($XmlFile) does not exist"
	}

	$xml = New-Object System.Xml.XmlDocument

	Try {
		$xml.Load($XmlFile)
	}
	Catch [System.Xml.XmlException] {
		Write-Error "$Path : $($_.ToString())"
		exit 1
	}
}
