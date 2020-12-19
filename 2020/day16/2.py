import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

my_ticket = []
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
    my_ticket = list(map(lambda s: int(s), line.split(',')))
  elif t == 2:
    if line[0] == 'n': continue
    ticket = list(map(lambda s: int(s), line.split(',')))

    if any(not (i in valid) for i in ticket):
      continue
    tickets.append(ticket)

indices = {}

for field_name in fields:
  indices[field_name] = set(range(len(fields)))

for ticket in tickets:
  for i in range(len(ticket)):
    for field_name in fields:
      if not any(ticket[i] in r for r in fields[field_name]):
        # this field cant correspond to this index
        indices[field_name].discard(i)

sorted_indices = sorted(indices, key=lambda field_name: len(indices[field_name]))
# for index in sorted_indices:
#   print(index, indices[index])

prod = 1
for i in [15, 5, 14, 0, 17, 10]:
  print(my_ticket[i])
  prod *= my_ticket[i]

print(prod)
