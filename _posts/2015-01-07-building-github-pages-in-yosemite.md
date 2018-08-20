---
layout: post
title: Building Github Pages in OSX Yosemite
published: true
categories: [ meta, ruby, mac-os ]
---

As the proud owner of a shiny new Macbook running Yosemite, I'm now in the 
process of experimenting with doing a lot of stuff in OS X that I used to 
do in Windows.

One of these things was updating [my personal github site](http://deejaygraham.github.io/)
(where you are now :) so that I could refresh the tag cloud and check links 
were working before I committed a change or published a new post. Most of this 
work was done using the excellent [jekyll](http://jekyllrb.com/) but I did 
some grunt work and coordinated the workflow using MsBuild.

Here are the steps I went through to replicate my build process on OS X Yosemite. Hopefully,
you will find it useful, or if not I will in six months! 

## XCode...

Jekyll has a few dependencies that you might have problems with on OS X. 
The easiest work around for this is to install XCode and tools from the AppStore. 
Be careful where you install this from, when I first tried I was working over wifi 
and didn't realise the download was going to be over 2 GB!

Once XCode has downloaded and installed, open a terminal and install the command 
line developer tools by running:

	
	xcode-select --install
	
	
Agree to prompts and wait for it to finish. Before you jump into installing anything else,
make sure you spend a couple of minutes opening the XCode tools. You will be asked to 
agree to a EULA before you can do anything else. 

<img src="/img/posts/build-github-pages-yosemite/xcode-agreement.png" class="u-max-full-width" alt="the agreement" />

If you miss this step, you will be asked to agree in the terminal and it's a 
bit more awkward to read pages and pages of text before "agreeing"!

<img src="/img/posts/build-github-pages-yosemite/xcode-agreement-agree.png" class="u-max-full-width" alt="agreeing to the agreement" />

## ...Ruby...

OS X comes with ruby and rubygems pre-installed so you shouldn't need to do 
anything here.


## ...Jekyll...

Now we're ready to get jekyll. Switch back to the terminal and run:

	
	sudo gem install jekyll 
	
	
<img src="/img/posts/build-github-pages-yosemite/jekyll.png" class="u-max-full-width" alt="installing jekyll" />

Depending on your configuration you may need to install other gems. 

For instance, github pages use [rdiscount](https://github.com/davidfstr/rdiscount) 
to process markdown so I needed to install that independently:

	
	sudo gem install rdiscount
	

<img src="/img/posts/build-github-pages-yosemite/rdiscount.png" class="u-max-full-width" alt="installing rdiscount" />

You may also use Pygments for syntax highlighting

	
	sudo easy_install Pygments
	
	
## ...Action!

OS X doesn't support MsBuild (why would it) but it can run [mono](http://www.mono-project.com/) 
so this was my next installation step. Once this was installed, I could go back 
to the terminal and run :

		
	xbuild BuildSite.proj
			

...and hey presto! I have a rebuilt site, running on port 4000 of localhost.



