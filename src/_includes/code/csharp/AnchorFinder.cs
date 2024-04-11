public class AnchorFinder
{
	private List<string> ignoredPrefixes = new List<string>();

	public event EventHandler<HyperLinkEventArgs> LinkFound;

	public void Ignore(string prefix)
	{
		this.ignoredPrefixes.Add(prefix);
	}

	public void Find(IEnumerable<string> documents)
	{
		foreach (string document in documents)
		{
			try
			{
				HtmlDocument html = new HtmlDocument();
				html.Load(document);

				if (html.DocumentNode == null)
					continue;

				var allLinks = html.DocumentNode.SelectNodes("//a[@href]");

				if (allLinks == null)
					continue;

				foreach (HtmlNode link in allLinks)
				{
					HtmlAttribute href = link.Attributes["href"];

					if (href != null && !String.IsNullOrEmpty(href.Value) && this.LinkFound != null)
					{
						if (!this.ignoredPrefixes.Any(x => href.Value.StartsWith(x)))
						{
							var handler = this.LinkFound;

							handler(this, new HyperLinkEventArgs
							{
								Document = html,
								FilePath = document,
								Link = href.Value,
								Line = href.Line,
								Column = href.LinePosition
							});
						}
					}
				}
			}
			catch (Exception)
			{
				// continue
			}
		}
	}
}