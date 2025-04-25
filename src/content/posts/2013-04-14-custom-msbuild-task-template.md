---
title: Custom MsBuild Task Template
tags: [msbuild, code, csharp]
---

Creating customs tasks for MsBuild is relatively easy provided you follow a few steps.

The example below assumes you are familiar with .Net - specifically C# in this case - and
Visual Studio:

## Create a new class library project

![New Project](/assets/img/posts/custom-msbuild-task-template/vs-new-project.png)

## Add references to MsBuild

```csharp
Microsoft.Build.Framework
Microsoft.Build.Tasks.v4.0
Microsoft.Build.Utilities.v4.0
```

## Add a new class derived from Task

Add required input properties and override the Execute method

```csharp
using Microsoft.Build.Framework;
using Microsoft.Build.Utilities;

public class MyTask : Task
{
    [Required]
    public ITaskItem[] Files { get; set; }

    [Required]
    public ITaskItem OutputFolder { get; set; }

    public override bool Execute()
    {
        var files = new List<string>();

        if (this.Files.Length > 0)
        {
            for (int i = 0; i < this.Files.Length; ++i)
            {
                ITaskItem item = this.Files[i];
                string path = item.GetMetadata("FullPath");

                if (File.Exists(path))
                {
                    files.Add(path);
                }
            }
        }

        if (!files.Any())
        {
            Log.LogWarning("No files found to transform");
        }

        string outputFolder = string.Empty;

        if (this.OutputFolder != null)
        {
            outputFolder = this.OutputFolder.GetMetadata("FullPath");
        }

        if (!string.IsNullOrEmpty(outputFolder))
        {
            if (!Directory.Exists(outputFolder))
            {
                Log.LogMessage("Creating folder: \"{0}\"", outputFolder);
                Directory.CreateDirectory(outputFolder);
            }
        }

        // other useful stuff...

        return true;
    }
}
```

## Use it in your scripts

```xml
<!-- Change this path to point to installed dll -->
<UsingTask AssemblyFile="$(MSBuildProjectDirectory)MyTasks.dll" TaskName="MyTask"/>

<Target Name="Example">

    <!-- Change parameters to reflect your project -->
    <MyTask
        Files="@(ProcessFiles)"
        Folder="$(OutputFolder)"
        />
</Target>
```
