Import-Module BitsTransfer; 

[string]$ToolsFolder = 'c:\tools'
[string]$ToolName = 'AzureTools.exe'
[string]$AzureToolsUrl = "http://dsazure.blob.core.windows.net/azuretools/$ToolName"

New-Item $ToolsFolder -Type directory -Force | Out-Null
Start-BitsTransfer $AzureToolsUrl "$ToolsFolder\$ToolName"
& "$ToolsFolder\$ToolName"