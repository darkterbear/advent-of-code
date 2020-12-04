import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

fields = []
valid = 0
for line in lines:
  if len(line) == 0:
    print(fields)
    if len(fields) == 8 or (len(fields) == 7 and not 'cid' in fields):
      valid += 1
    fields = []
  else:
    parameters = line.split(' ')
    for p in parameters:
      field = p.split(':')[0]
      value = p.split(':')[1]
      if field == 'byr':
        if int(value) < 1920 or int(value) > 2002:
          continue
      if field == 'iyr':
        if int(value) < 2010 or int(value) > 2020:
          continue
      if field == 'eyr':
        if int(value) < 2020 or int(value) > 2030:
          continue
      if field == 'hgt':
        if value[-2:] == 'cm':
          if int(value[:-2]) < 150 or int(value[:-2]) > 193:
            continue
        elif value[-2:] == 'in':
          if int(value[:-2]) < 59 or int(value[:-2]) > 76:
            continue
        else:
          continue
      if field == 'hcl':
        if len(value) != 7 or value[0] != '#' or not all(map(lambda c: c in 'abcdef0123456789', value[1:])):
          continue
      if field == 'ecl':
        if not (value in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']):
          continue
      if field == 'pid':
        if len(value) != 9:
          continue
      print(field + ' added')
      fields.append(field)

print(valid)