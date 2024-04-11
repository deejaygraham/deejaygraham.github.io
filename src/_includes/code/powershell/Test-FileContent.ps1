It 'Replaced all moustache markup' {

    Get-ChildItem -Path (Join-Path -Path $PSScriptRoot -ChildPath _site) -Filter *.html |
    Get-Content |
    Select-String 'moustache' |
    Should -Be $null 
}
