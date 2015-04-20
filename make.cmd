@echo off

SET MsBuildPath="%windir%\Microsoft.NET\Framework\v4.0.30319\MSBuild.exe"

:: Is this a 64 bit machine?
IF EXIST "%Programfiles(x86)%" SET MsBuildPath="%windir%\Microsoft.NET\Framework64\v4.0.30319\MSBuild.exe"

%MsBuildPath% /nologo BuildSite.msbuild

:: Now run server
jekyll serve --baseurl=/ 


