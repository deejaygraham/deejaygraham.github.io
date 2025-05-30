---
title: Loading Hashtables from CSV in Powershell
tags: [powershell]
hero: power
thumbnail: "/assets/img/thumbnails/parcel-420x255.png"

---

Yesterday I mentioned that we should probably keep "secrets" we want to use in a production web.config out
of the PowerShell script itself. Of course, this is good advice in any case so that you can version control
the script and keep the configuration values somewhere secure. If these configuration values are kept in a
CSV file like this...

```shell

Placeholder, Value
##MY_CREDENTIALS_USERNAME##, This is not my user name
##MY_CREDENTIALS_PASSWORD##, This might be my password

```

...then the PowerShell turns out to be a one-liner:

```powershell

$Replacements = (Import-Csv $PathToMyCsvFile) | Group-Object -AsHashTable -AsString -Property Placeholder

```
