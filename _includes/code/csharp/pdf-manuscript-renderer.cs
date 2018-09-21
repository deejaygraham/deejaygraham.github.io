public class ManuscriptPaperRenderer : IPageRenderer
{
	private readonly int staveSpacing;

	private readonly int lineSpacing;

	public ManuscriptPaperRenderer(int staveSpacing, int lineSpacing)
	{
		this.staveSpacing = staveSpacing;
		this.lineSpacing = lineSpacing;
	}

	public int PageBorder { get; set; }

	public void Render(PdfPage page, IEnumerable<PrintableArea> areas)
	{
		using (XGraphics gfx = XGraphics.FromPdfPage(page))
		{
			XPen pen = new XPen(XColors.Black, 0.0);

			foreach (PrintableArea area in areas)
			{
				for (int horizontalLine = area.Top; horizontalLine < area.Bottom; horizontalLine += this.staveSpacing)
				{
					DrawStave(gfx, pen, horizontalLine, area.Left, area.Right, this.lineSpacing);
				}
			}
		}
	}

	private static void DrawStave(XGraphics graphics, XPen pen, int topLine, int start, int end, int lineSpacing)
	{
		int linesPerStave = 5;
		for (int horizontalLine = 0; horizontalLine < linesPerStave; horizontalLine++)
		{
			graphics.DrawLine(pen, start, topLine + (horizontalLine * lineSpacing), end, topLine + (horizontalLine * lineSpacing));
		}

		// draw end caps to lines
		graphics.DrawLine(pen, start, topLine, start, topLine + ((linesPerStave - 1) * lineSpacing));
		graphics.DrawLine(pen, end, topLine, end, topLine + ((linesPerStave - 1) * lineSpacing));
	}
}
