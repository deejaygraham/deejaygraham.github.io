Set-StrictMode -Version Latest

[string]$script:BaseUrl =  'https://swapi.co/api/'
[hashtable]$script:Headers = @{ }


Function Set-ApiBaseUrl {
    [CmdletBinding()]
    Param (
		[Parameter(Mandatory=$True)]
        [ValidateNotNullOrEmpty()]
		[string]$Url
    )
	
	Write-Verbose "Changing api url to $Url"
	
	$script:BaseUrl = $Url
}


Function Set-ApiHeaders {
    [CmdletBinding()]
    Param (
		[Parameter(Mandatory=$True)]
		[hashtable]$Headers
    )

	$script:Headers = $Headers
}


Function Get-ApiResource {
    [CmdletBinding()]
    Param (
        [Parameter(Mandatory=$True, Position=0)]
        [string]$Resource
    )

    $Response = Invoke-RestMethod -Method Get -Uri "$($script:BaseUrl)$Resource" -Headers $script:Headers

    Write-Output $Response
}


Function Add-ApiResource {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory=$True, Position=0)]
        [string]$Resource,

    	[Parameter(Mandatory=$True, Position=1)]
	    [hashtable]$Body
    )

    $Json = $Body | ConvertTo-Json
    $Response = Invoke-RestMethod -Method Post -Uri "$($script:BaseUrl)$Resource" -Headers $script:Headers -Body $Json -ContentType 'application/json'

    Write-Output $Response
}


Function Set-ApiResource {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory=$True, Position=0)]
        [string]$Resource,

    	[Parameter(Mandatory=$True, Position=1)]
	    [hashtable]$Body
    )

    $Json = $Body | ConvertTo-Json
    $Response = Invoke-RestMethod -Method Put -Uri "$($script:BaseUrl)$Resource" -Headers $script:Headers -Body $Json -ContentType 'application/json'

    Write-Output $Response
}


Function Remove-ApiResource {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory=$True, Position=0)]
        [string]$Resource
    )

    $Response = Invoke-RestMethod -Method Delete -Uri "$($script:BaseUrl)$Resource" -Headers $script:Headers

    Write-Output $Response
}
