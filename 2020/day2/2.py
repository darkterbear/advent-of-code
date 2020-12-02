import re

file = open('./input', 'r')

lines = file.readlines()

def valid(line):
  portions = re.split('[\- :\n]', line)
  i1 = int(portions[0]) - 1
  i2 = int(portions[1]) - 1
  if (portions[4][i1] == portions[2] and portions[4][i2] != portions[2]) or (portions[4][i1] != portions[2] and portions[4][i2] == portions[2]):
    return True

print(len(list(filter(valid, lines))))
