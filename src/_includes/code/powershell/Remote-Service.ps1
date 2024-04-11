# Stop Tfs agent on all machines
$Computers = @( 'COMPUTER-1', 'COMPUTER-2', 'COMPUTER-3' )
$VSOAgent = 'vsoagent.tgtfs*' 

$Computers | % { Get-Service  -ComputerName $_ -Name $VSOAgent | Set-Service -Status Stopped }
