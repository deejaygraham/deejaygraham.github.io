---
title: d.j. graham
layout: index
---

{% assign MostRecentPost = site.posts.first %}

<article>
	<h3><a href="{{ MostRecentPost.url }}">{{ MostRecentPost.title }}</a></h3>
	<h6 id="post-date">{{MostRecentPost.date | date_to_long_string }}</h6>
	<p>{{ MostRecentPost.content }}</p>
</article>
