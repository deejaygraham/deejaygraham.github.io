[string]$SourceFolder = 'D:\MyCode\Source'

$SearchTerms = @( 'using System.' )

Get-ChildItem -Path $SourceFolder -Filter *.cs -Recurse | % {

    $Path = $_.FullName
    $FileContent = Get-Content -Path $Path

    $SearchTerms | % {

        $SearchPattern = $_
        $FileContent | Select-String -Pattern $SearchPattern
    }
}
