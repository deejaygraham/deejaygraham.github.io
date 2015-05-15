---
title: style guide
layout: styleguide
---

##Colour Palette

<table>
<tr><th>Main Colour</th><th>&nbsp;</th><th colspan="5">Secondary Colours</th></tr>
<tr>
<td style="background-color: #FC6C10; color: black; width: 50px; height: 50px;">#FC6C10</td>
<td>&nbsp;</td>
<td style="background-color: #313E59; color: black; width: 50px; height: 50px;">#313E59</td>
<td style="background-color: #7B7C85; color: black; width: 50px; height: 50px;">#7B7C85</td>
<td>#</td>
<td>#</td>
<td>#</td>
</tr>
</table>

-----

##Typography

###Body Text

<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in imperdiet leo. Suspendisse tristique, arcu vestibulum dapibus 
pellentesque, nulla arcu convallis neque, ut porttitor velit ipsum sit amet ligula. Aenean sed dolor iaculis, sodales nulla quis, 
auctor nisi. Morbi eget gravida nunc, vel viverra mauris. In sodales iaculis velit, et sollicitudin eros malesuada et. In accumsan 
sem vitae dolor luctus posuere. Vivamus ac ornare mi. Quisque euismod bibendum auctor. Nunc viverra tristique augue, in eleifend eros 
dignissim ut. Curabitur tincidunt cursus orci eget dictum.
</p>

###Modifiers 

*Italic text looks like this*

**Bold text looks like this**

~~Strikethrough this text. I made a mistake~~

###Block quotes

> This is a block quote. Is it not?

###Links

[Visit GitHub!](http://www.github.com)

###Lists

* Unordered Item star
* Unordered Item star
* Unordered Item star
* Unordered Item star
* Unordered Item star

###Inline Lists

<ul class="list-inline">
<li>First</li>
<li>Second</li>
<li>Third</li>
</ul>

###Code

```
Here is some code what I wrote
```

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

```csharp
System.Console.WriteLine("Hello World");
```

```
img {
	width:auto;
    max-width:100%;
	height:auto;
}
```

------

##Iconography

<table>
<tr><td><img src="/img/twitter.png" /></td></tr>
<tr><td><img src="/img/github.png" /></td></tr>
<tr><td><img src="/img/email.png" /></td></tr>
</table>

------

##Images

<!-- 
	Images 
	550px or 250px and media queries needed

	-->
<img src="/img/posts/lean-coffee-rules/lean-coffee-presentation-notes-bw.png" alt="alt text" width="550px" />

------

##Blog Index 

###Title Links
<span class="post-title"><a href="#">How to do blah, blah, blah</a></span>

###Tag Links
<!-- Tags -->
<a href="#" class="tag">csharp</a>
<a href="#" class="tag">tdd</a>
<a href="#" class="tag">illustration</a>

###Dates
<span class="date">20th April 1996</span>

##Blog Post

#Title

##Sub Heading

###Sub sub heading



