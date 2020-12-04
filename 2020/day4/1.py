import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

fields = []
valid = 0
for line in lines:
  if len(line) == 0:
    if len(fields) == 8 or (len(fields) == 7 and not 'cid' in fields):
      valid += 1
    fields = []
  else:
    parameters = line.split(' ')
    fields += map(lambda p: p.split(':')[0], parameters)

print(valid)