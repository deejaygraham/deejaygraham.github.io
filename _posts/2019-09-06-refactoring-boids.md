---
layout: post
title: Refactoring Boids
published: true
categories: [code]
---

<a href="https://processing.org/examples/flocking.html">Boids</a>, by <a href="https://shiffman.net/">Daniel Shiffman</a> is a <a href="https://processing.org/">Processing</a> example
of the flocking algorithm developed by Craig Reynolds using simple rules for individual "boids" to simulate the behaviour seen in flocks of real birds.

As a challenge from a colleague I wanted to see how I could refactor the code from a single file into smaller chunks so it's more readable and understandable.

Here's the original code from the processing website:

```java

{% include code/java/boids_original/boids_original.pde %}

```

### Split

First off, we have three distinct classes - the main game class, the flock (a container for the
boids) and the boid itself.

#### Game

```java

{% include code/java/boids-game.pde %}

```

#### Flock

```java

{% include code/java/boids-flock.pde %}

```
