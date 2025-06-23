def draw_random_point():
    global art
    x = int(random(art.width))
    y = int(random(art.height))
    colour = art.get(x, y)
    fill(colour)
    rect(x, y, 10, 10)


def draw():
    for i in range(0, 25):
        draw_random_point()
