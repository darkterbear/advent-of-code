import re

file = open('./input', 'r')

lines = file.readlines()
m = [[list(map(lambda line: list(line[:-1]), lines))]]

actives = set()
for w in range(len(m)):
  for z in range(len(m[w])):
    for y in range(len(m[w][z])):
      for x in range(len(m[w][z][y])):
        if m[w][z][y][x] == '#': actives.add((w, z, y, x))

for cycle in range(6):
  neighbor_active_counts = {}
  for loc in actives:
    [w, z, y, x] = loc
    if not ((w, z, y, x) in neighbor_active_counts):
      neighbor_active_counts[(w, z, y, x)] = 0
    for dw in range(-1, 2):
      for dz in range(-1, 2):
        for dy in range(-1, 2):
          for dx in range(-1, 2):
            if dw == 0 and dz == 0 and dy == 0 and dx == 0:
              continue
            nw = w + dw
            nz = z + dz
            ny = y + dy
            nx = x + dx
            if not ((nw, nz, ny, nx) in neighbor_active_counts):
              neighbor_active_counts[(nw, nz, ny, nx)] = 0
            neighbor_active_counts[(nw, nz, ny, nx)] += 1
  for loc in neighbor_active_counts:
    if loc in actives:
      if neighbor_active_counts[loc] < 2 or neighbor_active_counts[loc] > 3:
        actives.remove(loc)
    else:
      if neighbor_active_counts[loc] == 3:
        actives.add(loc)

print(len(actives))