m = [[c for c in line.replace('\n', '')] for line in open('./input')]

# state is represented by position and a list of keys in possession
state = (-1, -1, ())
allKeys = []
for row in range(len(m)):
    for col in range(len(m[row])):
        if m[row][col] == '@':
            state = (row, col, ())
        if ord(m[row][col]) >= 97 and ord(m[row][col]) <= 122:
            allKeys.append(m[row][col])
print(len(allKeys), 'keys total')


def getState(r, c, keys, m):
    if r < 0 or c < 0 or r >= len(m) or c >= len(m[r]):
        return None
    if m[r][c] == '#':
        return None
    if ord(m[r][c]) >= 65 and ord(m[r][c]) <= 90 and m[r][c].lower() not in keys:
        return None

    if ord(m[r][c]) >= 97 and ord(m[r][c]) <= 122 and m[r][c] not in keys:
        keys = tuple(sorted(keys + tuple([m[r][c]])))
    return (r, c, keys)


queue = [state, None]
visited = set()
steps = 0
maxKeys = 0
while True:
    # print(queue)
    s = queue.pop(0)
    if s is None:
        # we need no special end condition
        # we end when we have found all the keys
        steps += 1
        queue.append(None)
    else:
        r = s[0]
        c = s[1]
        keys = s[2]

        if len(keys) == len(allKeys):
            print(steps)
            break

        if len(keys) > maxKeys:
            maxKeys = len(keys)
            print(maxKeys)

        # check the 4 directions
        uState = getState(r - 1, c, keys, m)
        dState = getState(r + 1, c, keys, m)
        rState = getState(r, c + 1, keys, m)
        lState = getState(r, c - 1, keys, m)

        nextStates = [state for state in [uState, dState,
                                          rState, lState] if state and state not in visited]

        for state in nextStates:
            visited.add(state)
            queue.append(state)
