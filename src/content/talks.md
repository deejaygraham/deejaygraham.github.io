---
permalink: talks/index.html
layout: base.njk
title: talks
---
<div class="grid">
{% for item in talks %}
	<div class="cell">
		<div class="card">
  			{#<div class="card-image">
				<figure class="image is-128x128">
  					<img src="{{ item.thumbnail }}" />
				</figure>
			</div>
   #}
			
	  		<div class="card-content">
    				<p class="title">{{ item.title }}</p>
				{% if item.subtitle %}
    				<p class="subtitle">{{ item.subtitle }}</p>
    				{% endif %}
				<p><a href="{{ item.url }}">{{ item.title }}</a></p>
    			</div>
  		</div>
	</div>  
{% endfor %}
</div>
