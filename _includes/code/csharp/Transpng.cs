using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace transpng
{
	class Program
	{
		static int Main(string[] args)
		{
			if (args.Length == 0)
			{
				System.Console.WriteLine("transpng <filename>");
				return 1;
			}

			string filename = args[0];

			if (!File.Exists(filename))
			{
				System.Console.WriteLine("File \'{0}\' does not exist", filename);
				return 1;
			}

			using (Image fromFile = Image.FromFile(filename))
			{
				using (Bitmap bitmap = new Bitmap(fromFile))
				{
					bitmap.MakeTransparent(Color.White);

					string newName = Path.Combine(Path.GetDirectoryName(filename), 
							Path.GetFileNameWithoutExtension(filename) + "_transparent" + Path.GetExtension(filename));

					if (File.Exists(newName))
						File.Delete(newName);

					bitmap.Save(newName, ImageFormat.Png);
				}
			}

			return 0;
		}
	}
}