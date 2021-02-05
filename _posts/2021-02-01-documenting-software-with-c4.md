---
layout: post
title: Documenting Software with C4
published: true 
categories: [ xp ]
thumbnail: "/img/thumbnails/shell-420x255.jpg"
alttext: architecture

---

Code as infrascture is one thing but how about code as design or architecture documentation? 

I've long been a fan of UML, less the formal specification, more the informal whiteboard technique 
of documentation used as a series of well-understood glyphs to ease conversations about structure of 
software. 

Sometime last year I found out about <a href="https://twitter.com/simonbrown">Simon Brown</a> 's <a href="https://c4model.com">C4 Model</a> of organizing and documenting software architectures as a set of zoomable maps using a small set of boxes, lines and text annotations. 

Once I recognized the usefulness of these kinds of diagramming techniques, I struggled for a good way to create them that wasn't overly simplistic or required specific drawing packages. I wanted something like the <a href="https://graphviz.org">Graphviz</a> library. 

Eventually, I found a wonderful library <a href="https://github.com/plantuml-stdlib/C4-PlantUML">C4 PlantUML</a> by <a href="https://twitter.com/RicardoNiepel">Ricardo Niepel</a> built on top of the equally wonderful <a href="https://plantuml.com">PlantUML</a> package. 

The diagrams as built using text commands to specify objects and their relations between one another.
Running the diagram through Plant UML then produces a very nicely laid-out graphic, suitable for 
inclusion in slides or documents, and the source description can be checked into source control. Win!

### Skeleton

Each diagram is bracketed with a startuml and enduml tag. The start tag can include a suggested file name for generation. The first statement should be an include statement for the type of diagram - Context, Container, Component, Dynamic or Deployment Diagram. 


```
@startuml "Cloud-Service-Roles-Context"

!includeurl https://raw.githubusercontent.com/RicardoNiepel/C4-PlantUML/release/1-0/C4_Context.puml

title My Context Diagram

' People
' ######

Person(customer, "Customer")

' Systems
' #######

System(web, "Website")
System_Ext(billing, "Billing", "Monthly billing information")

' Relations
' #########
Rel(customer, web, "Uses")
Rel(web, billing, "Usage")

@enduml
```

Each document or diagram type supports different macros used to define the objects with the diagram. Relationships can be set losely so that the rendering engine decides how best to layout and structure the diagram, or you can hint to the renderer that blocks should be laid out in relation to each other.

The github repo for C4 PlantUML has <a href="https://github.com/plantuml-stdlib/C4-PlantUML#advanced-samples">plenty of samples</a> for reference.

### VS Code

VS Code, if that's your preferred editor, has an extension to generate PlantUML images on the fly so you can get realtime previews of a C4 document as you edit it.  


### Plant UML

Outside of the editor preview, PlantUML is a java .jar application and can generate images for one document or all documents in a folder

single document
```
java -jar plantuml.jar ContextDiagram.puml

```

all documents
```
java -jar plantuml.jar ContextDiagram.puml

```

I should say, Plant UML isn't just great for constructing these C4 diagrams, I have also stared using it for sequence diagrams, class diagrams and activity diagrams. I find the default colour scheme a little annoying since it harps back to the old days of Rational Rose but there are options to configure the look of the generated graphics for font, colour etc. 
