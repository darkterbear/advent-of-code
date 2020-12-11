import re

file = open('./input', 'r')

lines = file.readlines()
m = list(map(lambda line: list(line[:-1]), lines))

view_locations = {}

for i in range(len(m)):
  for j in range(len(m[i])):
    view_locations[(i, j)] = []
    # look up
    i2 = i - 1
    while i2 >= 0 and m[i2][j] == '.':
      i2 -= 1
    if i2 >= 0:
      view_locations[(i, j)].append((i2, j))

    # look down
    i2 = i + 1
    while i2 < len(m) and m[i2][j] == '.':
      i2 += 1
    if i2 < len(m):
      view_locations[(i, j)].append((i2, j))

    # look right
    j2 = j + 1
    while j2 < len(m[i]) and m[i][j2] == '.':
      j2 += 1
    if j2 < len(m[i]):
      view_locations[(i, j)].append((i, j2))
    
    # look left
    j2 = j - 1
    while j2 >= 0 and m[i][j2] == '.':
      j2 -= 1
    if j2 >= 0:
      view_locations[(i, j)].append((i, j2))

    # look top left
    i2 = i - 1
    j2 = j - 1
    while i2 >= 0 and j2 >= 0 and m[i2][j2] == '.':
      i2 -= 1
      j2 -= 1
    if i2 >= 0 and j2 >= 0:
      view_locations[(i, j)].append((i2, j2))

    # look top right
    i2 = i - 1
    j2 = j + 1
    while i2 >= 0 and j2 < len(m[i]) and m[i2][j2] == '.':
      i2 -= 1
      j2 += 1
    if i2 >= 0 and j2 < len(m[i]):
      view_locations[(i, j)].append((i2, j2))

    # look down right
    i2 = i + 1
    j2 = j + 1
    while i2 < len(m) and j2 < len(m[i]) and m[i2][j2] == '.':
      i2 += 1
      j2 += 1
    if i2 < len(m) and j2 < len(m[i]):
      view_locations[(i, j)].append((i2, j2))

    # look down left
    i2 = i + 1
    j2 = j - 1
    while i2 < len(m) and j2 >= 0 and m[i2][j2] == '.':
      i2 += 1
      j2 -= 1
    if i2 < len(m) and j2 >= 0:
      view_locations[(i, j)].append((i2, j2))
    
def num_visible_occupied(i, j):
  return len(list(filter(lambda loc: m[loc[0]][loc[1]] == '#', view_locations[(i, j)])))
  count = 0
  for y in range(i - 1, i + 2):
    for x in range(j - 1, j + 2):
      if y >= 0 and y < len(m) and x >= 0 and x < len(m[i]) and not (y == i and x == j) and m[y][x] == '#':
        count += 1
  return count

def print_m(m):
  for line in m:
    print(''.join(line))
  print()

# print_m(m)
while True:
  changes = []
  for i in range(len(m)):
    for j in range(len(m[i])):
      if m[i][j] == '.': continue
      adjacent_occupied = num_visible_occupied(i, j)
      if (m[i][j] == 'L' and adjacent_occupied == 0) or (m[i][j] == '#' and adjacent_occupied >= 5):
        changes.append((i, j))

  if len(changes) == 0:
    print(sum(sum((1 if c == '#' else 0) for c in line) for line in m))
    break

  # print_m(m)
  for (i, j) in changes:
    m[i][j] = '#' if m[i][j] == 'L' else 'L'
