---
layout: post
title: Cleaning MsBuild ItemGroup Includes
published: true
tags: [ msbuild, snippets ]
---

Here's a neat solution (that I totally stole from [Sayed Ibrahim Hashimi](http://sedodream.com/) ) 
to a problem that I sometimes run into when writing longer or multi-file 
msbuild scripts.

If you create an ItemGroup in your script:

	<ItemGroup>
		<MyFiles Include="a.cs" />
		<MyFiles Include="b.cs" />
		<MyFiles Include="c.cs" />
	</ItemGroup>
	
You can then use the @(MyFiles) syntax to process each of the files. Probably 
your expectation is that the MyFiles collection only includes a, b and c. 

Now, if you accidently recycle the name "MyFiles", say by:

* Adding adding a new ItemGroup explicitly
* Changing Target dependencies change the order of execution
* Changing Target dependencies change the number of targets that are executed
* You include a new script with a matching ItemGroup

you include you can run into trouble. You may no longer have a fresh list 
with just the items you *think* you have. 

This example:

	<!-- Global group -->
	<ItemGroup>
		<MyFiles Include="a.cs" />
		<MyFiles Include="b.cs" />
		<MyFiles Include="c.cs" />
	</ItemGroup>

	<!-- 
		Lots of other lines of script in between, 
		DoStuff may even be in an Imported file
	-->
	
	<Target Name="DoStuff">
	
		<!-- Local group -->
		<ItemGroup>
			<MyFiles Include="d.cs" />
			<MyFiles Include="e.cs" />
			<MyFiles Include="f.cs" />
		</ItemGroup>

		<Message Text="@(MyFiles)" />
		
	</Target>

will print a.cs b.cs ... f.cs where you might be expecting only d.cs e.cs f.cs.

[Sayed Ibrahim Hashimi](http://sedodream.com/) uses a technique where the 
first line of the ItemGroup empties the current content (if any) then builds 
the list required. 

	<ItemGroup>
		<MyFiles Remove="@(MyFiles)" />
		<MyFiles Include="d.cs" />
		<MyFiles Include="e.cs" />
		<MyFiles Include="f.cs" />
	</ItemGroup>

Using this convention means you are always guaranteed 
the content of the list will be what you intended.
