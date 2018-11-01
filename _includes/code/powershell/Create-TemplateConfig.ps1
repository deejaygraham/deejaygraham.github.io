@"
@{
    Agent = @{

        Version = '1.0.0'
        Debug = 'true'
    }

    LocalFolders = @{
    
        PowerShellScripts = 'C:\Scripts\PS'
    }
}

"@ | Out-File -FilePath 'Agent.psd1' -Force
