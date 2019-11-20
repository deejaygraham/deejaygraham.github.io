class Flock(object):
    
  def __init__(self):
    self.members = list()
    
  def fly(self):
    for member in self.members:
      member.fly(self.members)
            
  def add(self, newMember):
    self.members.append(newMember)
