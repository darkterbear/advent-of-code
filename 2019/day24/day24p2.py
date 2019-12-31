m = tuple([tuple([c == '#' for c in line.replace('\n', '')])
           for line in open('./input')])
rows = len(m)
cols = len(m[0])

levels = {}
levels[0] = m
levels[1] = [[False for _ in range(cols)] for _ in range(rows)]
levels[-1] = [[False for _ in range(cols)] for _ in range(rows)]
steps = 200


def print_levels(levels):
    for l in levels:
        print('level', l)
        for row in levels[l]:
            print(''.join(['#' if b else '.' for b in row]))
    print()
    print()


def adjacent_bugs(r, c, l, levels):
    count = 0

    # check up
    if r > 0:
        if r == 3 and c == 2 and l + 1 in levels:
            count += sum([1 for c in levels[l + 1][4] if c])
        elif levels[l][r - 1][c]:
            count += 1
    else:
        if l - 1 in levels and levels[l - 1][1][2]:
            count += 1

    # check down
    if r < rows - 1:
        if r == 1 and c == 2 and l + 1 in levels:
            count += sum([1 for c in levels[l + 1][0] if c])
        elif levels[l][r + 1][c]:
            count += 1
    else:
        if l - 1 in levels and levels[l - 1][3][2]:
            count += 1

    # check left
    if c > 0:
        if r == 2 and c == 3 and l + 1 in levels:
            count += sum([1 for c in [r[4] for r in levels[l + 1]] if c])
        elif levels[l][r][c - 1]:
            count += 1
    else:
        if l - 1 in levels and levels[l - 1][2][1]:
            count += 1

    # check right
    if c < cols - 1:
        if r == 2 and c == 1 and l + 1 in levels:
            count += sum([1 for c in [r[0] for r in levels[l + 1]] if c])
        elif levels[l][r][c + 1]:
            count += 1
    else:
        if l - 1 in levels and levels[l - 1][2][3]:
            count += 1

    return count


def expand_inner(levels):
    innermost = levels[max(levels)]
    return innermost[1][2] or innermost[2][1] or innermost[2][3] or innermost[3][2]


def expand_outer(levels):
    outermost = levels[min(levels)]
    return any(outermost[0]) or any(outermost[4]) or any([r[0] for r in outermost]) or any([r[4] for r in outermost])


for _ in range(steps):
    new = {}
    for l in range(min(levels), max(levels) + 1):
        new[l] = []
        for r in range(rows):
            row = []
            for c in range(cols):
                if r != 2 or c != 2:
                    cur = levels[l][r][c]
                    adj = adjacent_bugs(r, c, l, levels)
                    row.append(adj == 1 or (not cur and adj == 2))
                else:
                    row.append(False)
            new[l].append(tuple(row))
        new[l] = tuple(new[l])
        if expand_outer(new):
            new[min(new) - 1] = [[False for _ in range(cols)]
                                 for _ in range(rows)]
        if expand_inner(new):
            new[max(new) + 1] = [[False for _ in range(cols)]
                                 for _ in range(rows)]
    levels = new

count = sum([sum([sum([1 for b in r if b]) for r in levels[l]])
             for l in levels])
print(count)
