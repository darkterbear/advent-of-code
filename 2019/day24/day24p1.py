m = tuple([tuple([c == '#' for c in line.replace('\n', '')])
           for line in open('./input')])

seen = set()
rows = len(m)
cols = len(m[0])


def adjacent_bugs(r, c, m):
    count = 0
    if r > 0 and m[r - 1][c]:
        count += 1
    if r < rows - 1 and m[r + 1][c]:
        count += 1
    if c > 0 and m[r][c - 1]:
        count += 1
    if c < cols - 1 and m[r][c + 1]:
        count += 1
    return count


def print_map(m):
    for row in m:
        print(''.join(['#' if cell else '.' for cell in row]))


while m not in seen:
    seen.add(m)
    new = []
    for r in range(rows):
        row = []
        for c in range(cols):
            cur = m[r][c]
            adj = adjacent_bugs(r, c, m)
            row.append(adj == 1 or (not cur and adj == 2))
        new.append(tuple(row))
    m = tuple(new)
print_map(m)

multiplier = 1
s = 0

for row in m:
    for c in row:
        if c:
            s += multiplier
        multiplier *= 2
print(s)
