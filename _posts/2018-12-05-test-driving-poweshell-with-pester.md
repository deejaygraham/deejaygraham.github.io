---
layout: post
title: Test Driving PowerShell with Pester
published: true 
categories: [ powershell ]
hero: power
---

Work in progress text and examples from an upcoming presentation. 

### Describe It and Should 

(quotes from Christmas Carol) It is a ponderous chain!

```powershell

Import-Module Pester

Describe 'Presenting in public' {
	
	$Emotion = 'Kacking It'
	
	It 'Emotion should be good' {
	
		$Emotion | Should Be 'Joy'
	}
}

```

Ok, that fails, let's fix the test to make it more representative of reality.


```powershell

Import-Module Pester

Describe 'Presenting in public' {
	
	$Emotion = 'Kacking It'
	
	It 'Emotion may not be good' {
	
		$Emotion | Should Not Be 'Joy'
	}
}

```


```powershell

Import-Module Pester

Describe 'Presenting in public' {
	
	$Emotion = "I'm Loathing It"
	
	It 'should be like Macdonalds' {
	
		$Emotion | Should BeLike "I'm Lo*ing It"
	}
}

```

### Refactoring 

We can have multiple describe blocks or collapse into one describe with multiple context blocks


```powershell

Import-Module Pester

Set-StrictMode -Version Latest

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Describe 'My Blog' {

    It 'Serves pages over http' {
        Invoke-WebRequest -Uri 'http://deejaygraham.github.io/' | Select -ExpandProperty StatusCode | Should Be 200
    }

    It 'Serves pages over https' {
        Invoke-WebRequest -Uri 'https://deejaygraham.github.io/' | Select -ExpandProperty StatusCode | Should Be 200
    }
}


$ImportantLinks = @(
    'https://deejaygraham.github.io/2015/02/15/sketchnote-challenge/',
    'https://deejaygraham.github.io/img/posts/sketchnoting-challenge/mac-power-users.png'
)

Describe 'Externally Referenced Links' {

    $ImportantLinks | ForEach-Object {

        It "$_ is reachable" {

            Invoke-WebRequest -uri $_ | Select -ExpandProperty StatusCode | Should Be 200
        }
    }
}

```

### Documenting Web APIs

We can setup a test context for a specific Rest API - get and post.

```powershell 

Param (
	[Parameter(Mandatory=$True)]
	[string]$BaseUri
)

[string]$Resource = "$($BaseUri)builds/"

Describe "Build API : $Resource" {

	Context "Get Requests" {

		$AllBuilds = Invoke-RestMethod -Method Get -Uri $Resource -UseBasicParsing
	
		It 'Finds all builds' {

			$AllBuilds.Count | Should BeGreaterThan 0
		}

		It 'Finds builds by Id' {

			$SpecificBuild = $AllBuilds | Select-Object -First 1 

			$Build = Invoke-RestMethod -Method Get -Uri "$($Resource)$($SpecificBuild.id)" -UseBasicParsing

			$Build.id | Should Be $SpecificBuild.id
		}

		It 'Finds build by Name' {

			$SpecificBuild = $AllBuilds | Select-Object -First 1 

			$Build = Invoke-RestMethod -Method Get -Uri "$($Resource)?name=$($SpecificBuild.name)" -UseBasicParsing

			$Build.id | Should Be $SpecificBuild.id
		}

		It 'Unknown build returns 404' {

			[int]$InvalidDbKey = 99999999

			Try {
				Invoke-RestMethod -Method Get -Uri "$($Resource)$InvalidDbKey" -UseBasicParsing
			} Catch {

				$Error[0].Exception.Message | Should Be 'The remote server returned an error: (404) Not Found.'
			}
		}

	}

	Context "Post Requests" {

		$AllBuilds = Invoke-RestMethod -Method Get -Uri $Resource -UseBasicParsing

		It 'Accepts new builds' {

			$SpecificBuild = $AllBuilds | Select-Object -First 1 

			$NewBuild = @{

				productid = $SpecificBuild.productid 
				name = 'Example build'
				definition = '99.99.99.99'
				url = 'http://example.com/'
				version = 'Example Build 99'
			}

			$JsonObject = $NewBuild | ConvertTo-Json

			$CreatedObject = Invoke-RestMethod -Method Post -Uri $Resource -UseBasicParsing -Body $JsonObject -ContentType 'application/json'

			$CreatedObject.name | Should Be $NewBuild.name
		}
	}
}

```

### Test Suite

We can then invoke tests from a controlling script that will execute against all tests in a directory.

