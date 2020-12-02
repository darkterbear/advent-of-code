import re

file = open('./input', 'r')

lines = file.readlines()

def valid(line):
  portions = re.split('[\- :\n]', line)
  min = int(portions[0])
  max = int(portions[1])
  chars = list(filter(lambda c: c == portions[2], portions[4]))
  if len(chars) >= min and len(chars) <= max:
    return True
print(len(list(filter(valid, lines))))
