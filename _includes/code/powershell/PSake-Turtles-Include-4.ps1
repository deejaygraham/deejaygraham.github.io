# Install Component 2

Task Default -Depends CopyFiles, RunInstaller


Task CopyFiles -Description 'Copy component 2 files from network to local folder' {

    Write-Host "Copying component2.msi from network to local folder"
}


Task RunInstaller -Depends CopyFiles -Description 'Installs component 2 to local machine' {

    Write-Host "Installing component2.msi"
}
