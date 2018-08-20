using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.Hosting;
using Microsoft.Owin.StaticFiles;
using Owin;
using System;

#if DEBUG
[assembly: OwinStartup(typeof(OwinTestApp.DebugStartup))]
#else
[assembly: OwinStartup(typeof(OwinTestApp.ProductionStartup))]
#endif

namespace OwinTestApp
{
	class Program
	{
		static void Main(string[] args)
		{
			string url = (args.Length > 0) ? args[0] : "http://localhost:12345";

			using (WebApp.Start(url))
			{
				Console.WriteLine("Server listening at : " + url + ". Press a key to stop.");
				Console.ReadKey();
			}
		}
	}

	public class DebugStartup
	{
		public void Configuration(IAppBuilder app)
		{
			app.UseErrorPage();
			app.UseWelcomePage("/");
		}
	}

	public class ProductionStartup
	{
		public void Configuration(IAppBuilder app)
		{
			var options = new FileServerOptions
			{
				EnableDirectoryBrowsing = true,
				FileSystem = new PhysicalFileSystem(".")
			};

			app.UseFileServer(options);
		}
	}

}