
# Requires Module Az

$Tenant = 'my-tenant-guid-from-AAD-overview-page-in-portal'
$ApplicationId = 'application-id-guid-from-earlier'
$Secret = 'service-principal-secret-from-earlier'
$VaultName = 'key-vault-name'

# Authenticate against Azure
[SecureString]$pwd = ConvertTo-SecureString $Secret -AsPlainText -Force
[PSCredential]$Credential = New-Object System.Management.Automation.PSCredential($ApplicationId, $pwd)
Connect-AzAccount -Credential $Credential -Tenant $Tenant -ServicePrincipal

# Now we can get secrets. 
$Value = Get-AzKeyVaultSecret -VaultName $VaultName -Name 'My Sinister Secret'
$InsecureValue = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($Value.SecretValue))
Write-Output $InsecureValue
