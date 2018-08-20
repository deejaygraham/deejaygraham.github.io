// simulate a 404 response
var handler = new FakeHttpMessageHandler();
handler.Response.StatusCode = System.Net.HttpStatusCode.NotFound;
handler.Response.ReasonPhrase = "Sorry old bean, this url is missing";

HttpClient httpClient = new HttpClient(handler);
var response = httpClient.GetAsync(url).Result;