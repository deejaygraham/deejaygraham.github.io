# load-music-file.py
from microbit import *
import os
import music

display.show(Image.HAPPY)
sleep(1000)

score_file_name = 'score.txt'
score = []

local_files = os.listdir()

if score_file_name in local_files:
    display.show(Image.MUSIC_CROTCHET)

    with open(score_file_name) as score_file:
        line = score_file.readline()
        while line:
            notes = line.rstrip().split(',')
            bar = []

            for note in notes:
                bar.append(note.strip())

            score.append(bar)

            line = score_file.readline()

display.show(Image.MUSIC_QUAVERS)

while True:
    for bar in score:
        music.play(bar)
