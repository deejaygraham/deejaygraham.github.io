# mood-lights.py
from adafruit_circuitplayground import cp
from adafruit_circuitplayground.express import cpx
import adafruit_fancyled.adafruit_fancyled as fancy
import time

brightness_step_size = 0.05
brightness = brightness_step_size

cpx.pixels.auto_write = False  
cpx.pixels.brightness = brightness  

PIXELS = 10

hue = 0.0
step_size = 0.001
time_step = 0.02

while True:
    hsv = fancy.CHSV(hue)
    rgb = fancy.CRGB(hsv)
    pixel_colour = rgb.pack()

    for i in range(PIXELS):
        cpx.pixels[i] = pixel_colour
    cpx.pixels.show()

    time.sleep(time_step)

    hue += step_size
    if hue > 1.0:
        hue = 0.0
    
    if cp.button_a:
        brightness = min(brightness + brightness_step_size, 1.0)
        cpx.pixels.brightness = brightness  
    elif cp.button_b:
        brightness = max(brightness_step_size, brightness - brightness_step_size)
        cpx.pixels.brightness = brightness  
