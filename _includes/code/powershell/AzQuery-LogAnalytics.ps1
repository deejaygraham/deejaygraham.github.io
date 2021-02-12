# Make sure you are authenticated with 
# Connect-AzAccount


[string]$WorkspaceID = 'guid from analytics blade in portal.azure.com'

$Query = @'

search "Hello World"
| order by TimeGenerated desc
| project RenderedDescription 

'@

$Results = Invoke-AzOperationalInsightsQuery -WorkspaceId $WorkspaceID -Query $Query

$Results.Results | Export-Csv -Path "HelloWorldInTheLogs.csv"
