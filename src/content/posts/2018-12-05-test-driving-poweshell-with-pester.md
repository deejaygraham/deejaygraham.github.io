---
permalink: 2018/12/05/test-driving-poweshell-with-pester/
layout: post
title: Test Driving PowerShell with Pester
published: true
tags: [ powershell ]
hero: power
thumbnail: "/img/thumbnails/shell-420x255.webp"
alttext: powershell
---

Work in progress text and examples from an upcoming presentation.

Test Driven Development is Christmas themed - red green refactor cycle.

* Why Pester
* What is Pester
* Describe (01Structure)
* It
* Should (02Should)
* Formatted Output
	- Success
	- Failures

* Simplest testing
* Url testing (03Web) (04Links)
* Testing & Documenting Webservices  (05 StarWars) 
* Running suites of tests Invoke-Pester
Pass variables.

-Tag Films | People | Planets - only runs those tags
* Output Format -File -OutputFormat xml - understood by CI tools - VSTS etc. 


Christmas - Red Green is very festive. Let's look at import stuff.
Write-Christmas module and test it.

* Code Coverage Running any tests for christmas

* TestDrive
Set-Content 

* Mocking to make tests reliable

* Code Coverage




### RSpec

{% highlight "ruby" %}

require 'rack/test'
require 'json'

module ExpenseTracker

	RSpec.describe 'Expense Tracker API' do

		it 'records submitted expenses' do

			post '/expenses', JSON.generate(receipt)

		end
	end
end

{% endhighlight %}


### Describe It and Should

Easy to get started, let's try running vs code and typing a simple test.

{% highlight "powershell" %}

Import-Module Pester

Describe 'Pester' {

    It 'Just Works' {

        'toast' | Should Be 'test'
    }
}   

{% endhighlight %}

We can try Should Not Be, Be Like Be LikeExactly


{% highlight "powershell" %}

Import-Module Pester

Describe 'Presenting in public' {

	It 'Emotion should be positive' {

		$Emotion = 'Kacking It'
		$Emotion | Should Be 'Joy'
	}
}

{% endhighlight %}

Ok, that fails, let's fix the test to make it more representative of reality.


{% highlight "powershell" %}

Import-Module Pester

Describe 'Presenting in public' {

	It 'Emotion may not be positive' {

		$Emotion = 'Kacking It'
		$Emotion | Should Not Be 'Joy'
	}
}

{% endhighlight %}


{% highlight "powershell" %}

Import-Module Pester

Describe 'Presenting in public' {

	It 'should be like Macdonalds' {

		$Emotion = "I'm Loathing It"
		$Emotion | Should BeLike "I'm Lo*ing It"
	}
}

{% endhighlight %}

### Refactoring

We can have multiple describe blocks and multiple It blocks or collapse into one describe with multiple context blocks and they stack up as you would expect.

So we can test a website..


{% highlight "powershell" %}

Import-Module Pester
Set-StrictMode -Version Latest

Describe 'Google' {

    It 'Serves pages over http' {
        Invoke-WebRequest -Uri 'http://google.com/' -UseBasicParsing |
		Select-Object -ExpandProperty StatusCode |
		Should Be 200
    }

    It 'Serves pages over https' {
        Invoke-WebRequest -Uri 'https://google.co.uk/' -UseBasicParsing |
		Select-Object -ExpandProperty StatusCode |
		Should Be 200
    }
}


$ImportantLinks = @(
    'https://deejaygraham.github.io/2015/02/15/sketchnote-challenge/',
    'https://deejaygraham.github.io/img/posts/sketchnoting-challenge/mac-power-users.webp'
)

Describe 'Externally Referenced Links' {

    $ImportantLinks | ForEach-Object {

        It "$_ is reachable" {

            Invoke-WebRequest -uri $_ -UseBasicParsing |
            Select-Object -ExpandProperty StatusCode |
            Should Be 200
        }
    }
}

{% endhighlight %}

### Documenting Web APIs

We can setup a test context for a specific Rest API - get and post.

### Test Suite

{% highlight "powershell" %}

Param (
	[Parameter(Mandatory=$True)]
	[string]$BaseUri
)

