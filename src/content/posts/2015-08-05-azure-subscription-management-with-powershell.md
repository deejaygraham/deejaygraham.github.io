---
title: Azure subscription management with PowerShell
tags: [cloud]
hero: cloud
thumbnail: "/assets/img/thumbnails/parcel-420x255.png"

---

## .PublishSettings

Many techniques for connecting to Azure using PowerShell rely on the .publish settings file. The
main disadvantage of this approach is that the file, because it is a tangible object, is likely
to get checked into source control and used by anyone with no traceability.

## Manual Login

You could force the user to login each time using the **Add-AzureAccount** command which can get
super tedious.

![azure login](/assets/img/posts/azure-subscription-management-with-powershell/azure-login.png)

This is fine for occasional tasks that require authentication but no one I know
is happy to use this method

## Certificates

Luckily, Azure also supports using a self-signed certificate to authenticate PowerShell
automation.

Create a new certificate using the **makecert.exe** utility

```shell

makecert -sky exchange -r -n "CN=[My Azure Management Certificate]"
-pe -a sha1 -len 2048 -ss My
-sv MyAzureManagementCertificate.pvk
MyAzureManagementCertificate.cer

```

![makecert](/assets/img/posts/azure-subscription-management-with-powershell/make-cert-command-line.png)

Fill in the password and confirmation at the prompt.

![password](/assets/img/posts/azure-subscription-management-with-powershell/make-cert-password.png)

Now, convert the .pvk to a .pfx so we can upload it to Azure.

```shell

pvk2pfx –pvk MyAzureManagementCertificate.pvk
–spc MyAzureManagementCertificate.cer
–pfx MyAzureManagementCertificate.pfx
–po ThisIsNotMyPassword

```

Upload the .pfx to the cloud service using the Azure portal.

![azure upload](/assets/img/posts/azure-subscription-management-with-powershell/azure-upload.png)

Note the certificate thumbprint using PowerShell...

```powershell

Get-Item Cert:\\CurrentUser\My\*
```

or, more easily, copy it from the entry in th certificates page of the portal.

Finally, find the certificate using the thumbprint and pass it to **Set-AzureSubscription**

```powershell

$SelfCert = Get-Item Cert:\CurrentUser\My\<certificate thumbprint>
Set-AzureSubscription -SubscriptionName "My Subscription"
-SubscriptionId "<from azure portal>"
-Certificate $SelfCert

```

## ActiveDirectory

The final method of authentication is using Azure AD. I haven't had a chance to play with this yet
so may write about that at a later time.
