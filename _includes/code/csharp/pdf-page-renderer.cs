public interface IPageRenderer
{
	int PageBorder { get; set; }

	void Render(PdfPage page, IEnumerable<PrintableArea> areas);
}
