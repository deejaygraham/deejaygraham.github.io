---
title: Blog
layout: blog
---
{% for post in site.posts %}
<article>
	<h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
	<h6>{{ post.date | date_to_long_string }}</h6>
	<p>{{ post.excerpt }}</p>
</article>
{% endfor %}		

