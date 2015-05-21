---
title: style guide
layout: styleguide
---

##Colour Palette

<table>
<tr><th>Main Colour</th><th>&nbsp;</th><th colspan="6">Secondary Colours</th></tr>
<tr>
<td style="background-color: #dd5d26; color: black; width: 50px; height: 50px;">#dd5d26</td>
<td>&nbsp;</td>
<td style="background-color: #ef7f3f; color: black; width: 50px; height: 50px; padding: 1em;">#ef7f3f</td>
<td style="background-color: #a7cb68; color: black; width: 50px; height: 50px; padding: 1em;">#a7cb68</td>
<td style="background-color: #585858; color: white; width: 50px; height: 50px; padding: 1em;">#585858</td>
<td style="background-color: #444854; color: white; width: 50px; height: 50px; padding: 1em;">#444854</td>
<td style="background-color: #ffedbe; color: black; width: 50px; height: 50px; padding: 1em;">#ffedbe</td>
<td style="background-color: #ece9cb; color: black; width: 50px; height: 50px; padding: 1em;">#ece9cb</td>
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

>
> Morbi eget gravida nunc, vel viverra mauris. In sodales iaculis velit, 
> et sollicitudin eros malesuada et. In accumsan sem vitae dolor luctus posuere. 
> Vivamus ac ornare mi. Quisque euismod bibendum auctor. Nunc viverra tristique 
> augue, in eleifend eros dignissim ut. 
>

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



