---
layout: post
title: Updating web.config Settings with MsBuild
published: true
tags: [ msbuild ]
---

I've slightly stolen this technique from [Sayed I. Hashimi](https://twitter.com/sayedihashimi) and 
[this blog post](http://sedodream.com/2011/12/29/UpdatingXMLFilesWithMSBuild.aspx).

Changing web.config settings between environments can be a chore which is mostly 
relieved by creating different versions specific to each environment and letting 
the process take care of replacing values at build time. Typically we have a 
web.Debug.config and a web.Release.config, each associated with a build 
configuration. 

Usually, local developer builds also need some personalisation of these settings 
to reference their own environment (paths, keys, database connections) but 
usually not the kind of thing you want committing to source control.

Here I've used the XmlPoke task to find the correct part of the web.config 
(or any app.config for that matter) and change the value of a setting.

So for a .config file containing this:

	<?xml version="1.0" encoding="utf-8"?>
	<configuration>
	
		<!-- stuff -->

		<appSettings>
			<add key="hello" value="world" />
			<add key="mynameis" value="bob" />
		</appSettings>
		
		<!-- other stuff -->
		
	</configuration>
 
We can use MsBuild's batching feature to create a list of settings that can be 
changed in a single file.

	<Target Name="ChangeConfigSettings">
	
		<PropertyGroup>
			<MyConfig>$(PathToFolder)web.config</MyConfig>
		</PropertyGroup>
		
		<ItemGroup>
			<XmlConfigChange Include="ThisDoesntMatter">
				<XPath>//add[@key='hello']/@value</XPath> 
				<NewValue>again</NewValue>
			</XmlConfigChange>
			<XmlConfigChange Include="NorDoesThis">
				<XPath>//add[@key='mynameis']/@value</XPath> 
				<NewValue>alice</NewValue>
			</XmlConfigChange>
		</ItemGroup>
		
		<XmlPoke XmlInputPath="$(MyConfig)"
	             Query="%(XmlConfigChange.XPath)"
	             Value="%(XmlConfigChange.NewValue)" />
	</Target>

Here we're using metadata on each ItemGroup to keep a pair of variables together 
for each replacement, the xpath query to the setting and the value to substitute.
Each XmlConfigChange object is evaluated against $(MyConfig) in turn and updates 
the config using the new value. So, after the script runs we should have:

	<?xml version="1.0" encoding="utf-8"?>
	<configuration>
	
		<appSettings>
			<add key="hello" value="again" />
			<add key="mynameis" value="alice" />
		</appSettings>
		
	</configuration>


