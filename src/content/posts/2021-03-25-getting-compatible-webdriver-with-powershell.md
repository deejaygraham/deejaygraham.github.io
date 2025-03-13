---
title: Getting the right Selenium driver
tags: [powershell, code]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: logs
---

One of the challenges of running Selenium against a web application is the dependency on an external application which provides the interface
to the specific browser we are targetting in the test. Not only does the application, the web driver, need to exist locally, it needs to be
compatible with the current version of the browser. In the case of the Chrome browser, it updates automatically in the background so that it can
be difficult to keep the driver up to date inline with the browser. This can be particularly challenging when the tests are run from an automated
context like a build machine or an environment like Azure Dev Test Labs.

### Driver

There is also the issue that the main Chrome browser is maintained by a billion Google engineers and released on a regular basis whereas the
driver is handled by a much smaller team and out of step with the main browser. From the drivers website, they offer support for several major
versions of the browser with updates coming out "unpredictably", especially if you aren't monitoring the site regularly.

Trying to run an out of date driver against a newly updated version of the browser usually results in an error message and a failure of the whole
test run, forcing someone to go and hunt out the new driver, download it and save it in the correct place.

### Code

To help make this task of keeping both in sync a bit easier, I came up with the following cmdlet which could be run each time before the tests are run.

Get-CompatibleChromeDriver.ps1
```powershell

{% include 'code/powershell/GetCompatibleChromeDriver.ps1' %}

```

### Parameters

The parameters aren't mandatory because they are really just there to cope with the fact that urls and names may change in the future.
The download uri, the name of the zip file and the application executable are all out of our control so I thought it sensible to make these parameters.
The final param is the location for the webdriver to run from, which might need to be specific so that it can be figured into the test code configuration.

### Versions

To get the current version of the browser, we look in the registry to see where chrome is installed, then load the application binary from that path and
query the product version directly. This is usually in the form "major.minor.build.revision" as 4 dot-delimited integers. The chrome driver really only cares
about compatibility with the major version so that's the only number from the version we really care about. Assuming the browser is already up to date,
there's a really useful feature on the driver website where the team maintain a set of LATEST_RELEASE_X files stored by major version number.

For example, for version 89 of the browser there is a LATEST_RELEASE_89 file on the website. Each file contains the exact build of the driver we
want to download to be guaranteed a match against the browser major version. Once we have read this specific version, we can go for the correct version of the
zip file (I am using Windows in this instance) and download it locally.

Lastly, we need it to unzip the file to make sure it is available for the tests to run.
