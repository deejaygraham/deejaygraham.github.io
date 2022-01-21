import subprocess
import time
import datetime
import os

# sudo apt-get install abcde lame eject id3v2 eyed3 normalize-audio vorbisgain mkcue mp3gain flac

timeout_in_seconds = 360

cd_drive = '/dev/disk3'

# make sure there is no cd in the drive.

print("Waiting for Audio CD to rip...")
subprocess.call(["eject"])

# we want to shut down once all the disks have been ripped
lastTimeDiskFound = datetime.datetime.now()

# only wait as long as the timeout before giving up ripping session.
while (lastTimeDiskFound + datetime.timedelta(0, timeout_in_seconds)) > datetime.datetime.now():
    # is there a disk in the drive ?
    if path.exists(cd_drive):
        # check type and rip it...
        print("Disk found...")

        # needs custom abcde.conf in correct folder.
        # /etc/abcde.conf and $HOME/.abcde.conf
        # OUTPUTDIR="/music"
        # OUTPUTTYPE=wav,mp3
        # OUTPUTFORMAT='${OUTPUT}/${ARTISTFILE}-${ALBUMFILE}/${TRACKNUM} - ${TRACKFILE}'

 #       CDDBMETHOD=musicbrainz
#CDDBPROTO=6
#HELLOINFO=“`whoami`@`hostname`“
#NOSUBMIT=y
#FLACENCODERSYNTAX=default
#CDROMREADERSYNTAX=cdparanoia
#PADTRACKS=y
#INTERACTIVE=n
#LAME=lame
#FLAC=flac
#ID3=id3
#ID3V2=id3v2
#CDPARANOIA=cdparanoia
#EJECT=eject
#METAFLAC=metaflac
#CDSPEED=eject
#LAMEOPTS=‘–preset extreme‘
#FLACOPTS=“-f –best“
#ACTIONS=cddb,read,encode,tag,move,clean
#CDROM=/dev/sr0
#OUTPUTDIR=/media/usb/cd-rip
#WAVOUTPUTDIR=/tmp
#OUTPUTTYPE=flac
#OUTPUTFORMAT=’${ARTISTFILE}/${ALBUMFILE}/${TRACKNUM}.${TRACKFILE}‘
#VAOUTPUTFORMAT=’Various/${ALBUMFILE}/${TRACKNUM}.${ARTISTFILE}-${TRACKFILE}‘
#ONETRACKOUTPUTFORMAT=$OUTPUTFORMAT
#VAONETRACKOUTPUTFORMAT=$VAOUTPUTFORMAT
#LOWDISK=n
#PLAYLISTFORMAT=’${ARTISTFILE}/${ALBUMFILE}.${OUTPUT}.m3u‘
#VAPLAYLISTFORMAT=’${ARTISTFILE}/${ALBUMFILE}.${OUTPUT}.m3u‘
#EJECTCD=y

# prevent invalid characters getting into the file name
# mungefilename ()
# {
# echo "$@" | sed s,:,\ -,g | tr \ /\* __+ | tr -d \'\"\?\[:cntrl:\]
#}
#abcde -o „flac“,“mp3″

        ripper = subprocess.Popen("abcde -o flac, mp3", shell=True)
        ripper.communicate()

        print("Ripping complete.")
        # or os.system("drutil tray open")
        subprocess.call(["eject"])

        # reset timer 
        lastTimeDiskFound = datetime.datetime.now()

    # wait before checking again
    time.sleep(10)    

print "Audio Ripping shutting down."
