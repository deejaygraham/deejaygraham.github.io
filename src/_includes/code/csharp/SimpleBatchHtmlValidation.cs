using HtmlAgilityPack;
using System;
using System.IO;
using System.Linq;

namespace HtmlAgilityTest
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length == 0)
                return;

            string directory = args[0];

            if (!Directory.Exists(directory))
            {
                Console.WriteLine("Directory does not exist");
                return;
            }

            foreach (string htmlFile in Directory.GetFiles(directory, "*.htm?"))
            {
                string logFile = Path.Combine(directory, Path.GetFileNameWithoutExtension(htmlFile) + ".txt");

                if (File.Exists(logFile))
                    File.Delete(logFile);

                HtmlDocument doc = new HtmlDocument()
                    {
                        OptionFixNestedTags = true
                    };

                doc.Load(htmlFile);

                if (doc.ParseErrors.Any())
                {
                    using (TextWriter writer = new StreamWriter(logFile, false))
                    {
                        foreach (var error in doc.ParseErrors)
                        {
                            writer.WriteLine(string.Format("{0},{1}: {2}", error.Line, error.LinePosition, error.Reason));
                        }
                    }
                }
            }
        }
    }
}