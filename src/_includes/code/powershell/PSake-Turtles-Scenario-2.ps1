# Install scenario: Install dependent components before running main script.

Task ? -Description 'List tasks' -alias 'Help' { WriteDocumentation }
Task Default -Depends RunTool 


Task RunTool -Depends InstallComponent1, InstallComponent2 -Description 'Runs the newly installed version of the tool' {

    Write-Host 'Running tool after dependencies installed'
}


Task InstallComponent1 {

    Invoke-Psake .\Component1-PSake.ps1 -NoLogo
}


Task InstallComponent2 {

    Invoke-Psake .\Component2-PSake.ps1 -NoLogo 
}
