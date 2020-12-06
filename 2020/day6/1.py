import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

sum = 0
exists = set()
for line in lines:
  if len(line) == 0:
    sum += len(exists)
    exists = set()
  else:
    for c in line:
      exists.add(c)
print(sum)