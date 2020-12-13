import re

file = open('./input', 'r')

lines = file.readlines()
insts = list(map(lambda line: line[:-1], lines))

state = [0, 0, 0]

for inst in insts:
  print(inst)
  command = inst[0]
  value = int(inst[1:])

  if command == 'N':
    state[1] += value
  elif command == 'S':
    state[1] -= value
  elif command == 'E':
    state[0] += value
  elif command == 'W':
    state[0] -= value
  elif command == 'L':
    state[2] = (state[2] + value) % 360
  elif command == 'R':
    state[2] = (state[2] - value) % 360
  elif command == 'F':
    if state[2] == 0:
      state[0] += value
    elif state[2] == 90:
      state[1] += value
    elif state[2] == 180:
      state[0] -= value
    elif state[2] == 270:
      state[1] -= value

print(state)
print(abs(state[0]) + abs(state[1]))
