$LogFilePath = 'C:\FusionLog\'
$FusionPath = HKLM:\Software\Microsoft\Fusion

$Flags = @( 'ForceLog', 'LogFailures', 'LogResourceBinds' )

$Flags | ForEach-Object { 
	Set-ItemProperty -Path $FusionPath -Name $_ -Value 1 -Type DWord
}

Set-ItemProperty -Path $FusionPath -Name LogPath -Value $LogFilePath -Type String
