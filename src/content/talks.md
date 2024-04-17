---
permalink: talks/index.html
layout: base.njk
title: talks
---

<div class="grid">
{% for item in talks %}
	{# item.title, subtitle, url, thumbnail #}	
	<figure class="image is-128x128">
  	<img src="{{ item.thumbnail }}" />
	</figure>
{% endfor %}
</div>
