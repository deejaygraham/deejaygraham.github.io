---
permalink: 2014/05/20/self-hosted-webserver-using-owin/
layout: post
title: Self Hosted WebServer using OWIN

tags: [csharp, code]
---

I've been playing about with [OWIN](http://owin.org/) and [Katana](http://msdn.microsoft.com/en-us/magazine/dn451439.aspx)
recently and was pleasantly surprised with [how easy it was](http://www.asp.net/aspnet/overview/owin-and-katana/an-overview-of-project-katana)
to get up and running serving static files from a [console application](http://www.asp.net/aspnet/overview/owin-and-katana/getting-started-with-owin-and-katana).

- Create a new console project.
- Install two packages:
  - install-package Microsoft.Owin.StaticFiles
  - install-package Microsoft.Owin.SelfHost
- Create a startup object.
- Start a WebApp with a root url.
- Run the application.
- Profit!

![console](/img/posts/self-hosted-webserver-using-owin/console.webp)

```csharp

{% include 'code/csharp/OwinServer.cs' %}

```

The example above shows a method of using different _OwinStartup_ attributes
to identify which startup object to use.

The DebugStartup class uses the default smiley welcome page:

![welcome](/img/posts/self-hosted-webserver-using-owin/index-welcome.webp)

and the ProductionStartup class uses a simple file system configuration to
serve static files from the root folder. Turning on _EnableDirectoryBrowsing_
shows the binaries in the build folder.

![listing](/img/posts/self-hosted-webserver-using-owin/index-browse-folder.webp)

For home projects, the [Nancy](http://nancyfx.org/) web framework was my
favourite for building .Net web applications (hosted on IIS or self-hosted)
but now I'm torn between using the self-hosting or Helios-hosted version of
OWIN. More experiments are needed.
