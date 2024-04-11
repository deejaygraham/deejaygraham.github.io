roofline = [] 

def reset():
    global roofline
    roofline = []    
    
    saveFrame("output-####.png")
    
def setup():
    fullScreen()
    frameRate(10)
    
    global roofline
    roofline.append(int(height / 2))
    
def draw():
    orange = color(192, 64, 0)
    dark_gray = color(45, 45, 45)
    background(orange)
    
    global roofline
    x = 0  
    x_step = int(width / 50)
    last_y = 0
      
    for roof in roofline:
        stroke(255)
        if last_y > 0:
            line(x, last_y, x, roof)
        line(x, roof, x + x_step, roof)

        fill(dark_gray)
        stroke(dark_gray)
        rect(x, roof + 1, x_step, height - roof)
       
        x += x_step
        last_y = roof
        
    # each step, add a new section to the line    
    y = last_y  
    
    if random(100) > 60:
        border = int(height / 4)
        y = random(border, height - border)
        
    roofline.append(y)  
    
    if x > width:
        reset()
