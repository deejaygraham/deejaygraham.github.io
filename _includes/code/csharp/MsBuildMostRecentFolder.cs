using System;
using System.IO;
using Microsoft.Build.Framework;
using Microsoft.Build.Utilities;

namespace MostRecentFolder
{
/*
	<Project DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003" ToolsVersion="4.0">

		<UsingTask TaskName="MostRecentFolder" AssemblyFile="MostRecentFolder.dll" />

		<Target Name="Build" >

			<PropertyGroup>
				<MyFolder>C:\ListOfFolders</MyFolder>
			</PropertyGroup>
	
			<MostRecentFolder ParentFolder="$(MyFolder)" >
				<Output ItemName="NewestFolder" TaskParameter="MostRecentSubFolder" />	
			</MostRecentFolder>
	
			<Message Text="Newest is @(NewestFolder)" Importance="High" />

		</Target>

	</Project>
*/
	public class MostRecentFolder : Task
	{
		[Required]
		public ITaskItem ParentFolder { get; set; }

		[Output]
		public ITaskItem MostRecentSubFolder { get; private set; }

		public override bool Execute()
		{
			string path = this.ParentFolder.GetMetadata("Fullpath");

			if (!Directory.Exists(path))
			{
				this.Log.LogError("Path does not exist " + path);
				return false;
			}

			DateTime mostRecent = DateTime.MinValue;
			string mostRecentPath = string.Empty;

			foreach (string folder in Directory.GetDirectories(path))
			{
				DirectoryInfo info = new DirectoryInfo(folder);

				if (info.LastWriteTime > mostRecent)
				{
					mostRecentPath = folder;
					mostRecent = info.LastWriteTime;
				}
			}

			if (string.IsNullOrEmpty(mostRecentPath))
			{
				this.Log.LogError("No subfolders found");
				return false;
			}

			this.MostRecentSubFolder = new TaskItem(mostRecentPath);

			return true;
		}
	}
}
