---
title: Microbit Mesh Network
tags: [microbit]
---

Here is a demonstration of a mesh network implemented by several microbits working together to deliver a message from one destination unit 
to an intended target unit. Every microbit in the network is flashed with this same source file but each unit has to have a 
unique ID set in the code.

## Simple Version

### Set up

* Change MY_ID to a unique number for each unit in the network, this is used to identify who sent the message, and for whom it is intended.
* Change DEST_ID to the intended destination unit id.
* Change MESSAGE to be your own message.
* Flash the source to the microbit on each unit

### Message Handling

Every packet sent between microbits is formatted as ```MESH|origin|destination|sequence|hops|message```

* origin_id  – ID of the micro:bit that FIRST sent the message (1-9)
* dest_id    – ID of the intended recipient             (1-9)
* seq        – sequence number, increments per message from that origin
* hops       – how many times the packet has been relayed (for display)
* message    – the payload text

Each packet carries a (sender_id, seq) pair. A micro:bit keeps a short history of recently seen packets and 
will NOT relay the same packet twice, preventing infinite relay loops.

When a unit receives a message:
* If it is addressed to itself we show the message on the screen
* If the number of hops is too many we drop the packet to prevent inifinite loops
* If we've already seen this combination of origin and sequence we drop the packet, again to prevent infinite loops
* If it is addressed to someone else we rebroadcast it with hops+1

When button A is pressed, the unit broadcasts the first packet. If the destination is out of range, any other micro:bit 
that hears the broadcast will re-transmit it, until it finally reaches the intended recipient.

When button B is pressed, the unit will scroll it's ID on the screen.

### simple-mesh.py

```python 
from microbit import *
import radio
import utime

MY_ID   = 1          # Unique ID for THIS micro:bit  (1-9)
DEST_ID = 3          # ID of the micro:bit to message when A is pressed
MESSAGE = "Hello There!"   # Payload sent when A is pressed


RADIO_CHANNEL = 7    # All units must share the same channel (0-83)
MAX_HOPS      = 5    # Safety limit – drop packets relayed more than this
SEEN_CAPACITY = 20   # How many (origin, seq) pairs to remember

radio.on()
radio.config(channel=RADIO_CHANNEL, power=7, length=128)

# Sequence counter for packets we originate
_seq = 0

# Ring-buffer of recently seen (origin_id, seq) tuples to stop relay loops
_seen = []


def _have_seen(origin_id, seq):
    """Return True if we have already processed this packet."""
    return (origin_id, seq) in _seen


def _mark_seen(origin_id, seq):
    """Record this packet so we don't relay it again."""
    global _seen
    _seen.append((origin_id, seq))
    if len(_seen) > SEEN_CAPACITY:
        _seen.pop(0)   # drop the oldest entry


def _build_packet(origin_id, dest_id, seq, hops, message):
    """Encode a packet as a pipe-delimited string."""
    return "MESH|{}|{}|{}|{}|{}".format(
        origin_id, dest_id, seq, hops, message
    )


def _parse_packet(raw):
    """
    Decode a raw radio string.
    Returns (origin_id, dest_id, seq, hops, message) or None if invalid.
    """
    try:
        parts = raw.split("|")
        if len(parts) != 6 or parts[0] != "MESH":
            return None
        origin_id = int(parts[1])
        dest_id   = int(parts[2])
        seq       = int(parts[3])
        hops      = int(parts[4])
        message   = parts[5]
        return (origin_id, dest_id, seq, hops, message)
    except Exception:
        return None


def send_message(dest_id, message):
    """Originate a new mesh message to dest_id."""
    global _seq
    _seq += 1
    seq = _seq
    packet = _build_packet(MY_ID, dest_id, seq, 0, message)
    _mark_seen(MY_ID, seq)          # don't relay our own packet back to us
    radio.send(packet)
    display.show(Image.ARROW_E)     # indicate we transmitted
    utime.sleep_ms(400)
    display.clear()
    print("SENT  seq={} to={} msg={}".format(seq, dest_id, message))


def relay_packet(origin_id, dest_id, seq, hops, message):
    """Re-broadcast a packet on behalf of another node (mesh relay)."""
    hops += 1
    packet = _build_packet(origin_id, dest_id, seq, hops, message)
    radio.send(packet)
    # Show a brief 'relay' animation – diamond blink
    display.show(Image.DIAMOND_SMALL)
    utime.sleep_ms(300)
    display.clear()
    print("RELAY seq={} origin={} dest={} hops={} msg={}".format(
        seq, origin_id, dest_id, hops, message))


def handle_received(raw):
    """Process an incoming radio packet."""
    result = _parse_packet(raw)
    if result is None:
        return   # not one of our mesh packets, ignore it

    origin_id, dest_id, seq, hops, message = result

    # Drop packets we have already handled (loop prevention)
    if _have_seen(origin_id, seq):
        return
    _mark_seen(origin_id, seq)

    # Drop packets that have been relayed too many times
    if hops > MAX_HOPS:
        print("DROP  seq={} origin={} – max hops exceeded".format(seq, origin_id))
        return

    if dest_id == MY_ID:
        # ---- This message is FOR US ----
        print("RECV  seq={} from={} hops={} msg={}".format(
            seq, origin_id, hops, message))
        # Scroll the sender ID and message on the LED display
        display.scroll("{}:{}".format(origin_id, message), delay=80)
    else:
        # ---- Not for us – relay it to help it reach its destination ----
        relay_packet(origin_id, dest_id, seq, hops, message)


display.scroll("ID:{}".format(MY_ID), delay=80)
display.clear()
print("microbit_mesh ready  MY_ID={}  DEST_ID={}  CH={}".format(
    MY_ID, DEST_ID, RADIO_CHANNEL))

while True:
    # send a message to DEST_ID
    if button_a.was_pressed():
        send_message(DEST_ID, MESSAGE)

    # show our own ID on the display
    if button_b.was_pressed():
        display.scroll("ME:{}".format(MY_ID), delay=80)

    raw = radio.receive()
    if raw:
        handle_received(raw)

    sleep(10)   

```
