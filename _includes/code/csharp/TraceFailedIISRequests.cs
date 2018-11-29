using Microsoft.Web.Administration;

...

	using (ServerManager serverManager = new ServerManager())
	{
		Configuration config = serverManager.GetApplicationHostConfiguration();

		ConfigurationSection traceFailedRequestsSection = config.GetSection("system.webServer/tracing/traceFailedRequests");
		ConfigurationElementCollection traceFailedRequestsCollection = traceFailedRequestsSection.GetCollection();

		if (traceFailedRequestsCollection.Count == 0)
		{
			ConfigurationElement addElement = traceFailedRequestsCollection.CreateElement("add");
			addElement["path"] = @"*";

			ConfigurationElementCollection traceAreasCollection = addElement.GetCollection("traceAreas");
			ConfigurationElement addElement1 = traceAreasCollection.CreateElement("add");
			addElement1["provider"] = @"WWW Server";
			addElement1["areas"] = @"Rewrite";
			addElement1["verbosity"] = @"Verbose";
			traceAreasCollection.Add(addElement1);

			ConfigurationElement failureDefinitionsElement = addElement.GetChildElement("failureDefinitions");
			failureDefinitionsElement["statusCodes"] = @"200-399";
			traceFailedRequestsCollection.Add(addElement);

			serverManager.CommitChanges();
		}
	}
