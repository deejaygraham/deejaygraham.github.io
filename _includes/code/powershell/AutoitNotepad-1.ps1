$here = Split-Path -Path $MyInvocation.MyCommand.Path

Get-Module AutoItX | Remove-Module -Force
Import-Module $here\AutoItX.psd1 -Force

Initialize-AU3

Invoke-AU3Run -Program notepad.exe

$NotepadTitle = "Untitled - Notepad"
Wait-AU3Win -Title $NotepadTitle

$hWnd = Get-AU3WinHandle -Title $notepadTitle

Show-AU3WinActivate -WinHandle $hWnd
$edit = Get-AU3ControlHandle -WinHandle $hWnd -Control "Edit1"

Set-AU3ControlText -ControlHandle $edit -WinHandle $hWnd -NewText "Hello World!" 

Sleep -Seconds 10

# Close even if prompted.
Close-AU3Win($hWnd)