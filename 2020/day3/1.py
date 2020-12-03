import re

file = open('./input', 'r')

lines = file.readlines()

width = len(lines[0]) - 1

count = 0
j = 0

for i in range(len(lines)):
  if lines[i][j] == '#':
    count += 1
  j = (j + 3) % width
  
print(count)
