
[Test]
public void Calling_Api_With_Null_Not_Allowed()
{
	Assert.That(() =>
	{
		MyApi.CallMethod(null);
	},
	Throws.Exception.TypeOf<ArgumentNullException>());
}
