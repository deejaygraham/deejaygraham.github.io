[string]$SourceFolder = 'D:\MyCode\Source' 

$GrepFor = @( 'using System.Reflection' )

Get-ChildItem -Path $SourceFolder -Filter *.cs -Recurse | % {

    $File = $_.FullName
    $Content = Get-Content -Path $File 
  
    $GrepFor | % {
    
        $Pattern = $_
        $Content | Select-String -Pattern $Pattern
    }
} 