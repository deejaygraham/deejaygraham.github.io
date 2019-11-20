class Boid(object):
    
  def __init__(self, x, y):
    self.acceleration = PVector(0, 0)

    angle = random(TWO_PI)
    self.velocity = PVector(cos(angle), sin(angle))
    self.position = PVector(x, y)
    
    # these may stand to be better described later.
    self.r = 2.0
    self.maxspeed = 2
    self.maxforce = 0.03
    
  def fly(self, members):
    self.flock(members)
    self.update()
    self.borders()
    self.render()

  def applyForce(self, force):
    # We could add mass here if we want A = F / M
    self.acceleration.add(force)

  def flock(self, members):
    separation = self.separate(members) # Separation
    alignment = self.align(members)       # Alignment
    chohesion = self.cohesion(members)    # Cohesion
    # Arbitrarily weight these forces
    separation.mult(1.5)
    alignment.mult(1.0)
    chohesion.mult(1.0)
    # Add the force vectors to acceleration
    self.applyForce(separation)
    self.applyForce(alignment)
    self.applyForce(chohesion)

  def update(self):
    # Update velocity
    self.velocity.add(self.acceleration)
    # Limit speed
    self.velocity.limit(self.maxspeed)
    self.position.add(self.velocity)
    # Reset accelertion to 0 each cycle
    self.acceleration.mult(0)

  # Ensure boids wrap around the edges of the screen
  def borders(self):
    pass
    # need screen width and height for this.
    # if self.position.x < -self.r: self.position.x = width + self.r
    # if self.position.y < -self.r: self.position.y = height + self.r
    # if self.position.x > width + self.r: self.position.x = -self.r
    # if self.position.y > height + self.r: self.position.y = -self.r 

  def render(self):
    # Draw a triangle rotated in the direction of velocity
    theta = self.velocity.heading2D() + radians(90)
    # heading2D() above is now heading() but leaving old syntax until Processing.js catches up
    
    fill(200, 100)
    stroke(255)
    pushMatrix()
    translate(self.position.x, self.position.y)
    rotate(theta)
    beginShape(TRIANGLES)
    vertex(0, -self.r*2)
    vertex(-self.r, self.r*2)
    vertex(self.r, self.r*2)
    endShape()
    popMatrix()

  #
  # Rules for boid movement
  #     
  # A method that calculates and applies a steering force towards a target
  # STEER = DESIRED MINUS VELOCITY
  def seek(self, target):
    desired = PVector.sub(target, self.position);  # A vector pointing from the position to the target
    # Scale to maximum speed
    desired.normalize()
    desired.mult(self.maxspeed)

    # Above two lines of code below could be condensed with new PVector setMag() method
    # Not using this method until Processing.js catches up
    # desired.setMag(maxspeed);

    # Steering = Desired minus Velocity
    steer = PVector.sub(desired, self.velocity)
    steer.limit(self.maxforce)  # Limit to maximum steering force
    
    return steer
  

  # Separation
  # Method checks for nearby boids and steers away
  def separate (self, members):
    desiredseparation = 25.0
    steer = PVector(0, 0, 0)
    
    count = 0
    # For every boid in the system, check if it's too close
    for other in members:
      d = PVector.dist(self.position, other.position)
      # If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if d > 0  and d < desiredseparation:
        # Calculate vector pointing away from neighbor
        diff = PVector.sub(self.position, other.position)
        diff.normalize()
        diff.div(d)        # Weight by distance
        steer.add(diff)
        count += 1         # Keep track of how many

    # Average -- divide by how many
    if count > 0:
      steer.div(float(count))

    # As long as the vector is greater than 0
    if steer.mag() > 0:
      # First two lines of code below could be condensed with new PVector setMag() method
      # Not using this method until Processing.js catches up
      # steer.setMag(maxspeed);

      # Implement Reynolds: Steering = Desired - Velocity
      steer.normalize()
      steer.mult(maxspeed)
      steer.sub(velocity)
      steer.limit(maxforce)

    return steer

    # Alignment
    # For every nearby boid in the system, calculate the average velocity
  def align (self, members):
    neighbordist = 50
    sum = PVector(0, 0)
    
    count = 0
    
    for other in members:
      d = PVector.dist(self.position, other.position)

      if d > 0 and d < neighbordist:
        sum.add(other.velocity)
        count += 1

    if count > 0:      
      sum.div(float(count))
      
      # First two lines of code below could be condensed with new PVector setMag() method
      # Not using this method until Processing.js catches up
      # sum.setMag(maxspeed);

      # Implement Reynolds: Steering = Desired - Velocity
      sum.normalize()
      sum.mult(maxspeed)
      steer = PVector.sub(sum, self.velocity)
      steer.limit(self.maxforce)
            
      return steer
      
    return PVector(0, 0)

    # Cohesion
    # For the average position (i.e. center) of all nearby boids, calculate steering vector towards that position
    def cohesion (self, members):
      neighbordist = 50
      sum = PVector(0, 0)    # Start with empty vector to accumulate all positions
        
      count = 0
      for other in members:
        d = PVector.dist(self.position, other.position)
        if d > 0 and d < neighbordist:
          sum.add(other.position); # Add position
          count += 1
        
      if count > 0:
        sum.div(count)
        return self.seek(sum)  # Steer towards the position

      return PVector(0, 0)
