---
title: Determining when your Azure session has expired
tags: [powershell, cloud]
thumbnail: "/img/thumbnails/parcel-420x255.webp"

---

Logging into Azure from PowerShell usually gets down with the <code>Add-AzureAccount</code>
cmdlet. This pops up a UI form asking for your user name (maybe the account type) and password. Once
this completes, you have a token which is good for 24 hours. If you run another Azure targeted
script within that time period you don't need to prompt to login again because the token is
still valid but if you do you can at least be assured that your script will always have a good
credential no matter how annoying that might be for the user of your script. Prompting every
10 minutes for login can be really tiresome.

On the other hand, not prompting can lead to an error message telling you your session has
expired, if you try to execute a cmdlet like <code>Set-AzureSubscription</code>, and you should
have logged in before running the script.

There doesn't seem to be an officially documented way of determining when the session has
expired but I have found a way to do it with minimal code so I thought I would share it.

### Fallback

Using the cmdlet <code>Get-AzureSubscription</code> by itself doesn't do anything but
return the current (cached) set of subscriptions you have associated with your identity,
importantly, it doesn't give you an error if your session has expired. But calling
<code>Set-AzureSubscription</code> afterwards will give you the dreaded red error message.

If we combine <code>Get-AzureSubscription</code> with the ExtendedDetails switch and the
ErrorAction Stop, we instantly get an exception if the session is not valid and we are
then able to prompt for login as before.

```powershell

Try { 
    # Check current session to see if we are currently logged into Azure
    $Subscription = Get-AzureSubscription -ExtendedDetails -ErrorAction Stop
}
Catch { 
    # Exception probably means we need to login again.
    Add-AzureAccount
}

```
