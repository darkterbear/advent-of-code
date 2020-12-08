import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

ip = 0
acc = 0
seen = set()
while ip >= 0 and ip < len(lines):
  if ip in seen:
    print(acc)
    exit()
  seen.add(ip)
  [inst, arg] = lines[ip].split(' ')
  if inst == 'nop':
    ip += 1
  elif inst == 'acc':
    acc += int(arg)
    ip += 1
  elif inst == 'jmp':
    ip += int(arg)

