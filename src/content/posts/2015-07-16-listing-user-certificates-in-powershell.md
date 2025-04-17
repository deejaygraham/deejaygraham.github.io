---
title: Finding and using user certificates in PowerShell
tags: [powershell]
hero: power
thumbnail: "/assets/img/thumbnails/parcel-420x255.png"

---

Accessing a certificate store from PowerShell is another one of those incantations that never
seems to stick in my head. Here are a selection of useful certificate snippets...

## Find All Certificates

Here's the way to list out what's currently installed:

```powershell

Get-ChildItem -Recurse cert:\CurrentUser\My

```

## Find a Specific Thumbprint

And here's how to find a specific certificate by thumbprint:

```powershell

$thumbprint = "3AB949D9C151E1ED4C98560D5FA7DAD664404192"

$cert = Get-Item Cert:\CurrentUser\My\$thumbprint

$cert.Thumbprint

```

Of course, sometimes we want to find a certificate _anywhere_ it might be installed on a machine so we can go fully into
searching all through the cert store. This might be too much, depending on the number of certificates so here I have added
a filter where I know the thumbprint of the cert I am looking for.

## Global Find by Thumbprint

```powershell

Get-ChildItem -Path cert:\* -Recurse | Where-Object { $\_.Thumbprint -eq '1A3B72F28ACE90E1EF98591BE8FEF41CB3D4AB63' }

```

## Where ?

Sometimes a certificate needs to be in the correct location to be found by software. If you've found a certificate, the PSPath
property tells you where it was installed.

```powershell

$c = Get-ChildItem -Path cert:\* -Recurse | Where-Object { $_.Thumbprint -eq '1A3B72F28ACE90E1EF98591BE8FEF41CB3D4AB63' }
$c.PSPath

```

The output will look something like: `Microsoft.PowerShell.Security\Certificate::CurrentUser\My\1A3B72F28ACE90E1EF98591BE8FEF41CB3D4AB63`
which shows it's installed under the current user's personal store.

## Uninstall by thumbprint

The example above can be combined with the usual Remove-Item cmdlet to uninstall a certificate once it has been found.

```powershell

Get-ChildItem -Path cert:\* -Recurse |
Where-Object { $\_.Thumbprint -eq '1A3B72F28ACE90E1EF98591BE8FEF41CB3D4AB63' } |
Remove-Item -Force -Verbose

```

## Importing

Of course, you do need to be able to install a certificate in the first place. Most often we deal with Pfx files which require
the password to import them:

```powershell

$NewCertificatePassword = ConvertTo-SecureString -String 'ThisIsNotThePassword' -Force -AsPlainText

# or popup a dialog asking for the password

# $NewCertificatePassword = (Get-Credential -UserName 'Enter password below' -Message 'Enter password below').Password

$NewCertificateFile = 'MyNewCertificate.pfx'
$DesktopPath = [Environment]::GetFolderPath("Desktop")
$NewCertificatePath = Join-Path -Path $DesktopPath -ChildPath $NewCertificateFile

Import-PfxCertificate -FilePath $NewCertificatePath -CertStoreLocation 'Cert:\CurrentUser\My' -Password $NewCertificatePassword -Verbose

```

## Thumbprint from Pfx

If we have the pfx file, we can get the thumbprint (useful for config files etc.) without the certificate being installed like this:

```powershell

$cert = Get-PfxData -FilePath $NewCertificatePath -Password $Password
$cert.OtherCertificates

# or

# $cert.EndEntityCertificates

```
