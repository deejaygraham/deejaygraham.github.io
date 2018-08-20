public class HtmlFileFinder
{
	public IEnumerable<string> Find(string folder)
	{
		var htmlList = new List<string>();

		foreach (var html in Directory.EnumerateFiles(folder, "*.htm?", SearchOption.AllDirectories))
		{
			htmlList.Add(html);
		}

		return htmlList;
	}
}