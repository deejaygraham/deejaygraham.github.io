
[CmdletBinding()]
Param (
    [Parameter(Mandatory=$True, HelpMessage="Web hook endpoint configured on a channel in Teams")]
    [string]$WebHook,

    [Parameter(Mandatory=$True, HelpMessage="Message to post to the channel")]
    [string]$Message
)

$Post = @{ text = $Message }

$JsonifiedObject = $Post | ConvertTo-Json

Invoke-RestMethod -Uri $WebHook -Method post -Body $JsonifiedObject -ContentType 'Application/Json' 
