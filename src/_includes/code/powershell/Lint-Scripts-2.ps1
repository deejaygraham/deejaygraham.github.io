Invoke-ScriptAnalyzer -Path $_.FullName -IncludeDefaultRules -OutVariable Failures -Setting LintSettings.psd1
