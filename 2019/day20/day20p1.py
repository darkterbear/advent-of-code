m = [[c for c in line.replace('\n', '')] for line in open('./input')]

edges = {}


def isLetter(c):
    return c >= 'A' and c <= 'Z'


def findNeighbors(r, c, m):
    neighbors = []
    if r > 0:
        if m[r - 1][c] == '.':
            neighbors.append((r - 1, c))
        if isLetter(m[r - 1][c]):
            neighbors.append(m[r - 2][c] + m[r - 1][c])
    if r < len(m) - 1:
        if m[r + 1][c] == '.':
            neighbors.append((r + 1, c))
        if isLetter(m[r + 1][c]):
            neighbors.append(m[r + 1][c] + m[r + 2][c])
    if c > 0:
        if m[r][c - 1] == '.':
            neighbors.append((r, c - 1))
        if isLetter(m[r][c - 1]):
            neighbors.append(m[r][c - 2] + m[r][c - 1])
    if c < len(m[r]) - 1:
        if m[r][c + 1] == '.':
            neighbors.append((r, c + 1))
        if isLetter(m[r][c + 1]):
            neighbors.append(m[r][c + 1] + m[r][c + 2])
    return neighbors


# find edges for graph
for r in range(len(m)):
    for c in range(len(m[r])):
        if m[r][c] == '.':
            # find neighbors
            neighbors = findNeighbors(r, c, m)
            edges[(r, c)] = neighbors

# convert portal neighbors to point neighbors
for point in edges:
    for i in range(len(edges[point])):
        neighbor = edges[point][i]
        if type(neighbor) == str and neighbor != 'AA' and neighbor != 'ZZ':
            for point2 in edges:
                if point != point2 and neighbor in edges[point2]:
                    edges[point][i] = point2
                    edges[point2][edges[point2].index(neighbor)] = point
                    break

# bfs
# start at node with AA as neighbor
start = [point for point in edges if 'AA' in edges[point]][0]
queue = [start, None]
visited = set()
visited.add('AA')
steps = 0

while queue[0] == None or 'ZZ' not in edges[queue[0]]:
    s = queue.pop(0)
    if not s:
        steps += 1
        queue.append(None)
    else:
        for neighbor in [n for n in edges[s] if n not in visited]:
            visited.add(neighbor)
            queue.append(neighbor)
print(steps)
