
// create a cloud blob client if one does not already exist or use the existing one
var container = CloudBlobClientFactory.Instance.GetContainerReference(containerName);

// use the container