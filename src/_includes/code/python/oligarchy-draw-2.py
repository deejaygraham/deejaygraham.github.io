def draw():
    background(255)

    # allocate players to pairs
    unpaired = []
    paired = {}

    for p in players:
        if p.is_playing():
            unpaired.append(p)

    # pair them off
    while len(unpaired) > 1:
        firstChoice = int(random(len(unpaired)))
        player1 = unpaired.pop(firstChoice)

        secondChoice = int(random(len(unpaired)))
        player2 = unpaired.pop(secondChoice)

        paired[player1] = player2

    # play each pair
    for p in paired:
        player1 = p
        player2 = paired[p]

        bet = min(player1.stake(), player2.stake())

        # toss a coin
        pick = int(random(len(coin_options)))
        heads_or_tails = coin_options[pick]
        println("coin is " + heads_or_tails)
        if heads_or_tails == "tails":
            player1.win(bet)
            player2.lose(bet)
        else:
            player1.lose(bet)
            player2.win(bet)

    # show each status regardless of
    # whether they played
    for p in players:
        p.display()
