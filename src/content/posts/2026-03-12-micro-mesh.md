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

    # Drop packets that have been relayed too many times
    if hops > MAX_HOPS:
        print("DROP  seq={} origin={} – max hops exceeded".format(seq, origin_id))
        return

    # Drop packets we have already handled (loop prevention)
    if _have_seen(origin_id, seq):
        return
    _mark_seen(origin_id, seq)

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

## Advanced Version

A more advanced version makes the code a bit more involved but makes for a better user experience so decide for yourself if this version is 
worth it. 

### Naming 

In this version, each microbit creates it's own name derived from it's hardware serial number so that each unit gets a memorable, human-readable 
name without having to add it to the code. 

### Multi Phase

The advanced version splits the running of the code into two phases: a discovery phase; and a mesh phase. Each unit generates its own unique name 
from its hardware serial number, runs a timed discovery phase where all units learn who is in the network, then switches into low-power mesh 
mode where messages hop between units to reach distant recipients.

### Discovery

During the discovery phase, at startup, the radio switches to a separate channel and uses max power to broadcast it's id to everyone within range. 
A 30-second count down runs to discover other units with each unit broadcasting a hello message every 2 seconds. In this phase, we 
expect all microbit units to be in close proximity - in the same room - so that they can all discover each other before moving on to the next phase.
Discovered names are added to each units "peer" list.

### Mesh

In the mesh phase, everyone should scatter out and try to form a mesh with some people close, some further away from the starting point 
but each person within a few metres of each other so that the messages can still be transmitted. 

In mesh mode, the radio switches to a new channel, turns down the power to reduce the range of each individual message hop, increasing the likelihood 
that more hops will be needed between source and target. Use button A to scroll through the list of discovered peers to pick a target. 
Holding A and B together sends the message to the intended target. Pressing button B on its own will scroll the name of the unit as before to help 
you identify each unit. 

### advanced-mesh.py

