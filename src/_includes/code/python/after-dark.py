def setup():
    fullScreen()

    global toasts
    toasts = []

    for i in range(10):
        toasts.append(FlyingToast(random(width), random(height), random(0, 3)))

    global toasters
    toasters = []
    for i in range(20):
        toasters.append(FlyingToaster(random(width), random(height), random(0, 3)))


def draw():
    background(64, 64, 64)
    for toast in toasts:
        toast.move()
        toast.draw()
    for toaster in toasters:
        toaster.move()
        toaster.draw()
