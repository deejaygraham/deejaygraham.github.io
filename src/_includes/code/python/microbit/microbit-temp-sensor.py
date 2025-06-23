from microbit import *

brightness = 4

while True:

    temp_in_c = temperature()
    pixel_temp = 0

    for x in range(5):
        for y in range(5):
            pixel_temp += 2
            pixel_intensity = brightness if int(temp_in_c) >= pixel_temp else 0
            display.set_pixel(x, y, pixel_intensity)

            # debug only
            # print(str(x) + ', ' + str(y) + ' : ' + str(pixel_temp) + ' -> ' + str(temp_in_c))
            # sleep(500)

    sleep(500)
