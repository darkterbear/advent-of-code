m = [[c for c in line.replace('\n', '')] for line in open('./input2')]

# state is represented by position and a list of keys in possession
state = []
allKeys = []
for row in range(len(m)):
    for col in range(len(m[row])):
        if m[row][col] == '@':
            state.append((row, col))
        if ord(m[row][col]) >= 97 and ord(m[row][col]) <= 122:
            allKeys.append(m[row][col])
print(len(allKeys), 'keys total')
state.append(tuple())
state = tuple(state)


def move(r, c, keys, m):
    if r < 0 or c < 0 or r >= len(m) or c >= len(m[r]):
        return None
    target = m[r][c]
    targetDec = ord(target)
    if target == '#':
        return None
    if targetDec >= 65 and targetDec <= 90 and target.lower() not in keys:
        return None

    if targetDec >= 97 and targetDec <= 122 and target not in keys:
        keys = tuple(sorted(keys + tuple([target])))
    return keys


queue = [state, None]
visited = set()
steps = 0
maxKeys = 0
while True:
    s = queue.pop(0)
    if s is None:
        # we need no special end condition
        # we end when we have found all the keys
        steps += 1
        queue.append(None)
    else:
        b = s[:4]
        keys = s[4]
        if len(keys) == len(allKeys):
            print(s)
            print(steps)
            break

        if len(keys) > maxKeys:
            maxKeys = len(keys)
            print(maxKeys)

        # check the 4 directions
        nextStates = []
        for bot in range(4):
            r = b[bot][0]
            c = b[bot][1]
            uKeys = move(r - 1, c, keys, m)
            dKeys = move(r + 1, c, keys, m)
            rKeys = move(r, c + 1, keys, m)
            lKeys = move(r, c - 1, keys, m)

            if uKeys is not None:
                stateList = list(s)
                stateList[bot] = (r - 1, c)
                stateList[4] = uKeys
                nextStates.append(tuple(stateList))
            if dKeys is not None:
                stateList = list(s)
                stateList[bot] = (r + 1, c)
                stateList[4] = dKeys
                nextStates.append(tuple(stateList))
            if rKeys is not None:
                stateList = list(s)
                stateList[bot] = (r, c + 1)
                stateList[4] = rKeys
                nextStates.append(tuple(stateList))
            if lKeys is not None:
                stateList = list(s)
                stateList[bot] = (r, c - 1)
                stateList[4] = lKeys
                nextStates.append(tuple(stateList))

        nextStates = [state for state in nextStates if state not in visited]

        for state in nextStates:
            visited.add(state)
            queue.append(state)
