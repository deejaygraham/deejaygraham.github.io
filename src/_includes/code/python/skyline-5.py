roofline = [] 
windows = []

def reset():
    global roofline, windows
    roofline = []    
    windows = []

    saveFrame("output-####.png")
    
def setup():
    fullScreen()
    frameRate(8)
    
    global roofline
    roofline.append(int(height / 2))
    
def draw():
    orange = color(192, 64, 0)
    dark_gray = color(45, 45, 45)
    background(orange)
    
    global roofline, windows
    x = 0  
    x_step = int(width / 50)
    last_y = 0
    roof = 0

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
        
    yellow = color(255, 255, 0) 
    for window in windows:    
        window_height = int(height / 100)
        window_width = int(window_height /2 ) 
        fill(yellow)
        rect(window[0], window[1], window_width, window_height)
        
    # each step, add a new section to the line    
    y = last_y  
    
    if random(100) > 60:
        border = int(height / 4)
        y = random(border, height - border)
        
    roofline.append(y)  
    
    if random(100) > 60:
        window_x = int(random(x - x_step, x))
        window_y = int(random(roof + 10, height - 50))
        windows.append([window_x, window_y])

    if x > width:
        reset()
