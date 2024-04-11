#requires -version 5.0

$ConfigData = @{

    AllNodes = @(
        @{
            NodeName = $env:COMPUTERNAME
        }
    )
}


Configuration MyExampleConfiguration {

    Import-DscResource -ModuleName 'PSDesiredStateConfiguration'
    Import-DscResource -ModuleName 'cApplicationConfiguration'

    Node $AllNodes.NodeName {
         
        # Other DSC Stuff...

        <# 
            MODIFY WEB.CONFIGS
        
        #>

        $Dictionary = @{
            Name = 'Alice'
            Url = 'http://www.google.com'
        }

        $WebConfigFile = Join-Path -Path $WebAppPath -ChildPath 'Web.config'
        $Dictionary.Keys.ForEach({ 
                
            $key = $_
            $value = $Dictionary[$key]

            cApplicationConfiguration $key {
                Name = $key
                Path = $WebConfigFile
                Key = $key 
                Value = $value
            }
        })

        # More DSC stuff..

    } #Node

} # Configuration


$MofFolder = Join-Path $PSScriptRoot 'MOF'

MyExampleConfiguration -ConfigurationData $ConfigData -OutputPath $MofFolder | Out-Null
Start-DscConfiguration -Path $MofFolder -Force -Wait -Verbose
