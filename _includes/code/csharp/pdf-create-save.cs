using PdfSharp.Drawing;
using PdfSharp.Pdf;

...

PdfDocument document = new PdfDocument
{
	PageLayout = PdfPageLayout.SinglePage,
	PageMode = PdfPageMode.UseNone
};

document.Save(filename);
