class Dead(Player):
    
    def __init__(self):
        self.face = Image.GHOST
        
    def done(self):
        return True
