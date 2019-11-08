internal static class CloudBlobClientFactory
{
    public static CloudBlobClient Instance
    {
        get
        {
            return instance.Value;
        }
    }

    private static Lazy<CloudBlobClient> instance = new Lazy<CloudBlobClient>(() =>
    {
        var credentials = new StorageCredentials("MyAccount", "This is not a secret key");

        return new CloudStorageAccount(credentials, false).CreateCloudBlobClient();
    });
}