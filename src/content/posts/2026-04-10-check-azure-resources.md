---
title: Check Azure Resources
draft: true
tags: [azure, powershell]
---

Recently I was making some changes to build scripts following a template but with a high possibility that there could be typos creeping in 
as the work got more and more repetitive. I wrote a script in powershell to log into Azure and run through the list of resource groups matching 
a specific prefix and possibly a suffix. I also added a switch to check for resources inside each resource group and a way to pick out individual 
resource types (or All found). I was specifically interested in databases, key vaults, container apps and jobs. 


## Code

The following code relies on the Az module being installed and that you are already logged into an azure session. 

### Get-AzResourcesByName.ps1

```powershell
# Requires: Install-Module Az -Repository PSGallery -Scope CurrentUser

[CmdletBinding()]
param (
    [Parameter(Mandatory)]
    [string]$Prefix,

    [string]$Suffix,
    
    [switch]$IncludeResources,

    [ValidateSet("All", "Postgres", "KeyVaults", "ContainerApps", "ContainerAppJobs", "AppServices")]
    [string[]]$ResourceTypes = @("All")
)
<#
.SYNOPSIS
Lists Azure Resource Groups matching a naming scheme and queries specific resources.

.PARAMETER Prefix
Resource Group name prefix (required).

.PARAMETER Suffix
Optional Resource Group name suffix.

.PARAMETER IncludeResources
Switch to enable resource queries.

.PARAMETER ResourceTypes
Types of resources to query.
Valid values: Postgres, KeyVaults, ContainerApps, ContainerAppJobs, AppServices, All
#>

# ---------------------------
# Resource Group filtering
# ---------------------------
$resourceGroups = Get-AzResourceGroup | 
    Where-Object {
        if ([string]::IsNullOrWhiteSpace($Suffix)) {
            $_.ResourceGroupName -like "$Prefix*"
        } else {
            $_.ResourceGroupName -like "$Prefix*$Suffix"
        }
    } |
    Sort-Object -Property ResourceGroupName

Write-Host "`nMatching Resource Groups:`n" -ForegroundColor Cyan
$resourceGroups |
    Select-Object ResourceGroupName, Location |
    Format-Table -AutoSize

# ---------------------------
# Resource discovery
# ---------------------------
if ($IncludeResources) {

    foreach ($rg in $resourceGroups) {

        $rgHasResults = $false

        # ---------------------------
        # PostgreSQL (Single + Flexible Server)
        # ---------------------------
        $postgresResults = @()
        if ($ResourceTypes -contains "All" -or $ResourceTypes -contains "Postgres") {
            $postgresResults = Get-AzResource -ResourceGroupName $rg.ResourceGroupName |
                Where-Object {
                    $_.ResourceType -match "Microsoft.DBforPostgreSQL"
                } 
        }

        # ---------------------------
        # Key Vaults
        # ---------------------------
        $keyVaultResults = @()
        if ($ResourceTypes -contains "All" -or $ResourceTypes -contains "KeyVaults") {
            $keyVaultResults = Get-AzKeyVault -ResourceGroupName $rg.ResourceGroupName -ErrorAction SilentlyContinue
        }

        # ---------------------------
        # Container Apps
        # ---------------------------
        $containerAppResults = @()
        if ($ResourceTypes -contains "All" -or $ResourceTypes -contains "ContainerApps") {
            $containerAppResults = Get-AzContainerApp -ResourceGroupName $rg.ResourceGroupName -ErrorAction SilentlyContinue 
        }

        # ---------------------------
        # Container App Jobs
        # ---------------------------
        $containerAppJobResults = @()
        if ($ResourceTypes -contains "All" -or $ResourceTypes -contains "ContainerAppJobs") {
            $containerAppJobResults = Get-AzContainerAppJob -ResourceGroupName $rg.ResourceGroupName -ErrorAction SilentlyContinue
        }

        # ---------------------------
        # App Services (Web Apps + Function Apps)
        # ---------------------------
        $appServiceResults = @()
        if ($ResourceTypes -contains "All" -or $ResourceTypes -contains "AppServices") {
            $appServiceResults = Get-AzWebApp -ResourceGroupName $rg.ResourceGroupName -ErrorAction SilentlyContinue
        }
        
        if (
            $postgresResults.Count -gt 0 -or
            $keyVaultResults.Count -gt 0 -or
            $containerAppResults.Count -gt 0 -or
            $containerAppJobResults.Count -gt 0 -or
            $appServiceResults.Count -gt 0
        ) {
            Write-Host "`n=== $($rg.ResourceGroupName) ===" -ForegroundColor Yellow
        }
        else {
            continue
        }

        if ($postgresResults.Count -gt 0) {
            Write-Host "`nPostgreSQL Servers:" -ForegroundColor Cyan
            $postgresResults |
                Select-Object Name|
                Format-Table -AutoSize
        }

        if ($keyVaultResults.Count -gt 0) {
            Write-Host "`nKey Vaults:" -ForegroundColor Cyan
            $keyVaultResults |
                Select-Object VaultName |
                Format-Table -AutoSize
        }

        if ($containerAppResults.Count -gt 0) {
            Write-Host "`nContainer Apps:" -ForegroundColor Cyan
            $containerAppResults |
                Select-Object Name |
                Format-Table -AutoSize
        }

        if ($containerAppJobResults.Count -gt 0) {
            Write-Host "`nContainer App Jobs:" -ForegroundColor Cyan
            $containerAppJobResults |
                Select-Object Name |
                Format-Table -AutoSize
        }

        if ($appServiceResults.Count -gt 0) {
            Write-Host "`nApp Services (Web & Function Apps):" -ForegroundColor Cyan
            $appServiceResults |
                Select-Object Name |
                Format-Table -AutoSize
        }
    }
}

```
