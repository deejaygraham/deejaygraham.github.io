from microbit import *
import music

still_alive = [
    # this was a tri
    "R:4",
    "g6:1",
    "f#",
    "e",
    "e",
    # umph
    "f#:4",
    "R:4",
    # I'm making a note
    "R:2",
    "R:1",
    "a5:1",
    "g6",
    "f#:1",
    "e",
    "e:2",
    # here Huge Success
    "f#:3",
    "d:2",
    "e:1",
    "a5:5",
    # it's
    "R:3",
    "a:1",
    # hard to overstate
    "e6:2",
    "f#:1",
    "g:3",
    "e:1",
    "c#:2",
    # my satisfact
    "d:3",
    "e:2",
    "a5:3",
    # tion
    "f#6:3",
    "R:4",
    # aperture science
    "R:4",
    "g:1",
    "f#",
    "e",
    "e",
    "f#:4",
    "R:4",
    # we do what we must
    "R:2",
    "R:1",
    "a5:1",
    "g6",
    "f#:1",
    "e",
    "e:3",
    # because we can
    "f#:1",
    "d:3",
    "e:1",
    "a5:5",
    "R:4",
    # for the good of all
    "e6:2",
    "f#:1",
    "g:3",
    "e:1",
    "c#:3",
    # of us except for the
    "d:1",
    "e:2",
    "a5:1",
    "d6",
    "e",
    # ones who are dead. But theres
    "f",
    "e",
    "d",
    "c",
    "R:2",
    "a5:1",
    "a#:1",
    # no sense crying over
    "c6:2",
    "f:2",
    "e:1",
    "d",
    "d",
    "c",
    # every mistake you just
    "d:1",
    "c6:1",
    "c6:2",
    "c6:2",
    "a5:1",
    "a#:1",
    # keep on trying till you
    "c6:2",
    "f:2",
    "g:1",
    "f:1",
    "e:1",
    "d:1",
    # run out of cake and the
    "d:1",
    "e6:1",
    "f6:2",
    "f:2",
    "g:1",
    "a:1",
    # science gets done and you
    "a#:1",
    "a#:1",
    "a:2",
    "g:2",
    "f:1",
    "g:1",
    # make a neat gun for the
    "a:1",
    "a:1",
    "g:2",
    "f:2",
    "d:1",
    "c:1",
    # people who are still alive
    "d:1",
    "f",
    "f",
    "e:2",
    "f#:1",
    "f#:1",
]

music.set_tempo(bpm=60)
music.play(still_alive)
