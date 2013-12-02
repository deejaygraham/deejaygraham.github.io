---
title: d.j.graham's blog
layout: index
---

{% assign MostRecentPost = site.posts.first %}

<article>
	<h6 class="post-date">{{MostRecentPost.date | date_to_long_string }}</h6>
	<h3 class="post-title"><a href="{{ MostRecentPost.url }}">{{ MostRecentPost.title }}</a></h3>
	<p>{{ MostRecentPost.content }}</p>
</article>
