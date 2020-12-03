import re

file = open('./input', 'r')

lines = file.readlines()

width = len(lines[0]) - 1

total = 1

for r, d in [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]:
  count = 0
  j = 0
  for i in range(0, len(lines), d):
    if lines[i][j] == '#':
      count += 1
    j = (j + r) % width
  total *= count
  
print(total)
