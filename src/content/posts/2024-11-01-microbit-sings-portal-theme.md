---
title: Singing the Portal Theme
tags: [code, microbit, python]
hero: microbit


---

Quite a few years ago I posted something about creating music on the microbit and used the <a href="https://en.wikipedia.org/wiki/Portal_(video_game)">Portal</a> ending theme as 
written by <a href="https://www.jonathancoulton.com/">Jonathan Coulton</a>.

This was some code that used the microbit's music DSL to play the theme using ```music.play``` and ran through an array of notes representing that theme.
I just came across an alternative version where I have used ```speech.sing``` instead to work through another simple DSL I created to sing the words at the 
correct pitch and with the correct timing. I paired invidiual words with note names and octave numbers, like in the previous example, but for sing to work it 
requires frequency values rather than note names. I added a "rest" command to make sure that pauses in the music were handled. 

```python
from microbit import *
import speech

note_name_to_value = {
    "c3": "58",
    "cs3": "55",
    "d3": "52",
    "ds3": "49",
    "e3": "46",
    "f3": "44",
    "fs3": "42",
    "g3": "39",
    "gs3": "37",
    "a3": "35",
    "as3": "33",
    "b3": "31",
    "c4": "29",
    "cs4": "28",
    "d4": "26",
    "ds4": "25",
    "e4": "23",
    "f4": "22",
    "fs4": "21",
    "g4": "20",
}

song = [
    "This:g4",
    "was:fs4",
    "a:e4",
    "try:e4",
    "umph:fs4" "rest:1000" "I'm:a3" "making:g4",
    "a:fs4",
    "note:e4",
    "here:fs4",
    "rest:500",
    "huge:d4",
    "rest:200",
    "suck:e4",
    "sess:a3" "rest:1000",
    "it's:a3",
    "hard:e4",
    "to:fs4",
    "oh:g4",
    "ver:e4" "state:cs4" "my:d4",
    "sat:e4",
    "tis:a3",
    "fack:a3",
    "shun:fs4",
]

while True:
    for chunk in song:
        word, value = chunk.split(":")

        if word == "rest":
            sleep(int(value))
        else:
            phoneme = speech.translate(word)
            speech.sing("#" + note_name_to_value[value] + phoneme)
```

Words need to be translated into phonemes before singing so that they are in the correct format for the sing API.

This is incomplete - mainly because it took a lot of time to get even this far - but I like the approach, it got quite good results and 
it might be something I try again in the future.
