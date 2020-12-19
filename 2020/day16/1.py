import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

ticket = []
tickets = []

t = 0
fields = {}
valid = set()
s = 0
for line in lines:
  if line == '': 
    t += 1
    continue

  if t == 0:
    [field_name, field_ranges] = line.split(': ')
    field_ranges = list(map(lambda s: range(int(s.split('-')[0]), int(s.split('-')[1]) + 1), field_ranges.split(' or ')))
    fields[field_name] = field_ranges
    for r in field_ranges:
      for i in r:
        valid.add(i)
  elif t == 1:
    if line[0] == 'y': continue
    ticket = list(map(lambda s: int(s), line.split(',')))
  elif t == 2:
    if line[0] == 'n': continue
    ticket = list(map(lambda s: int(s), line.split(',')))
    tickets.append(t)

    for i in ticket:
      if not (i in valid):
        s += i

print(s)