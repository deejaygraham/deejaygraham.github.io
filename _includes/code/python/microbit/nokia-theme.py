from microbit import *
import music

ringtone = [ 
    "e7:1", "d", "f#6", "g#",  
    "c#7:1", "b6", "d", "e",  
    "b", "a", "c#6", "e",  
    "a:4", "R:4"
] 

music.set_tempo(bpm=60)

for repeat in range(2):
  music.play(ringtone) 
