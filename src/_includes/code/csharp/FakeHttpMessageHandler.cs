// using fake handler keeps messages in your tests.
public class FakeHttpMessageHandler : HttpMessageHandler
{
	public FakeHttpMessageHandler()
	{
		this.Response = new HttpResponseMessage
		{
			StatusCode = System.Net.HttpStatusCode.OK
		};
	}

	public HttpResponseMessage Response { get; set; }

	protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
	{
		return Task<HttpResponseMessage>.Factory.StartNew(() =>
		{
			return this.Response;
		});
	}
}