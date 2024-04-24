---
permalink: 2022/05/03/windows-auth-http-client/
layout: post
title: HttpClient with Windows Auth
published: true
tags: [code, csharp]
thumbnail: /img/posts/windows-auth-http-client/thumbnail-420x255.jpg
alttext: screenshot
---

Working with WebAPI in .net, I was writing some client-focussed tests that meant I was unable/unwilling to use the standard
testing tool we all know and love - Postman - and instead needed to run NUnit against the API all on the local dev machine.

Because it was all on the one machine, I had an authenticaton scheme setup in IIS so that local windows users could connect
without having to use access tokens etc. This was for development only and I was focussed on the API behaviour rather than on
the security of the API, that would be swapped back in later for the "real" build.

That still left the issue of authenticating as the current user without getting a 401 and without having to hard code user
credentials in the code or in a config file. Happily HttpClient allows for this using the Handler chaining mechanism.

```csharp

class LocalAPIClient
{
private readonly HttpClient \_client;

    public LocalAPIClient()
    {
        var handler = new HttpClientHandler
        {
            Credentials = CredentialCache.DefaultNetworkCredentials,
            PreAuthenticate = true
        };

        _client = new HttpClient(handler);
        string url = System.Configuration.ConfigurationManager.AppSettings["Url"];
        _client.BaseAddress = new Uri(url);
    }

    public void DoTheThing()
    {
        string body = "this is the json payload";
        StringContent content = new StringContent(body, Encoding.UTF8, "application/json");
        HttpResponseMessage response = _client.PostAsync("Do/The/Thing", content).Result;

        string json = response.Content.ReadAsStringAsync().Result;

        // stuff
    }

}

```

Setting credentials on a HttpClientHandler using the default network credential means that it all just magically works.
