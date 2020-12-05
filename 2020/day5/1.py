import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

def list_to_string(l):
  s = ''
  for c in l: s += c
  return s

max_id = 0
for line in lines:
  row_raw = line[:7]
  col_raw = line[7:]
  row_bin = list_to_string(list(map(lambda c: '0' if c == 'F' else '1', row_raw)))
  col_bin = list_to_string(list(map(lambda c: '0' if c == 'L' else '1', col_raw)))

  id = int(row_bin, 2) * 8 + int(col_bin, 2)
  print(row_bin, col_bin)
  print(int(row_bin, 2), int(col_bin, 2))
  if id > max_id:
    max_id = id

print(max_id)
