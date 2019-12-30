num_cards = 10007
cards = list(range(num_cards))

for line in open('./input'):
    line = line.replace('\n', '')
    tokens = line.split(' ')

    if tokens[0] == 'cut':
        n = int(tokens[1])
        cards = cards[n:] + cards[:n]
    elif tokens[1] == 'into':
        cards.reverse()
    else:
        increment = int(tokens[3])
        res = [None for _ in range(num_cards)]
        i = 0
        for e in cards:
            res[i] = e
            i = (i + increment) % num_cards
        cards = res

print(cards.index(2019))
