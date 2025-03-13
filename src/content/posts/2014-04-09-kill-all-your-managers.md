---
title: Kill All Your Managers
tags: [naming, code, oo]
---

Not your line manager, obviously. I mean your Manager classes.

I've been having a debate today with a colleague who was looking for a suitable
name for a new class he was about to write.

The initial guess he came up with was the FooBar*Manager*. When I asked him
to describe the responsibility of this class, the answer was kind of vague,
it would do a bit of this, a bit of that, a bit of everything really.

Which made me think.

Naming a class with the Manager suffix may seem reasonable at the time but
it implies such a vague responsibility definition that it is almost certainly
a code smell. It usually means that you are assigning too much responsibility
to it.

Not only is this bad for it's own sake, for maintainability and separation
of concerns, the next programmer to touch the code (which may be you in
six months time) may use the vague responsibility boundary as an excuse to
shoehorn in unrelated code rather than creating something with more well
defined responsibilities.

That way lies a lifetime of cruft accumulation and code archaeology for
your future self and your colleagues. Please don't do it.

The c2 wiki has a good discussion on the subject: [Dont Name Classes Object Manager Handler or Data](http://c2.com/cgi/wiki?DontNameClassesObjectManagerHandlerOrData)
and the [Taligent Object Oriented design guidelines](http://root.cern.ch/TaligentDocs/TaligentOnline/DocumentRoot/1.0/Docs/books/WM/WM_3.html)
has an article [Managers are not objects](http://root.cern.ch/TaligentDocs/TaligentOnline/DocumentRoot/1.0/Docs/books/WM/WM_47.html#HEADING61)

On the other hand, if think FooBarManager is a good name, you might just
like two websites [Class Namer](http://www.classnamer.com/) by
[Aaron Beckerman](https://github.com/ab9) and [Method Namer](http://methodnamer.com/)
by [Jeff Foster](http://www.fatvat.co.uk/) [@fffej on Twitter](https://twitter.com/fffej/)

<div class="alert alert-info">
<h4>Update</h4>
The final class went through a number of iterations until it was given the 
name *Creator* and was literally and figuratively a God class :)
</div>
