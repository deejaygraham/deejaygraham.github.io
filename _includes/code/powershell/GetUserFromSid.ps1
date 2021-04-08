[CmdletBinding()]            
Param(            
    [string]$Sid      
)            

$SecurityIdent = New-Object System.Security.Principal.SecurityIdentifier $Sid

$User = $SecurityIdent.Translate( [System.Security.Principal.NTAccount]) 

$UserAccount = $User.Value
$Domain = ''

If ($UserAccount.Contains('\')) {
    $Chunks = $User.Value.Split('\')
    $Domain = $Chunks[0]
    $UserAccount = $Chunks[1]
}


New-Object –TypeName PSObject –Prop ( @{
    UserName = $UserAccount            
    Domain = $Domain            
    SID = $Sid
})            
