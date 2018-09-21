public class DottedPaperRenderer : IPageRenderer
{
	private readonly int gridSize;

	private readonly int dotSize;

	public DottedPaperRenderer(int gridSize, int dotSize)
	{
		this.gridSize = gridSize;
		this.dotSize = dotSize;
	}

	public int PageBorder { get; set; }

	public void Render(PdfPage page, IEnumerable<PrintableArea> areas)
	{
		using (XGraphics gfx = XGraphics.FromPdfPage(page))
		{
			XPen pen = new XPen(XColors.LightGray, 0.0);

			foreach (PrintableArea area in areas)
			{
				for (int x = area.Left; x < area.Right; x += this.gridSize)
				{
					for (int y = area.Top; y < area.Bottom; y += this.gridSize)
					{
						gfx.DrawEllipse(pen, x, y, this.dotSize, this.dotSize);
					}
				}
			}
		}
	}
}
