coin_options = "heads", "tails"

players = []


def setup():
    # super slow so we can see the
    # game progress in real time
    frameRate(1)
    size(200, 200)

    # create all the players
    player_number = 1
    for column in range(1, 4):
        for row in range(1, 4):
            p = Player(player_number, column * 50, row * 50)
            players.append(p)
            player_number += 1


def draw():
    background(255)

    for p in players:
        if p.is_playing():
            amount = p.stake()

            # toss a coin
            pick = int(random(len(coin_options)))
            heads_or_tails = coin_options[pick]
            println("coin is " + heads_or_tails)
            if heads_or_tails == "tails":
                p.lose(amount)
            else:
                p.win(amount)

        p.display()

    saveFrame("grid-######.png")
