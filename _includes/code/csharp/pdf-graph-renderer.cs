public class GraphPaperRenderer : IPageRenderer
{
	private readonly int gridSize;

	public GraphPaperRenderer(int gridSize)
	{
		this.gridSize = gridSize;
	}

	public int PageBorder { get; set; }

	public void Render(PdfPage page, IEnumerable<PrintableArea> areas)
	{
		using (XGraphics gfx = XGraphics.FromPdfPage(page))
		{
			XPen pen = new XPen(XColors.LightGray, 0.0);

			foreach(PrintableArea area in areas)
			{
				for (int verticalLine = area.Left; verticalLine < area.Right; verticalLine += gridSize)
				{
					gfx.DrawLine(pen, verticalLine, area.Top, verticalLine, area.Bottom);
				}

				for (int horizontalLine = area.Top; horizontalLine < area.Bottom; horizontalLine += gridSize)
				{
					gfx.DrawLine(pen, area.Left, horizontalLine, area.Right, horizontalLine);
				}
			}
		}
	}
}
