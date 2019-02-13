# Install scenario: Install dependent components before running main script.

# Include other tasks in this script
Include '.\Component1-PSake.ps1'
Include '.\Component2-PSake.ps1'


Task ? -Description 'List tasks' -alias 'Help' { WriteDocumentation }
Task Default -Depends RunTool 


Task RunTool -Depends DeploymentDependencies -Description 'Runs the newly installed version of the tool' {

    Write-Host 'Running tool after dependencies installed'
}

Task DeploymentDependencies -Depends Component1-Install, Component2-Install, ...
