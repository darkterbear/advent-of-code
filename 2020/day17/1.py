import re

file = open('./input', 'r')

lines = file.readlines()
m = [list(map(lambda line: list(line[:-1]), lines))]

actives = set()
for z in range(len(m)):
  for y in range(len(m[z])):
    for x in range(len(m[z][y])):
      if m[z][y][x] == '#': actives.add((z, y, x))

for cycle in range(6):
  neighbor_active_counts = {}
  for loc in actives:
    [z, y, x] = loc
    if not ((z, y, x) in neighbor_active_counts):
      neighbor_active_counts[(z, y, x)] = 0
    for dz in range(-1, 2):
      for dy in range(-1, 2):
        for dx in range(-1, 2):
          if dz == 0 and dy == 0 and dx == 0:
            continue
          nz = z + dz
          ny = y + dy
          nx = x + dx
          if not ((nz, ny, nx) in neighbor_active_counts):
            neighbor_active_counts[(nz, ny, nx)] = 0
          neighbor_active_counts[(nz, ny, nx)] += 1
  for loc in neighbor_active_counts:
    if loc in actives:
      if neighbor_active_counts[loc] < 2 or neighbor_active_counts[loc] > 3:
        actives.remove(loc)
    else:
      if neighbor_active_counts[loc] == 3:
        actives.add(loc)

print(len(actives))