---
layout: post
title: KeyVault Secrets with PowerShell
published: true 
categories: [ powershell, code ] 
hero: power
thumbnail: "/img/thumbnails/shell-420x255.jpg"
alttext: logs
---

Azure KeyVault is a mechanism for storing, retrieving and maintaining secured values in the cloud. The secure bit can be a challenging when working this out 
for the first time, particularly with some of the examples you can find out there. 

The kinds of use cases I am thinking about is storing the secrets in one location/context and then allowing them to be read from another location/context with the 
minimumn exchanged information. Perhaps setting up a VM that needs lots of settings, credentials etc. but passing them all around in a document or script would be 
onerous.  To me, this always means using a temporary account like a service principal which can be granted access then deleted after the work has been completed.


### Setup and Storage

First we need to create a service principal which requires us to be logged into Azure. New-AzADServicePrincipal returns an object that contains the application id (the 'user name' 
for this account) and the secret (the 'password'). You need to make sure you store these values for use later. The application id will be visible in the Azure portal but the 
secret will be lost forever if you don't capture it now. Note that the secret is a secure string so may need unsecuring if you want to be able to read it.

Once the service principal is created, we can check for and create a new key vault. If the keyvault has been created and since deleted, you will get an error here. With the 
key vault created, you can use Set-AzKeyVaultAccessPolicy to allow the service principal access to the key vault to read secrets.

The whole point of keyvault is to store secrets so once we've got this far, we should be storing our darkest, deepest secrets. 

AddSecretsToKeyVault.ps1
```powershell

{% include code/powershell/AddSecretsToKeyVault.ps1 %}

```

That completes the storage and setup of the secrets, now some time later, we want to be able to read them back. 

### Access and Reading 

Given some basic information, in our case, the tenant id (found in the Overview page of the AAD blade), the application id and secret you captured from the first part, 
and the name of the key vault, we can start retrieving secrets. 

In the context removed from the original setup where an automation script is running, we don't have a human logged in, so we connect to Azure using the service 
principal details from earlier but call the same cmdlet Connect-AzAccount and make sure to include the switch to tell it this account is a service principal. 

Each secret can then be read back, again as a secure string, given the name of the key vault and the name of the secret we setup originally. 

ReadSecretsFromKeyVault.ps1
```powershell

{% include code/powershell/ReadSecretsFromKeyVault.ps1 %}

```

