
Task Component2-CopyFiles -Description 'Copy component 2 files from network to local folder' {

    Write-Host "Copying component2.msi from network to local folder"
}


Task Component2-Install -Depends Component2-CopyFiles -Description 'Installs component 2 to local machine' {

    Write-Host "Installing component2.msi"
}
