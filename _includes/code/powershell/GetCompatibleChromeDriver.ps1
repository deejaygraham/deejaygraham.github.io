[CmdletBinding()]
Param (

    [Parameter()]
    [string]$WebDriverFolder = 'C:\WebDrivers',

    [Parameter()]
    [string]$WebDriverApplication = 'chromedriver.exe',

    [Parameter()]
    [string]$ChromeDriverZipFile = 'chromedriver_win32.zip',

    [Parameter()]
    [string]$GoogleStorageUri = 'https://chromedriver.storage.googleapis.com'
)

If (!(Test-Path -Path $WebDriverFolder)) {
    Write-Verbose "Folder $WebDriverFolder does not exist, creating"
    New-Item -Path $WebDriverFolder -ItemType Directory -Force | Out-Null
}

$WebDriverPath = Join-Path -Path $WebDriverFolder -ChildPath $WebDriverApplication

If (!(Test-Path -Path $WebDriverPath)) {
    Write-Verbose 'Web Driver not found, attempting to get the most recent version'

    $ChromeInstallPathRegKey = 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe'
    $InstalledChromeVersion = (Get-Item (Get-ItemProperty $ChromeInstallPathRegKey).'(Default)').VersionInfo.ProductVersion

    $MajorBuild = $InstalledChromeVersion.Split('.')[0]

    Write-Verbose "Installed version of Chrome is $InstalledChromeVersion, checking for compatible driver version $MajorBuild"

    # Look for most recent version of the driver...
    $LatestDoc = "$GoogleStorageUri/LATEST_RELEASE_$($MajorBuild)"
    $LocalDoc = Join-Path -Path $WebDriverFolder -ChildPath "LATEST_RELEASE_$($MajorBuild)"
    Invoke-WebRequest -Uri $LatestDoc -OutFile $LocalDoc

    $LatestDriverVersion = Get-Content -Path $LocalDoc
    Write-Verbose "Latest driver version is $LatestDrvierVersion"

    $DownloadUri = "$GoogleStorageUri/$LatestDriverVersion/$ChromeDriverZipFile"
    $LocalZipFile = Join-Path -Path $WebDriverFolder -ChildPath $ChromeDriverZipFile

    Write-Verbose "Downloading from $DownloadUri to $LocalZipFile"
    Invoke-WebRequest -Uri $DownloadUri -OutFile $LocalZipFile

    If (Test-Path -Path $LocalZipFile) {
        Write-Verbose "Unzipping driver to $WebDriverFolder"
        Expand-Archive -Path $LocalZipFile -DestinationPath $WebDriverFolder
    }
}
