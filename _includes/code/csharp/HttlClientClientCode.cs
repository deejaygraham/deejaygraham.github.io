// using the default handler sends requests to 
// the interwebs...
HttpClient httpClient = new HttpClient();
var response = httpClient.GetAsync(url).Result;