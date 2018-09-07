Start-Process notepad.exe
Start-Sleep -Seconds  3

$Shell = New-Object -ComObject WScript.Shell
$Shell.AppActivate('Untitled - Notepad')
Start-Sleep -Seconds  3

$Shell.SendKeys('Hello World')

# Close Notepad 
$Shell.SendKeys({%})
Start-Sleep -Seconds 1
$Shell.SendKeys({F})
Start-Sleep -Seconds 1
$Shell.SendKeys({X})
Start-Sleep -Seconds 1

# Answer No - Don't save when prompted 
$Shell.SendKeys({n}) 
Start-Sleep -Seconds 1
