$KeyVaultName = "$($ResourceGroupName)-kv"

Write-Verbose "Checking for key vault $KeyVaultName in $ResourceGroupName"
$KeyVault = Get-AzKeyVault -VaultName $KeyVaultName -ResourceGroupName $ResourceGroupName -ErrorAction SilentlyContinue

If ($null -eq $KeyVault) {
    Write-Verbose "Creating new key vault $KeyVaultName in $ResourceGroupName"
    $KeyVault = New-AzKeyVault -Name $KeyVaultName -ResourceGroupName $ResourceGroupName -Location $Location -EnabledForDeployment -EnabledForTemplateDeployment -Sku Standard -SoftDeleteRetentionInDays 7
}

$Secrets = @(
    @{ Key = 'My Sinsiter Secret'; Value = 'I am not telling you' }
)

$Secrets | ForEach-Object {
    $Key = $_.Key
    $Value = $_.Value

    $Secret = ConvertTo-SecureString -String $Value -AsPlainText -Force
    Set-AzKeyVaultSecret -VaultName $KeyVaultName -Name $Key -SecretValue $Secret | Out-Null
}

$ServicePrincipal = New-AzADServicePrincipal  -DisplayName 'MyLovelySP'

# Store these values !!!
$UserName = $ServicePrincipal.ApplicationId
$Password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($ServicePrincipal.Secret))

Set-AzKeyVaultAccessPolicy -VaultName $KeyVaultName -ServicePrincipalName $ServicePrincipal.ApplicationId -PermissionsToKeys create,import,delete,list -PermissionsToSecrets set,delete 
