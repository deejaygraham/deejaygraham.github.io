---
title: Tiny City Layout
tags: [code, processing, python]
thumbnail: /img/posts/tiny-city-layout/tiny-city-layout-420x255.png

---

Always on the look out for tiny but interesting generative art samples, I came across a tweet by Martin Kleppe (no longer a twitter users it seems) with an intriguing
snippet of code and some suggestions for alternatives. I thought that this might work in processing so decided to give it a go.

Here is the Python version of Martin's original code.

```python

size(1024, 1024)
background(0)

for x in range(0, 256):
    for y in range(0, 256):
        if (x ^ y) % 9:
            rect(x _ 4, y _ 4, 4, 4)

```

Martin suggested replacing 9 with 5, 17 or 33 to get different patterns but I think the original works very nicely.

It could be an aerial view of a city with repeating blocks of buildings. Also, it reminds me of a previous job where I
might spend days looking at microprocessor chips either through a high powered camera or microscope, or in some cases,
an electron microscope.

![screenshot]\(/assets/img/posts/tiny-city-layout/art-1.png)
