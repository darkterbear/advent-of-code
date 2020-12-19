import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

and_mask = 0xfffffffff
or_mask = 0x000000000

def create_masks(s):
  global and_mask
  global or_mask
  and_mask = int(''.join(list(map(lambda c: '0' if c == '0' else '1', list(s)))), base=2)
  or_mask = int(''.join(list(map(lambda c: '1' if c == '1' else '0', list(s)))), base=2)

mem = {}

for line in lines:
  if line[:7] == 'mask = ':
    create_masks(line[7:])
  else:
    s = line.index('[') + 1
    t = line.index(']')
    addr = int(line[s:t])
    value = int(line[t + 4:])

    mem[addr] = (value & and_mask) | or_mask
    # print(mem[addr])

print(sum(mem[addr] for addr in mem))
