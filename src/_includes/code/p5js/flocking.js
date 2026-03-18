let flock;
let sky;

const cellSize = 60; 
let grid = {};

function setup() {
  createCanvas(windowWidth, windowHeight).parent("flocking");
  sky = createGraphics(width, height);
  drawSunsetBackgroundToBuffer(sky);
  createP('Drag the mouse to generate new boids.');

  flock = new Flock();

  // Add an initial set of boids into the system
  for (let i = 0; i < 250; i++) {
    let b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }

  describe(
    'A group of bird-like objects, represented by dots, moving across the canvas, modeling flocking behavior.'
  );
}

function draw() {
	image(sky, 0, 0);
  flock.run();
}

function drawSunsetBackgroundToBuffer(buffer) {
  let topColor = color(50, 90, 160);
  let bottomColor = color(255, 150, 60);

  for (let y = 0; y < height; y++) {
    let t = y / height;
    let c = lerpColor(topColor, bottomColor, t);
    buffer.stroke(c);
    buffer.line(0, y, width, y);
  }
}

// On mouse drag, add a new boid to the flock
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

// Flock class to manage the array of all the boids
class Flock {
  constructor() {
    this.boids = [];
  }

  run() {
	 this.buildGrid(flock);
	  
    for (let boid of this.boids) {
      // Pass the entire list of boids to each boid individually
      boid.run(this.boids);
    }
  }

  addBoid(b) {
    this.boids.push(b);
  }

	buildGrid(boids) {
    grid = {};   // reset grid

    for (let b of this.boids) {
      let x = Math.floor(b.position.x / cellSize);
      let y = Math.floor(b.position.y / cellSize);
      let key = `${x},${y}`;

      if (!grid[key]) grid[key] = [];
        grid[key].push(b);
      }
  }
}

class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.size = 1.0;

    // Maximum speed
    this.maxSpeed = 3;

    // Maximum steering force
    this.maxForce = 0.05;
    //colorMode(HSB);
    this.color = color(0, 0, 0);
  }

  getNearbyBoids() {
    let x = Math.floor(this.position.x / cellSize);
    let y = Math.floor(this.position.y / cellSize);

    let neighbours = [];

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        let key = `${x + dx},${y + dy}`;
        if (grid[key]) {
          neighbours = neighbours.concat(grid[key]);
        }
      }
    }
    
    return neighbours;
  }
	
  run(boids) {
	  let neighbours = this.getNearbyBoids();
    this.flock(neighbours);
    this.update();
    this.render();
  }

  applyForce(force) {
    // We could add mass here if we want: A = F / M
    this.acceleration.add(force);
  }

  // We accumulate a new acceleration each time based on three rules
  flock(boids) {
    let separation = this.separate(boids);
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);

    // Arbitrarily weight these forces
    separation.mult(1.5);
    alignment.mult(1.0);
    cohesion.mult(1.0);

    // Add the force vectors to acceleration
    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);

	  this.avoidEdges();
	  this.avoidGround();
  }

	avoidEdges() {
    let d = 120;  // distance zone to begin curved avoidance (tweak)
    let force = createVector(0, 0);

    // Strength increases near the boundary (0 to 1)
    function strength(dist) {
      return constrain(1 - dist / d, 0, 1);
    }

    // LEFT edge
    if (this.position.x < d) {
      let s = strength(this.position.x);
      let turn = createVector(this.maxSpeed, this.velocity.y * 0.5);
      turn.setMag(this.maxSpeed * s);
      force.add(turn);
    }
  
    // RIGHT edge
    if (this.position.x > width - d) {
      let dist = width - this.position.x;
      let s = strength(dist);
      let turn = createVector(-this.maxSpeed, this.velocity.y * 0.5);
      turn.setMag(this.maxSpeed * s);
      force.add(turn);
    }
  
    // TOP edge
    if (this.position.y < d) {
      let s = strength(this.position.y);
      let turn = createVector(this.velocity.x * 0.5, this.maxSpeed);
      turn.setMag(this.maxSpeed * s);
      force.add(turn);
    }
  
    // BOTTOM edge
    if (this.position.y > height - d) {
      let dist = height - this.position.y;
      let s = strength(dist);
      let turn = createVector(this.velocity.x * 0.5, -this.maxSpeed);
      turn.setMag(this.maxSpeed * s);
      force.add(turn);
    }

    // Apply curved steering force
    if (force.mag() > 0) {
      force.limit(this.maxForce * 1.5);  // slightly stronger than normal steering
      this.applyForce(force);
    }
}
	avoidGround() {
    let buffer = 120;           // how close to the ground before avoiding
    let distFromGround = height - this.position.y;
  
    if (distFromGround < buffer) {
  
      // Interpolate strength: 1 near ground → 0 farther away
      let strength = 1 - (distFromGround / buffer);
  
      // Upward steering (curved by mixing velocity)
      let desired = createVector(this.velocity.x * 0.6, -this.maxSpeed);
  
      // Add some noise so they don't all turn the same way
      let angleNoise = map(
        noise(this.position.x * 0.01, frameCount * 0.01),
        0, 1, -0.3, 0.3
      );
      desired.rotate(angleNoise);
  
      desired.setMag(this.maxSpeed * strength);
  
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce * 1.5);   // a bit stronger than normal
  
      this.applyForce(steer);
    }
  }
	
  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);

    // Limit speed
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    // A vector pointing from the location to the target
    let desired = p5.Vector.sub(target, this.position);

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxSpeed);

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);

    // Limit to maximum steering force
    steer.limit(this.maxForce);
    return steer;
  }

  render() {
    // simplest possible rendering
	  stroke(0);
	  strokeWeight(2);
	  point(this.position.x, this.position.y); //, this.size);
  }

  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    let desiredSeparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;

    // For every boid in the system, check if it's too close
    for (let boid of boids) {
      let distanceToNeighbor = p5.Vector.dist(this.position, boid.position);

      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (distanceToNeighbor > 0 && distanceToNeighbor < desiredSeparation) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boid.position);
        diff.normalize();

        // Scale by distance
        diff.div(distanceToNeighbor);
        steer.add(diff);

        // Keep track of how many
        count++;
      }
    }

    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids) {
    let neighborDistance = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighborDistance) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  // Cohesion
  // For the average location (i.e., center) of all nearby boids, calculate steering vector towards that location
  cohesion(boids) {
    let neighborDistance = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighborDistance) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }

} // class Boid
