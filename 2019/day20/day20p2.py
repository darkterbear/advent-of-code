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
queue = [(start, 0), None]
visited = set()
visited.add((start, 0))
steps = 0

while queue[0] == None or not ('ZZ' in edges[queue[0][0]] and queue[0][1] == 0):
    # print(queue)
    s = queue.pop(0)
    if not s:
        steps += 1
        queue.append(None)
    else:
        # print('at', s)
        curpos = s[0]
        curlev = s[1]
        for neighbor in [n for n in edges[curpos] if n != 'AA' and n != 'ZZ']:
            # print('check', neighbor)
            if abs(curpos[0] - neighbor[0]) > 1 or abs(curpos[1] - neighbor[1]) > 1:
                # teleporting...
                if curpos[0] == 2 or curpos[0] == len(m) - 3 or curpos[1] == 2 or curpos[1] == len(m[curpos[0]]) - 3:
                    if curlev > 0:  # if level 0, cant teleport outwards
                        # if teleporting outwards, decrease a level
                        if (neighbor, curlev - 1) not in visited:
                            # print('success teleport outwards')
                            visited.add((neighbor, curlev - 1))
                            queue.append((neighbor, curlev - 1))
                else:
                    # if teleporting inwards, add a level
                    if (neighbor, curlev + 1) not in visited:
                        # print('success teleport inwards')
                        visited.add((neighbor, curlev + 1))
                        queue.append((neighbor, curlev + 1))

            else:
                # print(visited)
                if (neighbor, curlev) not in visited:
                    # print('success movement')
                    visited.add((neighbor, curlev))
                    queue.append((neighbor, curlev))
print(steps)
