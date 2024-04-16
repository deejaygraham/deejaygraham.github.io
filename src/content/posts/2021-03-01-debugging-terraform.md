---
permalink: 2021/03/01/debugging-terraform/
layout: post
title: Debugging Terraform
published: true 
categories: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell

---

<a href="https://www.terraform.io">Terraform</a> is a wonderful tool and I'm using it at the moment to build some WVD instances in Azure. 

As good as the tool is, I found I was wasting a lot of time trying to work out why parameters to a PowerShell script weren't correct just by looking at error messages in the console. Then I discovered 
that Terraform has a set of logging levels that can be turned on and adjusted through environment variables. 

The latest version of the tool says that TRACE is the only level that is well supported but I found that DEBUG worked fine for my purposes. Before running the terraform cli, set these two 
options: the debug level and the path. 

```powershell

$env:TF_LOG="TRACE"
$env:TF_LOG_PATH="terraform.txt"

```

This creates a terraform log and fills it with all sorts of useful information. You can see the versions of the plugins loaded by terraform init, which http calls are made to services, and crucially 
arguments passed that are built from explicit vars or queried variables where typos or bad logic may have introduced a bug in the data. 


Below is an extract from the beginning of one of those logs.

```
2021/03/09 13:08:50 [INFO] Terraform version: 0.14.7  
2021/03/09 13:08:50 [INFO] Go runtime version: go1.15.6
2021/03/09 13:08:50 [INFO] CLI args: []string{"C:\\Program Files\\Terraform\\terraform.exe", "init"}
2021/03/09 13:08:50 [DEBUG] Attempting to open CLI config file: C:\Users\myuser\AppData\Roaming\terraform.rc
2021/03/09 13:08:50 [DEBUG] File doesn't exist, but doesn't need to. Ignoring.
2021/03/09 13:08:50 [DEBUG] ignoring non-existing provider search directory terraform.d/plugins
2021/03/09 13:08:50 [INFO] CLI command args: []string{"init"}
2021/03/09 13:08:50 [TRACE] Meta.Backend: no config given or present on disk, so returning nil config
2021/03/09 13:08:50 [TRACE] Meta.Backend: backend has not previously been initialized in this working directory
2021/03/09 13:08:50 [DEBUG] New state was assigned lineage "6ea4f113-27c6-f828-637e-dd3773921d54"
2021/03/09 13:08:50 [TRACE] Meta.Backend: using default local state only (no backend configuration, and no existing initialized backend)
2021/03/09 13:08:50 [TRACE] Meta.Backend: instantiated backend of type <nil>
2021/03/09 13:08:50 [DEBUG] checking for provisioner in "."
2021/03/09 13:08:50 [DEBUG] checking for provisioner in "C:\\Program Files\\Terraform"
2021/03/09 13:08:50 [INFO] Failed to read plugin lock file .terraform\plugins\windows_amd64\lock.json: open .terraform\plugins\windows_amd64\lock.json: The system cannot find the path specified.
2021/03/09 13:08:50 [TRACE] Meta.Backend: backend <nil> does not support operations, so wrapping it in a local backend
2021/03/09 13:08:50 [TRACE] backend/local: state manager for workspace "default" will:
 - read initial snapshot from terraform.tfstate
 - write new snapshots to terraform.tfstate
 - create any backup at terraform.tfstate.backup
2021/03/09 13:08:50 [TRACE] statemgr.Filesystem: reading initial snapshot from terraform.tfstate
2021/03/09 13:08:50 [TRACE] statemgr.Filesystem: snapshot file has nil snapshot, but that's okay
2021/03/09 13:08:50 [TRACE] statemgr.Filesystem: read nil snapshot
2021/03/09 13:08:50 [DEBUG] Service discovery for registry.terraform.io at https://registry.terraform.io/.well-known/terraform.json
2021/03/09 13:08:50 [TRACE] HTTP client GET request to https://registry.terraform.io/.well-known/terraform.json
```

Terraform has a great <a href="https://learn.hashicorp.com/collections/terraform/azure-get-started">introduction to using it with Azure</a>.
