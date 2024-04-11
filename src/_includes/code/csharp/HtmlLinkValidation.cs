class Program
{
	static int Main(string[] args)
	{
		if (args.Length == 0)
			return - 1;

		string folder = args[0];

		if (!Directory.Exists(folder))
		{
			Console.WriteLine("Folder does not exist");
			return -1;
		}

		HtmlFileFinder fileFinder = new HtmlFileFinder();

		var htmlList = fileFinder.Find(folder);

		List<string> errors = new List<string>();

		AnchorFinder linkFinder = new AnchorFinder();

		// mail address - ignore
		linkFinder.Ignore("mailto");
		linkFinder.Ignore("file://");

		linkFinder.LinkFound += (obj, e) =>
		{
			string link = e.Link;

			if (link.StartsWith("#"))
			{
				// internal link...
				var allInternalIds = e.Document.DocumentNode.SelectNodes("*[@id]");

				if (allInternalIds != null)
				{
					// find the link...
					var idItem = allInternalIds.FindFirst(link.Substring(1));

					if (idItem == null)
					{
						errors.Add("No internal link");
					}
				}
			}
			else
			{
				if (link.Contains("#"))
				{
					// internal link to an internal id in another document
					// not handled yet.
				}
				else
				{
					if (link.StartsWith("http") || link.StartsWith("//"))
					{
						// absolute path...
						// ping it?
					}
					else
					{
						// local path
						try
						{
							string thisFilesFolder = Path.GetDirectoryName(e.FilePath) + "\\";
							Uri baseFolder = new Uri(thisFilesFolder);
							Uri u = new Uri(baseFolder, link);
							string fullPath = u.LocalPath.Replace("%20", " ");

							if (!File.Exists(fullPath))
							{
								errors.Add(String.Format("{0}({1},{2}): Link to \"{3}\" does not exist", e.FilePath, e.Line, e.Column, link));
							}
						}
						catch
						{
							// nothing...
						}
					}
				}
			}
		};

		linkFinder.Find(htmlList);

		foreach (string error in errors)
		{
			Console.WriteLine(error);
		}

		Console.WriteLine("\r\nSummary");
		Console.WriteLine("===================================");
		Console.WriteLine("{0} errors detected.", errors.Count);
		Console.ReadLine();

		return 0;
	}
}