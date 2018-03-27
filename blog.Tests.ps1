[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Import-Module Pester

[string]$baseurl = 'https://deejaygraham.github.io/'

Describe 'My Blog' {

      $urls = @{
          # Top level
          "index" = $baseurl;
          "favicon" = "$($baseurl)favicon.ico";
          # Illustrations linked externally
          "external link - gtd sketchnote army illustration" = "$($baseurl)img/posts/sketchnoting-challenge/mac-power-users-hifi.png";
          # Images
          "avatar" = "$($baseurl)img/avatar.jpg";
          "avatar2" = "$($baseurl)img/avatar.png";
          # Heroes
          "hero - secret harbour" = "$($baseurl)img/heroes/hero-secret-harbour.jpg";
          "hero - me" = "$($baseurl)img/heroes/makers-and-creators.jpg";
          # Blog Images
          "img - post - senior dev" = "$($baseurl)img/posts/being-a-good-senior-dev/being-a-good-senior-dev-hires.jpg";
          # Fontawesome
          "font - font awesome" = "$($baseurl)fonts/fontawesome-webfont.eot";
          # Javascript
          "js - bootstrap" = "$($baseurl)js/bootstrap.js";
          "js - bootstrap minified" = "$($baseurl)js/bootstrap.min.js";
          "js - lunr" = "$($baseurl)js/lunr.js";
          "js - search" = "$($baseurl)js/search.js";
          # Feeds
          "feed - rss" = "$($baseurl)rss.xml";
          "feed - atom" = "$($baseurl)atom.xml";
          # Specific blog posts - one for each year
          "blog post - Joco Covers TMBG" = "$($baseurl)2011/11/01/joco-covers-tmbg/";
          "blog post - history" = "$($baseurl)2012/02/04/history/";
          "blog post - recursive-copy-in-msbuild" = "$($baseurl)2013/09/01/recursive-copy-in-msbuild/";
          "blog post - doctorows three laws" = "$($baseurl)2014/11/14/doctorows-three-laws/";
          "blog post - secret debugging tools article" = "$($baseurl)2015/06/18/secret-azure-debugging-tools/";
          "blog post - balancing ball" = "$($baseurl)2016/09/23/balancing-ball-game-on-the-microbit/";
          "blog post - blinking cpp for microbit" = "$($baseurl)2017/08/21/blinking-cpp-for-the-microbit/";
          # Individual pages
          "page - search" = "$($baseurl)search/";
          "page - style guide" = "$($baseurl)styleguide/";
          "page - projects" = "$($baseurl)projects/";
          "page - about" = "$($baseurl)about/index.html";
          "page - wireframe" = "$($baseurl)wireframe/index.html";
          # Pagination
          "page2" = "$($baseurl)page2/";
          "page3" = "$($baseurl)page3/";
          "page4" = "$($baseurl)page4/";
          "page5" = "$($baseurl)page5/";
          "page6" = "$($baseurl)page6/";
          "page7" = "$($baseurl)page7/";
          "page8" = "$($baseurl)page8/";
          "page9" = "$($baseurl)page9/";
          # talks
          "talks - sketchnoting" = "$($baseurl)talks/sketchnoting/";
          # Style Sheets
          "css - site" = "$($baseurl)css/site.css";
          # Downloads
          "downloads - ndifference release 0.1" = "$($baseurl)downloads/ndifference/NDifference.0.0.0.1.Installer.msi";
          # Tags -> Categories
          "categories - tdd" = "$($baseurl)category/tdd/";
          "categories - oo" = "$($baseurl)category/oo/";
          "categories - microbit" = "$($baseurl)category/microbit/";
          "categories - sketchnotes" = "$($baseurl)category/sketchnotes/";
      }

      $urls.Keys | ForEach-Object {

        $key = $_
        $value = $urls.$_

        It "$key exists at $value " {
            Invoke-WebRequest -Uri $value -UseBasicParsing -Method Head | Select-Object -ExpandProperty StatusCode | Should Be 200
        }

      }
}
