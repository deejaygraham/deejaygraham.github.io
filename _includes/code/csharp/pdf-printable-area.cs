public class PrintableArea
{
	public int Left { get; set; }
	public int Right { get; set; }
	public int Top { get; set; }
	public int Bottom { get; set; }

	public static IEnumerable<PrintableArea> FromPage(PdfPage page, int border, bool split)
	{
		var areas = new List<PrintableArea>();

		if (split)
		{
			PrintableArea pane1 = new PrintableArea
			{
				Left = border,
				Right = ((int)page.Width / 2) - border,
				Top = border,
				Bottom = (int)page.Height - border
			};

			PrintableArea pane2 = new PrintableArea
			{
				Left = pane1.Right + (2 * border),
				Right = (int)page.Width - border,
				Top = border,
				Bottom = (int)page.Height - border
			};

			areas.Add(pane1);
			areas.Add(pane2);
		}
		else
		{
			PrintableArea single = new PrintableArea
			{
				Left = border,
				Right = (int)page.Width - border,
				Top = border,
				Bottom = (int)page.Height - border
			};

			areas.Add(single);
		}

		return areas;
	}
}
