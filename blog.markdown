---
title: d.j.graham's blog
layout: blog
---
{% for post in site.posts %}
<article>
	<h6 class="post-date">{{ post.date | date_to_long_string }}</h6>
	<h3 class="post-title"><a href="{{ post.url }}">{{ post.title }}</a></h3>
	<p>{{ post.excerpt }}</p>
</article>
{% endfor %}		