```powershell

Param (
	[Parameter()]
	[string]$BaseUri = 'http://localhost:51089/api/'
)

Import-Module Pester

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$here = Split-Path -Path $MyInvocation.MyCommand.Path

Invoke-Pester -Script @{ 

	Path = "$here\*.Tests.ps1"

	Parameters = @{ 
		BaseUri = $BaseUri
	}
}

```

### Christmas Driven Development 

(red and green) Like scrooge (more on him later), I need to know when christmas is coming so I can make preparations.
Let's write two functions, one to get some content from a website, and another to parse the text and find the value.

```powershell

Function Get-WebPageContent {

    Param(
        [Parameter(Mandatory=$True)]
        [string]$url
    )

    $response = Invoke-WebRequest -Uri $url -UseBasicParsing
    Write-Output $response.RawContent
}

Function Get-HowLongUntilChristmas {

    $response = Get-WebPageContent -Url "https://www.emailsanta.com/clock.asp"

    If ($response -match '<span class="XmasDayemph">(.*)</span>') {

        Write-Output $matches[1]
    }
}


```

### Mocking 


```powershell

Import-Module Pester

Describe 'Email Santa Service' {

    Context 'Countdown to Christmas' {

        It 'Expressed in days' {
            Get-HowLongUntilChristmas | Should BeLike '* days'               
        }
		
        It 'Calculates correctly' {
            Get-HowLongUntilChristmas | Should Be '24 days'               
        }
    }
}

```

Fails. We need some way to make this test work for every day of the year. Mock the content function and return a 
known value. Works all of the time. 


```powershell

Import-Module Pester

Describe 'Email Santa Service' {

    Context 'Countdown to Christmas' {

        Mock Get-WebPageContent { return '<html><span class="XmasDayemph">24 days</span>' }

        It 'Expressed in days' {
            Get-HowLongUntilChristmas | Should BeLike '* days'               
        }
		
        It 'Calculates correctly' {
            Get-HowLongUntilChristmas | Should Be '24 days'               
        }
    }
}

```

### SDD

It should be Christmas Day, I am sure," said she,
"What's to-day?" cried Scrooge, calling downward to a boy in Sunday clothes, who perhaps had loitered in to look about him.

Albert Finney (and my pop-in-law whose birthday it is) are both interested in whether today is christmas day.

To save them shouting out of the window to a passing urchin, I have written a function.


```powershell

Function Test-ChristmasDay {

    $Today = Get-Date

    If ($Today.Month -eq 12 -and $Today.Day -eq 25) {
        Write-Output $True
    } Else {
        Write-Output $False
    }
}

```

So I know I should test that difficult logic:


```powershell

Describe 'Scrooge' {

    Context 'Before the Ghosts Visit' {
        
        It 'Doesn't care about Christmas day' {
			# when will this work, when will it not work?
            Test-ChristmasDay | Should Be $false
        }
    }

    Context 'The Spirits have done it all in one night' {

        It 'It is Christmas Day' {
            Test-ChristmasDay | Should Be $True
        }
    }
}

```

```powershell

Describe 'Scrooge' {

    Context 'Before the Ghosts Visit' {
        
        Mock Get-Date { New-Object DateTime (2018, 7, 10) }

        It 'Doesn't care about Christmas day' {
            Test-ChristmasDay | Should Be $false
        }
    }

    Context 'The Spirits have done it all in one night' {

        It 'It is Christmas Day' {
    
            Test-ChristmasDay | Should Be $True
            Assert-MockCalled Get-Date -Times 2 -Exactly
        }
    }
}

```

Made tests independent of dates and times. We can expect that our code is much more likely to succeed when 
put into a real environment. We can also make sure that the internals we are expecting are called the right
number of times. 

### Modules 

Testing modules and developing them side by side with the tests, it's a good idea to make sure we are working 
with the most up to date version 


```powershell

Get-Module Scrooge | Remove-Module -Force
Import-Module $here\Scrooge.psm1 -Force

```

```powershell

Describe 'Get-ChristmasCarolGhost' {

	$Ghosts = Get-ChristmasCarolGhost
    $FirstGhost = $Ghosts | Select-Object -First 1

    It 'Three spirits shall visit scrooge' {
        $Ghosts.Count | Should -Be 3
    }

    It 'Finds existing ghost by name' {
        (Get-ChristmasCarolGhost -Name $FirstGhost.Name).id | Should -Be $FirstGhost.id 
    }
}

```

### Driving Home For Christmas


```powershell

Describe 'Get-ChrisReaSong' {

	$Path = Join-Path $TestDrive -ChildPath 'ChrisRea.txt'
	Set-Content -Path $Path -Content "I'm driving home for Christmas, Oh, I can't wait to see those faces"

    It 'Can read lyrics from a local file' {
		Get-ChrisReaSong -Path $Path | Should Contain 'faces'
    }
}

```

