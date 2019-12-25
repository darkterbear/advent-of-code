m = [[c for c in line.replace('\n', '')] for line in open('./input2')]

nodes = {}
botCounter = 0
for row in range(len(m)):
    for col in range(len(m[row])):
        if m[row][col] == '@':
            nodes['@' + str(botCounter)] = (row, col)
            botCounter += 1
        if ord(m[row][col]) >= 97 and ord(m[row][col]) <= 122:
            nodes[m[row][col]] = (row, col)


def getState(r, c, doors, m):
    if r < 0 or c < 0 or r >= len(m) or c >= len(m[r]):
        return None

    target = m[r][c]
    targetDec = ord(target)

    if target == '#':
        return None
    if targetDec >= 65 and targetDec <= 90 and target.lower() not in doors:
        doors = tuple(sorted(doors + tuple([target])))

    return (r, c, doors)


edges = {}
for key in nodes:
    # bfs from the key
    queue = [(nodes[key][0], nodes[key][1], ()), None]
    visited = set()
    steps = 0
    neighborStates = []
    while True:
        # print(queue)
        state = queue.pop(0)
        if not state:
            if not queue or not queue[0]:
                break
            queue.append(None)
            steps += 1
        else:
            r = state[0]
            c = state[1]
            doors = state[2]

            # check if this is another key
            if m[r][c] >= 'a' and m[r][c] <= 'z' and m[r][c] != key:
                neighborStates.append((m[r][c], steps, state[2]))
            else:  # add neighbors
                uState = getState(r - 1, c, doors, m)
                dState = getState(r + 1, c, doors, m)
                rState = getState(r, c + 1, doors, m)
                lState = getState(r, c - 1, doors, m)

                nextStates = [state for state in [uState, dState,
                                                  rState, lState] if state and state[:2] not in visited]
                for state in nextStates:
                    visited.add(state[:2])
                    queue.append(state)
    edges[key] = neighborStates
    print(key, neighborStates)

# bfs from initial state, stop when we reach all keys
queue = [('@0', '@1', '@2', '@3', (), 0)]
visited = {}

minSteps = None
while queue:
    # print(queue)
    state = queue.pop(0)
    keys = state[4]
    dist = state[5]

    if len(keys) == len(nodes) - 4:
        if not minSteps or minSteps > dist:
            print(dist)
            minSteps = dist

    # for every bot
    for bot in range(4):
        # check every spot this bot can go to
        botLoc = state[bot]
        neighbors = edges[botLoc]

        for n in neighbors:
            newState = list(state)
            newState[5] += n[1]
            newState[bot] = n[0]
            if n[0] not in newState[4]:
                newState[4] = tuple(sorted(tuple(n[0]) + newState[4]))

            newState = tuple(newState)
            if all([reqKey.lower() in keys for reqKey in n[2]]) and (newState[:5] not in visited or visited[newState[:5]] > newState[5]):
                queue.append(newState)
                visited[newState[:5]] = newState[5]

print()
print(minSteps)
