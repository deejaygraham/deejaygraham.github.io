Get-ChildItem $MyPath\* -Include *.htm |
Rename-Item -NewName {$_.Name -replace '.htm','.md'} -PassThru