---
layout: post
title: Verifying Azure Build Output
published: true 
tags: [ cloud, msbuild  ]
---

One of the differences one often finds between development and production environments, in Azure deployments, 
is being able to debug directly on an instance using RDP or having each instance locked down to make sure 
naughty developers or bad guys are not able to gain access arbitrarily. Turning on RDP for a built cloud package 
will conflict with a config file that explicitly forbids it, failing a deployment and forcing the package to be 
rebuilt, with maybe a few red faces and wasted time as a result.

Using an XPath query, you can check a built cloud package config to make sure it is as it is intended. Here I 
create a default setting for RemoteDesktopEnabled then invoke the *XmlPeek* task to check for a value. If 
the search fails, the default value makes the Error task pass. If it is in the config file and the value is 
set to true, a nice diagnostic messages breaks the build.

    
    <Target Name="VerifyCloudPackage" Condition=" '$(TargetProfile)' == 'Production' ">

		<ItemGroup>
			<!-- If build is correct we expect this setting to be absent from .cscfg so this default needs to set. -->
			<RemoteDesktopEnabled Include="false" />
		</ItemGroup>

		<PropertyGroup>
			<CloudConfigNamespace>&lt;Namespace Prefix='cs' Uri='http://schemas.microsoft.com/ServiceHosting/2008/10/ServiceConfiguration' Name='CsCfg' /&gt;</CloudConfigNamespace>
			<RemoteAccessQuery>/cs:ServiceConfiguration/cs:Role[@name='MyWebRole']/cs:ConfigurationSettings/cs:Setting[@name='Microsoft.WindowsAzure.Plugins.RemoteAccess.Enabled']/@value</RemoteAccessQuery>
		</PropertyGroup>

		<XmlPeek
			XmlInputPath="$(PublishDir)ServiceConfiguration.$(TargetProfile).cscfg"
			Namespaces="$(CloudConfigNamespace)"
			Query="$(RemoteAccessQuery)" >
			<Output TaskParameter="Result" ItemName="RemoteDesktopEnabled" />
		</XmlPeek>

		<Error
			Condition="@(RemoteDesktopEnabled)"
			Text="Package cannot be deployed to $(TargetProfile) with Remote Desktop set to @(RemoteDesktopEnabled)" />

	</Target>
        
           
The only slight complexity to watch out for in this solution is making sure that the namespace property matches the 
declaration at the top of the cscfg file and that the prefix is used in the XPath query itself. Failing to do this will 
mean that the search will fail even if the setting is actually there.
   