```python
from microbit import *
import machine
import radio
import utime

# ---------------------------------------------------------------------------
# Tuneable constants
# ---------------------------------------------------------------------------
DISCOVERY_SECS  = 30    # Duration of the discovery phase in seconds
HELLO_INTERVAL  = 2000  # ms between HELLO broadcasts during discovery
MAX_HOPS        = 6     # Maximum relay hops before a packet is dropped
SEEN_CAPACITY   = 30    # Size of the duplicate-suppression ring buffer
MAX_PEERS       = 20    # Maximum number of peers we will track

DISC_CHANNEL    = 50    # Discovery channel  (all units hear all units)
DISC_POWER      = 7     # Maximum TX power
MESH_CHANNEL    = 7     # Mesh channel       (low power, forces hopping)
MESH_POWER      = 0     # Minimum TX power

## ---------------------------------------------------------------------------
# Name generation
# ---------------------------------------------------------------------------
# Every micro:bit has a 64-bit pseudo-random unique ID burned into its chip
# at the factory, held in the FICR (Factory Information Configuration
# Register) in read-only memory.
#
# We read DEVICEID[1] via machine.mem32, then use two nibbles (4 bits each)
# to index into two short word lists:
#
#   upper nibble (0-15)  ->  adjective   e.g. RED
#   lower nibble (0-15)  ->  noun        e.g. FOX
#   result               ->  RED-FOX
#
# 16 x 16 = 256 unique combinations. The same chip always gets the same name
# because the FICR UID is permanent. Words are kept to 3-4 characters so the
# full name scrolls quickly on the 5x5 LED display and is easy to say aloud.
 
_ADJECTIVES = [
    "RED",  "BIG",  "SLY",  "OLD",
    "NEW",  "HOT",  "ICY",  "SHY",
    "ODD",  "RAW",  "DIM",  "FAT",
    "WET",  "DRY",  "SAD",  "CALM",
]
 
_NOUNS = [
    "FOX",  "OWL",  "BEE",  "RAM",
    "ELK",  "COD",  "JAY",  "GNU",
    "YAK",  "EMU",  "APE",  "COW",
    "PIG",  "HEN",  "DOE",  "ASS",
]
 
def _generate_name():
    """Return a name like RED-FOX derived deterministically from the hardware UID."""
    uid = 0
    try:
        # nRF51/nRF52 FICR: DEVICEID[1] at base 0x10000000 + offset 25*4
        uid = machine.mem32[0x10000000 + 25 * 4] & 0xFFFFFFFF
    except Exception:
        # Fallback: millisecond jitter at boot. Not guaranteed unique but
        # acceptable for a demo where units are powered on at different times.
        uid = utime.ticks_ms() & 0xFFFFFFFF
 
    adj  = _ADJECTIVES[(uid >> 4) & 0xF]   # bits 7-4  -> adjective
    noun = _NOUNS[uid & 0xF]               # bits 3-0  -> noun
    return "{}-{}".format(adj, noun)

MY_NAME   = _generate_name()


MY_NAME   = _generate_name()

peers     = []   # peer name strings found during discovery (sorted)
_seq      = 0    # outgoing sequence counter (increments per sent message)
_seen     = []   # ring buffer of (origin_name, seq_int) for dedup

_peer_idx = 0    # index into peers[] for the UI peer-selector


def _have_seen(origin, seq):
    return (origin, seq) in _seen

def _mark_seen(origin, seq):
    global _seen
    _seen.append((origin, seq))
    if len(_seen) > SEEN_CAPACITY:
        _seen.pop(0)

def _radio_discovery_mode():
    """High power on the discovery channel."""
    radio.off()
    radio.on()
    radio.config(channel=DISC_CHANNEL, power=DISC_POWER, length=64)

def _radio_mesh_mode():
    """Minimum power on the mesh channel – forces multi-hop routing."""
    radio.off()
    radio.on()
    radio.config(channel=MESH_CHANNEL, power=MESH_POWER, length=128)

def run_discovery():
    """
    Broadcast our name and collect peer names for DISCOVERY_SECS seconds.
    Ends automatically on timeout, or early if button A is held for ~1 s.
    """
    global peers

    _radio_discovery_mode()
    print("=== DISCOVERY  name={}  ch={}  power={} ===".format(
        MY_NAME, DISC_CHANNEL, DISC_POWER))

    start_ms      = utime.ticks_ms()
    end_ms        = start_ms + DISCOVERY_SECS * 1000
    last_hello_ms = utime.ticks_add(start_ms, -HELLO_INTERVAL)  # send immediately
    last_disp_s   = -1

    while True:
        now         = utime.ticks_ms()
        elapsed_ms  = utime.ticks_diff(now, start_ms)
        remaining_s = max(0, (DISCOVERY_SECS * 1000 - elapsed_ms) // 1000)

        if remaining_s != last_disp_s:
            last_disp_s = remaining_s
            # Show digit for single figures, clock image for larger numbers
            if remaining_s < 10:
                display.show(str(remaining_s))
            else:
                # Cycle through clock faces to indicate time passing
                display.show(Image.ALL_CLOCKS[remaining_s % 12])

        if utime.ticks_diff(now, last_hello_ms) >= HELLO_INTERVAL:
            radio.send("HELLO|{}".format(MY_NAME))
            last_hello_ms = now
            print("HELLO  name={}  peers_known={}".format(MY_NAME, len(peers)))

        raw = radio.receive()
        if raw and raw.startswith("HELLO|"):
            parts = raw.split("|")
            if len(parts) == 2:
                peer = parts[1].strip()
                if peer and peer != MY_NAME and peer not in peers:
                    if len(peers) < MAX_PEERS:
                        peers.append(peer)
                        # Flash a dot in the corner to confirm receipt
                        display.set_pixel(4, 0, 9)
                        print("FOUND  peer={}  total={}".format(peer, len(peers)))

        if button_a.is_pressed():
            utime.sleep_ms(800)
            if button_a.is_pressed():
                print("Discovery ended early by user")
                break

        if utime.ticks_diff(now, end_ms) >= 0:
            break

        sleep(20)   # yield

    peers.sort()    # consistent alphabetical order on every unit

    # Summary splash
    display.scroll("{}P".format(len(peers)), delay=80)
    print("=== DISCOVERY DONE  peers={} ===".format(peers))
    utime.sleep_ms(1000)
    display.clear()

def _build_mesh(origin, dest, seq, hops, message):
    return "MESH|{}|{}|{}|{}|{}".format(origin, dest, seq, hops, message)

def _parse_mesh(raw):
    """Return (origin, dest, seq, hops, message) or None if not a mesh packet."""
    try:
        parts = raw.split("|")
        if len(parts) != 6 or parts[0] != "MESH":
            return None
        return parts[1], parts[2], int(parts[3]), int(parts[4]), parts[5]
    except Exception:
        return None

def send_message(dest_name, message):
    """Originate a new mesh message addressed to dest_name."""
    global _seq
    _seq += 1
    seq = _seq
    _mark_seen(MY_NAME, seq)           # suppress our own echo
    radio.send(_build_mesh(MY_NAME, dest_name, seq, 0, message))
    display.show(Image.ARROW_E)
    utime.sleep_ms(500)
    display.clear()
    print("SENT  seq={}  to={}  msg={}".format(seq, dest_name, message))

def relay_packet(origin, dest, seq, hops, message):
    """Re-broadcast a packet on behalf of another node (one mesh hop)."""
    hops += 1
    radio.send(_build_mesh(origin, dest, seq, hops, message))
    display.show(Image.DIAMOND_SMALL)
    utime.sleep_ms(200)
    display.clear()
    print("RELAY seq={}  origin={}  dest={}  hops={}".format(
        seq, origin, dest, hops))

def handle_mesh(raw):
    """Process an incoming radio packet in mesh mode."""
    result = _parse_mesh(raw)
    if result is None:
        return                          # not a mesh packet – ignore

    origin, dest, seq, hops, message = result

    if hops > MAX_HOPS:
        print("DROP  seq={}  origin={}  hops exceeded".format(seq, origin))
        return

    if _have_seen(origin, seq):
        return                          # already processed – drop silently
    _mark_seen(origin, seq)

    if dest == MY_NAME:
        # ── This packet is for us ────────────────────────────────────────
        print("RECV  seq={}  from={}  hops={}  msg={}".format(
            seq, origin, hops, message))
        display.scroll("{}: {}".format(origin, message), delay=80)
        display.clear()
    else:
        # ── Not for us – relay it onward ─────────────────────────────────
        relay_packet(origin, dest, seq, hops, message)

def _show_current_target():
    """Scroll the name of the currently selected peer."""
    if not peers:
        display.scroll("NONE", delay=80)
        display.clear()
        return
    name = peers[_peer_idx % len(peers)]
    display.scroll("> {}".format(name), delay=80)
    display.clear()


# Welcome: scroll our own name so the user knows which unit this is
display.scroll(MY_NAME, delay=80)
display.clear()
print("=== micro:bit mesh  MY_NAME={} ===".format(MY_NAME))

run_discovery()

_radio_mesh_mode()
print("=== MESH MODE  ch={}  power={}  peers={} ===".format(
    MESH_CHANNEL, MESH_POWER, peers))

# Ready signal
display.show(Image.HAPPY)
utime.sleep_ms(800)
display.clear()

# Brief usage hint
if peers:
    display.scroll("A=PICK AB=SEND B=ME", delay=80)
else:
    display.scroll("NO PEERS FOUND", delay=80)
display.clear()

# Show the first target so the user knows where they are in the list
_show_current_target()

while True:

    a_pressed = button_a.is_pressed()
    b_pressed = button_b.is_pressed()

    if a_pressed and b_pressed:
        utime.sleep_ms(350)  # hold-confirmation delay
        if button_a.is_pressed() and button_b.is_pressed():
            if peers:
                target = peers[_peer_idx % len(peers)]
                # Change your message here !!!
                msg    = "Hello from {}!".format(MY_NAME)
                display.scroll("-> {}".format(target), delay=80)
                display.clear()
                send_message(target, msg)
            else:
                display.scroll("NO PEERS", delay=80)
                display.clear()
            # Wait for both buttons to be released before continuing
            while button_a.is_pressed() or button_b.is_pressed():
                sleep(20)

    # ── A alone (was_pressed) → advance peer selector ────────────────────
    elif button_a.was_pressed() and not b_pressed:
        if peers:
            _peer_idx = (_peer_idx + 1) % len(peers)
            _show_current_target()
        else:
            display.scroll("NONE", delay=80)
            display.clear()

    # ── B alone (was_pressed) → show our own name ────────────────────────
    elif button_b.was_pressed() and not a_pressed:
        display.scroll("ME: {}".format(MY_NAME), delay=80)
        display.clear()

    # ── Check for incoming mesh packets ──────────────────────────────────
    raw = radio.receive()
    if raw:
        handle_mesh(raw)

    sleep(10)
```

