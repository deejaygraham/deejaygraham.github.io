@echo off

rem Assume x86 to start with
SET MsBuildPath="%windir%\Microsoft.NET\Framework\v4.0.30319\MSBuild.exe"

rem Is this a 64 bit machine?
IF EXIST "%Programfiles(x86)%" SET MsBuildPath="%windir%\Microsoft.NET\Framework64\v4.0.30319\MSBuild.exe"

if "%1" == "" goto DefaultTarget
goto SpecificTarget

:DefaultTarget
%MsBuildPath% Test.proj /verbosity:detailed
goto End

:SpecificTarget
%MsBuildPath% Test.proj /t:%* 

:End
