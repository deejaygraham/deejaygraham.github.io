from microbit import *

started = False
elapsed_seconds = 0
timer_duration = 20

animation = [
    Image.CLOCK1,
    Image.CLOCK2,
    Image.CLOCK3,
    Image.CLOCK4,
    Image.CLOCK5,
    Image.CLOCK6,
    Image.CLOCK7,
    Image.CLOCK8,
    Image.CLOCK9,
    Image.CLOCK10,
    Image.CLOCK11,
    Image.CLOCK12,
]

display.scroll(str(timer_duration))

while True:

    if started:
        sleep(1000)
        elapsed_seconds += 1

        if elapsed_seconds < timer_duration:
            animation_frame = elapsed_seconds % len(animation)
            display.show(animation[animation_frame])
        else:
            display.show(Image.HAPPY)
            started = False
    else:
        if accelerometer.was_gesture("shake"):
            started = True
            elapsed_seconds = 0
        else:
            if button_a.was_pressed():
                timer_duration = min(240, timer_duration + 1)
                display.scroll(str(timer_duration))
            elif button_b.was_pressed():
                timer_duration = max(1, timer_duration - 1)
                display.scroll(str(timer_duration))
        sleep(250)
