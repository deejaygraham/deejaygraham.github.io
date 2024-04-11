class Program
{
    static void Main(string[] args)
    {
        if (args.Length == 0)
        {
            Console.WriteLine("post <title> <optional-date> <optional-tags>");
            return;
        }

        string title = args[0];

        string outputFolder = Directory.GetCurrentDirectory();

        string postSubFolder = Path.Combine(outputFolder, "_posts");

        if (Directory.Exists(postSubFolder))
            outputFolder = postSubFolder;

        string formattedDate = string.Empty;

        if (args.Length > 1)
        {
            formattedDate = args[1];
        }
        else
        {
            DateTime date = DateTime.Now;
            formattedDate = date.ToString("yyyy-MM-dd");
        }

        string suggestedTags = string.Empty;

        if (args.Length > 2)
        {
            suggestedTags = args[2];
        }

        string fileName = string.Format("{0}-{1}.markdown", formattedDate, title.Replace(" ", "-").ToLower());
        string path = Path.Combine(outputFolder, fileName);

        var utf8WithoutBom = new System.Text.UTF8Encoding(false);

        const bool AppendToFile = false;

        using (var writer = new StreamWriter(path, AppendToFile, utf8WithoutBom))
        {
            writer.WriteLine("---");
            writer.WriteLine("layout: post");
            writer.WriteLine("title: {0}", title);
            writer.WriteLine("published: true");
            writer.Write("tags: [ ");

            if (!String.IsNullOrEmpty(suggestedTags))
            {
                string[] tags = suggestedTags.Split(new char[] { ' ', ';' });
                writer.Write(String.Join(", ", tags));
            }

            writer.WriteLine(" ]");
            writer.WriteLine("---");
            writer.WriteLine();
            writer.WriteLine(title + " - post goes here");
            writer.WriteLine();
        }
    }
}