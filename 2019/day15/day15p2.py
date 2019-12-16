file = open('./map')

m = [[c for c in line[:-1]] for line in file]


def findStart():
    for y in range(len(m)):
        for x in range(len(m[y])):
            if m[y][x] == 'O':
                return (y, x)


start = findStart()
dist = 0
paths = {
    start: []
}
queue = [start, None]

while queue:
    loc = queue.pop(0)
    if not loc:
        if (len(queue) == 0 or not queue[0]):
            break
        dist += 1
        queue.append(None)
        continue

    # print(loc, len(paths[loc]))
    u = (loc[0] - 1, loc[1])
    d = (loc[0] + 1, loc[1])
    l = (loc[0], loc[1] - 1)
    r = (loc[0], loc[1] + 1)

    for target in [u, d, l, r]:
        if m[target[0]][target[1]] != '#' and target not in paths:
            paths[target] = paths[loc] + [loc]
            queue.append(target)
    # print(queue)

for loc in paths:
    print(len(paths[loc]))
