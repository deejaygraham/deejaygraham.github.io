using System;
using System.Collections.Generic;
using System.IO;
using ICSharpCode.Decompiler;
using ICSharpCode.Decompiler.Ast;

class Program
{
	static void Main(string[] args)
	{
		if (args.Length == 0)
		{
			Console.WriteLine("No folder specified");
			return;
		}
		
		List<string> assemblies = new List<string>();
			
		string candidateFolder = args[0];

		if (Directory.Exists(candidateFolder))
		{ 
			foreach (string file in Directory.GetFiles(candidateFolder, "*.dll"))
			{
				assemblies.Add(file);
			}
		}
		else if (File.Exists(candidateFolder))
		{
			assemblies.Add(candidateFolder);
		}

		foreach (var assemblyFile in assemblies)
		{
			System.Reflection.Assembly assembly = System.Reflection.Assembly.ReflectionOnlyLoadFrom(assemblyFile);
			Mono.Cecil.AssemblyDefinition assemblyDefinition = Mono.Cecil.AssemblyDefinition.ReadAssembly(assemblyFile);
			AstBuilder astBuilder = null;

			foreach (var typeInAssembly in assemblyDefinition.MainModule.Types)
			{
				try
				{
					Console.WriteLine("T:{0}", typeInAssembly.Name);
					astBuilder = new AstBuilder(new ICSharpCode.Decompiler.DecompilerContext(assemblyDefinition.MainModule) 
					{ 
						CurrentType = typeInAssembly 
					});

					astBuilder.AddType(typeInAssembly);

					using (StringWriter output = new StringWriter())
					{
						astBuilder.GenerateCode(new PlainTextOutput(output));
						
						string result = output.ToString();
						string codeFile = typeInAssembly.Name.Replace("<", "").Replace(">", "") + ".cs";

						using (TextWriter writer = new StreamWriter(codeFile))
						{
							writer.Write(result);
						}
					}
				}
				catch (Exception ex)
				{
					Console.WriteLine(ex.ToString());
				}
			}

			Console.ReadLine();
		}
	}
}
