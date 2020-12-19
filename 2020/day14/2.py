import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

class Mask():
  # s: 11110000zzzz...
  # 1 is coerce on, 0 is unchanged, z is coerce off
  def __init__(self, s):
    self.s = s
    self.or_mask = int(''.join(list(map(lambda c: '1' if c == '1' else '0', list(s)))), base=2)
    self.and_mask = int(''.join(list(map(lambda c: '0' if c == 'z' else '1', list(s)))), base=2)

def create_masks(s):
  if 'X' in s:
    i = s.index('X')
    return create_masks(s[0:i] + 'z' + s[i + 1:]) + create_masks(s[0:i] + '1' + s[i + 1:])
  else:
    return [Mask(s)]

mem = {}
for line in lines:
  if line[:7] == 'mask = ':
    masks = create_masks(line[7:])
  else:
    s = line.index('[') + 1
    t = line.index(']')
    addr = int(line[s:t])
    value = int(line[t + 4:])

    for mask in masks:
      mem[(addr & mask.and_mask) | mask.or_mask] = value
    # print(mem[addr])


print(sum(mem[addr] for addr in mem))
