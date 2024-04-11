public class LinedPaperRenderer : IPageRenderer
{
	private readonly int lineSpacing;

	public LinedPaperRenderer(int lineSpacing)
	{
		this.lineSpacing = lineSpacing;
	}

	public int PageBorder { get; set; }

	public void Render(PdfPage page, IEnumerable<PrintableArea> areas)
	{
		using (XGraphics gfx = XGraphics.FromPdfPage(page))
		{
			XPen pen = new XPen(XColors.LightGray, 0.0);

			foreach (PrintableArea area in areas)
			{
				for (int horizontalLine = area.Top; horizontalLine < area.Bottom; horizontalLine += this.lineSpacing)
				{
					gfx.DrawLine(pen, area.Left, horizontalLine, area.Right, horizontalLine);
				}
			}
		}
	}
}
