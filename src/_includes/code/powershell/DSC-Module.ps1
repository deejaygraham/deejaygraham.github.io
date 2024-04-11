enum Ensure {
    Present
    Absent
}

[DscResource()]
class cApplicationConfiguration {

    [DscProperty(Key)]
    [string]$Name

    [DscProperty(Mandatory)]
    [string]$Path

    [DscProperty(Mandatory)]
    [string]$Key

    [DscProperty()]
    [string]$Value

    [DSCProperty()]
    [Ensure] $Ensure = [Ensure]::Present

    [cApplicationConfiguration] Get() {
        
        $state = [hashtable]::new()
        $state.Name = $this.Name
        $state.Path = $this.Path
        $state.Key = $this.Key

        If (Test-Path -Path $this.Path) {

            [xml]$AppConfigXml = Get-Content -Path $this.Path

            If ($this.Key) {
                $XPath = "//appSettings/add[@key = '$($this.Key)']"
                $Node = $AppConfigXml.SelectSingleNode($XPath)

                If ($Node) {
                    $state.Value = $Node.value
                    $state.Ensure = [Ensure]::Present
                } Else {
                    $state.Ensure = [Ensure]::Absent
                }
            }
        } 

        return [cApplicationConfiguration]$state
    }

    [bool] Test() {

        If (Test-Path -Path $this.Path) {
            [xml]$AppConfigXml = Get-Content -Path $this.Path

            $XPath = "//appSettings/add[@key = '$($this.Key)']"
            $Node = $AppConfigXml.SelectSingleNode($XPath)

            [bool]$Found = $null -ne $Node -and $Node.value -eq $this.Value

            If ($Found) {
                Write-Verbose "'$($this.Key)' exists with value '$($Node.value)' in '$($this.Path)'"
            } Else {
                Write-Verbose "'$($this.Key)' does not have the correct value in '$($this.Path)'"
            }

            return $Found
        }

        return $False
    }

    [void] Set() {

        [xml]$AppConfigXml = Get-Content -Path $this.Path
        $XPath = "//appSettings/add[@key = '$($this.Key)']"

        $Node = $AppConfigXml.SelectSingleNode($XPath)

        If($null -ne $Node -and $this.Ensure -eq [Ensure]::Present) {
            Write-Verbose "Setting '$($this.Key)' to '$($this.Value)' in '$($this.Path)'"
            $Node.SetAttribute('value', $this.Value)
        } 

        $AppConfigXml.Save($this.Path)
    }
}