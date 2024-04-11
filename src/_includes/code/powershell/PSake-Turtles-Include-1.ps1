
Task Component1-CopyFiles -Description 'Copy component 1 files from network to local folder' {

    Write-Host "Copying component1.msi from network to local folder"
}


Task Component1-Install -Depends Component1-CopyFiles -Description 'Installs component 1 to local machine' {

    Write-Host "Installing component1.msi"
}
