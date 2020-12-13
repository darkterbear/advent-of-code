import re

file = open('./input', 'r')

lines = file.readlines()
start = int(lines[0][:-1])
ids = lines[1][:-1].split(',')

# This prints out the remainders and modulos to plug into CRT calculator
for i in range(len(ids)):
  if ids[i] != 'x':
    print(f'{(int(ids[i]) - i) % int(ids[i])}\t{ids[i]}')
