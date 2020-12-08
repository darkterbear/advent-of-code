import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

nops = filter(lambda ip: lines[ip][:3] == 'nop', range(len(lines)))
jmps = filter(lambda ip: lines[ip][:3] == 'jmp', range(len(lines)))

def get_acc(flip):
  ip = 0
  acc = 0
  seen = set()
  while ip >= 0 and ip < len(lines):
    if ip in seen:
      return None
    seen.add(ip)
    [inst, arg] = lines[ip].split(' ')
    
    if ip == flip:
      if inst == 'nop':
        inst = 'jmp'
      else:
        inst = 'nop'
    if inst == 'nop':
      ip += 1
    elif inst == 'acc':
      acc += int(arg)
      ip += 1
    elif inst == 'jmp':
      ip += int(arg)
  return acc

for loc in nops:
  acc = get_acc(loc)
  if acc != None:
    print(acc)
    exit()

for loc in jmps:
  acc = get_acc(loc)
  if acc != None:
    print(acc)
    exit()

print('rip')