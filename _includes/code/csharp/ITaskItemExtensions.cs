using System;
using System.IO;
using System.Text;
using Microsoft.Build.Framework;
using Microsoft.Build.Utilities;

public static class ITaskItemExtensions
{
	public static void EnsureFolderExists(this ITaskItem folder)
	{
		if (folder == null)
			return;

		string path = folder.GetFullPath();

		if (!Directory.Exists(path))
		{
			throw new DirectoryNotFoundException(string.Format("Folder \'{0}\' does not exist.", path));
		}
	}

	public static void EnsureFileExists(this ITaskItem file)
	{
		if (file == null)
			return;

		string path = file.GetFullPath();

		if (!File.Exists(path))
		{
			throw new FileNotFoundException(string.Format("File \'{0}\' does not exist.", path));
		}
	}

	public static string GetFullPath(this ITaskItem item)
	{
		if (item == null)
			return string.Empty;

		return item.GetMetadata("FullPath");
	}
}
