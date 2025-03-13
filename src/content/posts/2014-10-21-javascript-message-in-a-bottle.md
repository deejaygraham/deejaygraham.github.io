---
title: Javascript Message in a Bottle
tags: [code]
---

Another from the department of uses-the-syntax-so-infrequentyly-I-nearly-always-forget.

This time, in conversation with a colleague, we were discussing the advantages
and disadvantages between explicit inline javascript embedded in html tags
and wiring up events in an external js file.

Embarrasingly, despite the amount of time I have spent working in jQuery and
javascript I found I couldn't remember the exact syntax in plain old javascript.

So this is a message to my future self, who will forget again before too long :)

```html
<html>
<head>
	 <script type="text/javascript" src="example.js"></script>
</head>
<body>
<h1>Hello World</h1>
</body>
</html>
```

```javascript
function init() {
    alert("Window Loaded");
}
    
function onClick() {
	alert("Click");
}

window.onload = init;
window.onclick = onClick;

```