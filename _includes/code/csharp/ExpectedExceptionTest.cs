
[Test]
[ExpectedException(typeof(ArgumentNullException))]
public void Calling_Api_With_Null_Not_Allowed()
{
	// next line should cause an exception to be thrown.	
	MyApi.CallMethod(null);
	// expecting not to get here
}
