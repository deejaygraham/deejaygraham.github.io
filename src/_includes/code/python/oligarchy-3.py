from decimal import *

class Player(object):
    
    def __init__(self, number, x, y):
        self.number = number
        self.pos = PVector(x, y)
        self.money = 100
        self.diameter = 100.0
       
    def __str__(self):
        return 'player ' + str(self.number) + ' has ' + str(self.money)
    
    def colour_for(self, value):
        opacity = 100
        colour = color(128, 128, 128, opacity)
        
        if value > 0:
            if value > 10:
                if value > 100:
                    colour = color(0, 255, 0, opacity)
                else:    
                    colour = color(0, 128, 0, opacity)
            else:
                colour = color(128, 0, 0, opacity)

        return colour
    
    # don't run a game while animation is happening
    def is_changing(self):
        return self.diameter != self.money
    
    def display(self):
        rectMode(CENTER)
        colour = self.colour_for(self.money)
        fill(colour)
        noStroke()
        ellipse(self.pos.x, self.pos.y, float(self.diameter), float(self.diameter))
        
        inflation_factor = 10
        if self.diameter > self.money:
            self.diameter = max(self.money, self.diameter - inflation_factor)
        elif self.diameter < self.money:
            self.diameter = min(self.money, self.diameter + inflation_factor)
            
        # dodgy player number display
        textSize(24)
        fill(color(255))
        text(str(self.number), self.pos.x, self.pos.y)
        
    def is_playing(self):
        return self.money > 0
    
    def stake(self):
        amount = Decimal(self.money / 2).to_integral_value()
        amount = max(amount, 1)
        println(str(self) + ' stakes ' + str(amount))
        return amount
    
    def lose(self, amount):
        println(str(self) + ', loses ' + str(amount))
        self.money = max(self.money - amount, 0)
            
    def win(self, amount):
        println(str(self) + ', wins ' + str(amount))
        self.money += amount
    
players = [ ]
coin_options = 'heads', 'tails'
                
def setup():
  fullScreen()
  
  player_number = 1
  for x in range(1, 10):
    # rough layout
    p = Player(player_number, x * 50, 450)
    players.append(p)
    player_number += 1

def draw():
  background(255)

  changing = False
  
  for p in players:
    if p.is_changing():
      changing = True
      break
  
  # are we animating or playing a round?
  if changing == False:
    # allocate players to pairs
    unpaired = []
    paired = {}
    
    for p in players:
      if p.is_playing():
        unpaired.append(p)
    
    # pair them off   
    while len(unpaired) > 1:
      firstChoice = int(random(len(unpaired)))
      player1 = unpaired.pop(firstChoice)
        
      secondChoice = int(random(len(unpaired)))
      player2 = unpaired.pop(secondChoice)
       
      paired[player1] = player2
        
    # play each pair  
    for p in paired:
      player1 = p
      player2 = paired[p]
        
      bet = min(player1.stake(), player2.stake())
        
      # toss a coin
      pick = int(random(len(coin_options)))
      heads_or_tails = coin_options[pick]
      println('coin is ' + heads_or_tails)  
      if heads_or_tails == 'tails':
        player1.win(bet)
        player2.lose(bet)
      else:
        player1.lose(bet)    
        player2.win(bet)    
  
  # layout each circle in a line.
  # find largest so that we don't go off canvas
  max_height = 0
  for p in players:
    max_height = max(max_height, p.pos.y)

  for p in players:
    p.pos.y = max_height
  
  # layout in a line                     
  # show each status regardless of whether they played
  # in the last round
  x = float(0.0)
  for p in players:
    p.pos.x = float(x) + float(p.diameter / 2)
    println('player x is ' + str(p.pos.x) + ' with diameter ' + str(p.diameter))
    x += float(p.diameter)
  
  for p in players:
    p.display()

  saveFrame("grid-######.png")