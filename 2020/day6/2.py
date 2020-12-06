import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

sum = 0
num_people = 0
yesses = {}
for line in lines:
  if len(line) == 0:
    sum += len(list(filter(lambda key: yesses[key] == num_people, yesses.keys())))
    num_people = 0
    yesses = {}
  else:
    num_people += 1
    for c in line:
      if not (c in yesses):
        yesses[c] = 0
      yesses[c] += 1
print(sum)