---
permalink: 2021/03/09/purge-soft-deleted-keyvaults/
layout: post
title: Purge a Soft-deleted Azure Key Vault
published: true 
tags: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell

---

Constantly creating and recreating keyvaults and other resources in Azure, I occasionally run into a problem where I have got to the point where I need to completely delete a resource group (and 
all it's content) but some things linger in the background in Azure, even if they don't show up in the portal. One such case is a soft-deleted key vault. 

Testing for a key vault already existing with Get-AzKeyVault won't return an object for the soft-deleted key vault but trying to create a new one, after you've done this test might mean you get 
an error: "New-AzKeyVault : Exist soft deleted vault with the same name." 

The way to get rid of the "phantom" key vault is to login to Azure CLI, select the correct subscription, then run this command:

{% endhighlight %}

az keyvault list-deleted

{% endhighlight %}

This should bring back a list (surprisingly long in my case) of names, ids and properties for each keyvault that still exists in a "deleted" collection. Typically the properties will be the date 
that the keyvault was deleted, the location, and the date when it will be eventually purged. Find the name of the keyvault in that list 
then run this command:

{% endhighlight %}

az keyvault purge --name <keyvault-name-here>

{% endhighlight %}
