public class PageGenerator
{
	public bool SplitPages { get; set; }

	public PdfSharp.PageSize PageSize { get; set; }

	public PdfSharp.PageOrientation PageOrientation { get; set; }

	public int PageBorder { get; set; }

	public void GeneratePages(PdfDocument document, int pages, IEnumerable<IPageRenderer> renderers)
	{
		foreach(var renderer in renderers)
		{
			renderer.PageBorder = this.PageBorder;

			for (int page = 0; page < pages; ++page)
			{
				PdfPage newPage = document.AddPage();
				newPage.Size = this.PageSize;
				newPage.Orientation = this.PageOrientation;

				var areas = PrintableArea.FromPage(newPage, this.PageBorder, this.SplitPages);
				renderer.Render(newPage, areas);
			}
		}
	}
}

...


var renderers = new List<IPageRenderer>();
renderers.Add(new ManuscriptPaperRenderer(58, 6));
renderers.Add(new DottedPaperRenderer(15, 1));
renderers.Add(new LinedPaperRenderer(18));
renderers.Add(new GraphPaperRenderer(16));

PageGenerator pageGenerator = new PageGenerator
{
	PageBorder = pageBorder,
	PageOrientation = pageOrientation,
	PageSize = PdfSharp.PageSize.A4,
	SplitPages = splitPages
};

int pagesEach = 1;
pageGenerator.GeneratePages(document, pagesEach, renderers);

			
			


