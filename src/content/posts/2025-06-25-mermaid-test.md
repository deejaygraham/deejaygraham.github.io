---
layout: post
title: Mermaid Test
mermaid: true
---

Test post using new mermaid shortcode which adds support for mermaid diagram content in posts. 

{% mermaid %}
graph TD
  A[Client] -->|tcp_123| B
  B(Load Balancer)
  B -->|tcp_456| C[Server1]
  B -->|tcp_456| D[Server2]
{% endmermaid %}
