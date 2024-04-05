---
layout: post
title: Search and Replace in Powershell
published: true 
categories: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/parcel-420x255.webp"
alttext: powershell
---

In scenarios where we keep configuration information in app.config or web.config files (or .cscfg's even), 
there is often a need to replace non-secret dev settings for local machines with settings referencing 
protected resources, for example, production database credentials.

This little script is aimed at a quick and dirty solution to that problem, replacing the placeholder 
keys in the hash with the "production" values. Of course, for a production system the actual settings 
could be imported from a file as a command line param rather than being hard-coded.    

```powershell

{ % include code/powershell/Replace-ConfigSecrets.ps1 %}

```