[string]$Resource = "$($BaseUri)films/"

Describe "Films in the Star Wars Universe" {

	$AllFilms = Invoke-RestMethod -Method Get -Uri $Resource -UseBasicParsing

	It 'Contains all 7 films' {

		$AllFilms.Count | Should Be 7
	}
}

Param (
	[Parameter(Mandatory=$True)]
	[string]$BaseUri
)

[string]$Resource = "$($BaseUri)planets/"

Describe "Planets in Star Wars" {

	$AllPlanets = Invoke-RestMethod -Method Get -Uri $Resource -UseBasicParsing

	It 'Contains a lot of planets' {

		$AllPlanets.Count | Should Be 61
	}
}

Param (
	[Parameter(Mandatory=$True)]
	[string]$BaseUri
)

[string]$Resource = "$($BaseUri)people/"

Describe "People in Star Wars" {

	$Everyone = Invoke-RestMethod -Method Get -Uri $Resource -UseBasicParsing

	It 'Contains a lot of people' {

		$Everyone.Count | Should Be 87
	}

	It 'Luke Skywalker is Id = 1' {

		$Luke = Invoke-RestMethod -Method Get -Uri "$($Resource)1" -UseBasicParsing

		$Luke.name | Should Be 'Luke Skywalker'
	}
}

{% endhighlight %}


{% highlight "powershell" %}

Import-Module Pester

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

[string]$here = Split-Path -Path $MyInvocation.MyCommand.Path
[string]$BaseUri = 'https://swapi.co/api/'

Invoke-Pester -Script @{

	Path = "$here\*.Tests.ps1"

	Parameters = @{
		BaseUri = $BaseUri
	}
}

{% endhighlight %}


We can then invoke tests from a controlling script that will execute against all tests in a directory.

{% highlight "powershell" %}

Import-Module Pester

$here = Split-Path -Path $MyInvocation.MyCommand.Path

Invoke-Pester -Script "$here\*.Tests.ps1"

{% endhighlight %}

We can even pass parameters to each script, like the base uri


{% highlight "powershell" %}

Param (
	[Parameter()]
	[string]$BaseUri = 'https://swapi.co/api/'
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

{% endhighlight %}

### Christmas Driven Development

Now to the serious stuff

Like scrooge (more on him later), I need to know when Christmas is coming so I can make preparations.
Let's write two functions, one to get some content from a website, and another to parse the text and find the value.

{% highlight "powershell" %}

$SantaUrl = 'https://www.emailsanta.com/clock.asp'
$HtmlToMatch = '<span class="XmasDayemph">(.*)</span>'

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

    If ($response -match $HtmlToMatch) {

        Write-Output $matches[1]
    }
}


{% endhighlight %}

### Mocking

Initial set of tests...

{% highlight "powershell" %}

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

{% endhighlight %}

Fails. We need some way to make this test work for every day of the year. Mock the content function and return a
known value. Works all of the time.


{% highlight "powershell" %}

Import-Module Pester

Describe 'Email Santa Service' {

    Context 'Countdown to Christmas' {

		$FakeWebPage = '<html><span class="XmasDayemph">24 days</span>'
        Mock Get-WebPageContent { return $FakeWebPage }

        It 'Expressed in days' {
            Get-HowLongUntilChristmas | Should BeLike '* days'               
        }

        It 'Calculates correctly' {
            Get-HowLongUntilChristmas | Should Be '24 days'               
        }
    }
}


# Evaluated in order 
$filter = '(B|D|E)$'
Mock Select-String { "matched!" } -ParameterFilter { $Path -match $filter }
Mock Select-String 
		
		

{% endhighlight %}

### SDD

It should be Christmas Day, I am sure," said she,
"What's to-day?" cried Scrooge, calling downward to a boy in Sunday clothes, who perhaps had loitered in to look about him.

Albert Finney (and my pop-in-law whose birthday it is) are both interested in whether today is christmas day.

To save them shouting out of the window to a passing urchin, I have written a function.


{% highlight "powershell" %}

Function Test-ChristmasDay {

    $Today = Get-Date

    If ($Today.Month -eq 12 -and $Today.Day -eq 25) {
        Write-Output $True
    } Else {
        Write-Output $False
    }
}

