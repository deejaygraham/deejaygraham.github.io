roofline = []


def setup():
    fullScreen()
    stroke(255)
    frameRate(10)

    global roofline
    roofline.append(int(height / 2))


def draw():
    orange = color(192, 64, 0)
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
        x += x_step
        last_y = roof

    # each step, add a new section to the line
    y = last_y
    roofline.append(y)
