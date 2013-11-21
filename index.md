---
title: d.j. graham
layout: default
---

{% assign post = site.posts.first %}

<div class="row">
	<div class="small-12 columns">
		<h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
		<p>{{ post.date | date_to_long_string }}</p>
		<p>{{ post.content }}</p>
	</div>
</div>
