[CmdletBinding()]            
Param(            
    [Alias("User","UserName","Identity")]            
    [string]$UserAccount = $env:USERNAME,            
    [string]$Domain = $env:USERDOMAIN            
)            

$User = [System.Security.Principal.NTAccount]::new($Domain, $UserAccount)            
$Ident = $User.Translate([System.Security.Principal.SecurityIdentifier])            

New-Object –TypeName PSObject –Prop ( @{
    UserName = $UserAccount            
    Domain = $Domain            
    SID = $Ident.Value
})            