{% endhighlight %}

So I know I should test that difficult logic:


{% highlight "powershell" %}

Describe 'Scrooge' {

    Context 'Before the Ghosts Visit' {

        It 'Doesn't care about Christmas day' {
			# when will this work, when will it not work
            Test-ChristmasDay | Should Be $false
        }
    }

    Context 'The Spirits have done it all in one night' {

        It 'It is Christmas Day' {
            Test-ChristmasDay | Should Be $True
        }
    }
}

{% endhighlight %}

{% highlight "powershell" %}

Describe 'Scrooge' {

    Context 'Before the Ghosts Visit' {

        Mock Get-Date { New-Object DateTime (2018, 7, 10) }

        It 'Doesn't care about Christmas day' {
            Test-ChristmasDay | Should Be $false
        }
    }

    Context 'The Spirits have done it all in one night' {

		# Wizzard way of doing it.
		Mock Get-Date { New-Object DateTime (2018, 12, 25) }

        It 'It is Christmas Day' {

            Test-ChristmasDay | Should Be $True
            Assert-MockCalled Get-Date -Times 2 -Exactly
        }
    }
}

{% endhighlight %}

Made tests independent of dates and times. We can expect that our code is much more likely to succeed when
put into a real environment. We can also make sure that the internals we are expecting are called the right
number of times.

### Modules

Testing modules and developing them side by side with the tests, it's a good idea to make sure we are working
with the most up to date version


{% highlight "powershell" %}

Get-Module Scrooge | Remove-Module -Force
Import-Module $here\Scrooge.psm1 -Force

{% endhighlight %}

{% highlight "powershell" %}

Set-StrictMode -Version Latest

Function Get-Ghost {
  [CmdletBinding()]
  Param()

  $Ghosts = @( 'Jacob Marley', 'Christmas Past', 'Christmas Present', 'Christmas Future', 'Patrick Swayze', '' )

  Write-Output $Ghosts
}

Export-ModuleMember -Function *

{% endhighlight %}

{% highlight "powershell" %}

Describe 'Get-ChristmasCarolGhost' {

	$Ghosts = Get-ChristmasCarolGhost
    $FirstGhost = $Ghosts | Select-Object -First 1

    It 'Three spirits shall visit scrooge' {
        $Ghosts.Count | Should -Be 4
    }

    It 'First Ghost is Marley' {
        $FirstGhost | Should -Be Like '*Marley'
	}
}

{% endhighlight %}

### Driving Home For Christmas


{% highlight "powershell" %}

$here = Split-Path -Path $MyInvocation.MyCommand.Path

Get-Module ChrisRea | Remove-Module -Force
Import-Module $here\ChrisRea.psm1

Import-Module Pester

Describe 'Chris Rea' {

	$Path = Join-Path $TestDrive -ChildPath 'ChrisRea.txt'
	Set-Content -Path $Path -Content "I'm driving home for Christmas, Oh, I can't wait to see those faces"

	It 'Song lyrics can be read from a local file' {
	  Get-ChristmasSong -Path $Path | Should Contain 'faces'
	}
}

{% endhighlight %}

Write a function that prints the lyrics to a christmas song.


{% highlight "powershell" %}

Set-StrictMode -Version Latest

Function Get-ChristmasSong {
  [CmdletBinding()]
  Param(
    [Parameter(Mandatory=$True)]
    [string]$Path
  )

  Write-Output (Get-Content -Path $Path)
}

Export-ModuleMember -Function *

{% endhighlight %}

### CI

{% highlight "powershell" %}

Invoke-Pester -OutputFile 'PesterResults.xml' -OutputFormat NUnitXml

Import-Module Pester

$here = Split-Path -Path $MyInvocation.MyCommand.Path

Invoke-Pester -Script @{

	Path = "$here\*.Tests.ps1"

	Parameters = @{
		BaseUri = $BaseUri
	}
}

{% endhighlight %}

### Code Coverage

{% highlight "powershell" %}

Invoke-Pester -Script Demo.Tests.ps1 -CodeCoverage Demo.ps1

{% endhighlight %}
