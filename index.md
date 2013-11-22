---
title: d.j. graham
layout: default
---

{% assign post = site.posts.first %}

<div class="row">
	<div class="small-12 columns" role="content">
		<article>
			<h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
			<h6>{{ post.date | date_to_long_string }}</h6>
			<p>{{ post.content }}</p>
		</article>
	</div>
</div>
