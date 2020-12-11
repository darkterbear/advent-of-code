import re

file = open('./input', 'r')

lines = file.readlines()
m = list(map(lambda line: list(line[:-1]), lines))

def num_adjacent_occupied(i, j):
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

print_m(m)
while True:
  changes = []
  for i in range(len(m)):
    for j in range(len(m[i])):
      if m[i][j] == '.': continue
      adjacent_occupied = num_adjacent_occupied(i, j)
      if (m[i][j] == 'L' and adjacent_occupied == 0) or (m[i][j] == '#' and adjacent_occupied >= 4):
        changes.append((i, j))

  if len(changes) == 0:
    print(sum(sum((1 if c == '#' else 0) for c in line) for line in m))
    break

  # print_m(m)
  for (i, j) in changes:
    m[i][j] = '#' if m[i][j] == 'L' else 'L'
