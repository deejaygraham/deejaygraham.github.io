---
title: Managing Skytap environments with PowerShell
tags: [powershell]
thumbnail: "/img/thumbnails/parcel-420x255.webp"

---

Our favourite virtual environment provider, <a href="http://skytap.com">skytap</a>, now
exposes it's REST api via a handy
<a href="https://github.com/skytap/Powershell_Module_for_Skytap">PowerShell module</a>. Other
bindings to other tools, for Puppet, Docker, Jenkins, Ansible etc.
<a href="http://help.skytap.com/developer-tools.html">are available</a>.

At the moment, the documentation isn't that great so here's how to get started spinning up
a new environment given the name of an existing template. Most of what I learned here was taken
from reading the module source and referring to the
<a href="http://help.skytap.com/API_v2_Documentation.html">v2 API documentation</a>.

## Import

Download and unpack the module as you would normally into Install into
<code>%UserProfile%\Documents\WindowsPowerShell\Modules\skytap</code>. Note, you can safely ignore
the user_token file, you can set authorization a number of different ways.

```

Import-Module skytap # -Verbose

```

## Authentication

Authentication is handled by the <code>Set-Authorization</code> cmdlet. You can either provide a path
to a user token file or provide explicit user name and api key (from your account page) or
user name and password.

```

[string]$Account = 'this is not my account name'
[string]$ApiKey = 'this is not my api key'

Set-Authorization -user $Account -pwd $ApiKey

```

## Brave New Environment

Now, we can create a new environment, a collection of virtual machines, from a named template
by first searching for the template we want, then creating the environment from that template.

```

[string] $TemplateName = 'My Windows 8.1 x64 Cluster'

$Template = Get-Templates | Where-Object { $_.name -eq $TemplateName }
$Environment = New-EnvironmentFromTemplate -templateId $Template.id

```

## Bizzy

Creating a new environment will usually kick it off in the busy state. This is surfaced
through the API as the _runstate_ property.

```

While ($Environment.runstate -Eq 'busy') {

    Start-Sleep -Seconds 30
    $Environment = Get-Environment -configId $Environment.id

}

```

## Starting

Now that you have a shiny new environment, the default state could be running, stopped, suspended
(and maybe others). Starting and stopping an environment is done using the <code>Update-RunState</code>
cmdlet.

```

If ($Environment.runstate -Eq 'stopped') {

    Update-RunState -configId $Environment.id -newstate 'running'

}

```

And again, we need to wait for the work to finish and everything to settle down into a non-busy
state. At the end of this, you should have a new environment and all the VMs within that
environment should be in the same, healthy state.
