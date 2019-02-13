# Install Component 1

Task Default -Depends CopyFiles, RunInstaller


Task CopyFiles -Description 'Copy component 1 files from network to local folder' {

    Write-Host "Copying component1.msi from network to local folder"
}


Task RunInstaller -Depends CopyFiles -Description 'Installs component 1 to local machine' {

    Write-Host "Installing component1.msi"
}
