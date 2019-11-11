# Either directly from env:
$env:Greeting

# or using GCI

(Get-ChildItem -Path env:* -Include 'Greeting').Value