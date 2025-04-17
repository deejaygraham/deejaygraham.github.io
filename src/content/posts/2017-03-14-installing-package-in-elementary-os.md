---
title: Installing .deb Packages in Elementary OS
tags: [linux, elementary-os]
---

I've been getting more and more frustrated with Windows 10 marketing features to me during
normal running of the system ("Hi, it looks like you don't have Office installed, would
you like to buy Office ?"), to the point where I'm now considering junking the family
laptop's Windows 10 install and replacing it with a sensible linux distro
like <a href="https://elementary.io">elementary</a>. Elementary seems to be a nice
compromise between Windows and Mac UI without all the annoyances of W10.

As part of the tests to make sure it would work in our case, a critical piece is
installing software missing from the base distro. Handily, I've started to investigate other
web browsers, again based on frustration with the performance of Firefox on Windows.
One I came across that I really like because it has ad blocking and <a href="https://www.eff.org/https-everywhere">Http Everywhere</a>
built-in, is a browser called <a href="https://brave.com">Brave</a>.

So, how easy is it to install a new web browser in Elementary?

First port of call is the web page to download the package.

![brave]\(/assets/img/posts/installing-package-in-elementary-os/brave-website.png)

Once the download is complete, I had expected to have an import or discovery
option from the app center:

![app center]\(/assets/img/posts/installing-package-in-elementary-os/app-centre.png)

No? Ok, how about cracking open the terminal and the often popular <code>apt-get</code>:

```shell

sudo apt-get install brave_0.13.5_amd64.deb

```

![apt-get]\(/assets/img/posts/installing-package-in-elementary-os/elementary_start_sudo-apt-get.png)

No? Because it's a Debian package we have to use <code>gdebi</code>:

```shell

sudo gdebi brave_0.13.5_amd64.deb

```

![gdebi]\(/assets/img/posts/installing-package-in-elementary-os/elementary-sudo-gdebi.png)

..and voila!

![app center2]\(/assets/img/posts/installing-package-in-elementary-os/brave-installed.png)
