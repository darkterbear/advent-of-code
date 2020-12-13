import re

file = open('./input', 'r')

lines = file.readlines()
insts = list(map(lambda line: line[:-1], lines))

wp_state = [10, 1]
state = [0, 0]

for inst in insts:
  command = inst[0]
  value = int(inst[1:])

  if command == 'N':
    wp_state[1] += value
  elif command == 'S':
    wp_state[1] -= value
  elif command == 'E':
    wp_state[0] += value
  elif command == 'W':
    wp_state[0] -= value
  elif command == 'L':
    [x, y] = wp_state
    if value == 90:
      wp_state[0] = -y
      wp_state[1] = x
    elif value == 180:
      wp_state[0] = -x
      wp_state[1] = -y
    elif value == 270:
      wp_state[0] = y
      wp_state[1] = -x
  elif command == 'R':
    [x, y] = wp_state
    if value == 90:
      wp_state[0] = y
      wp_state[1] = -x
    elif value == 180:
      wp_state[0] = -x
      wp_state[1] = -y
    elif value == 270:
      wp_state[0] = -y
      wp_state[1] = x
  elif command == 'F':
    state[0] += value * wp_state[0]
    state[1] += value * wp_state[1]
  print(state)

print(state)
print(abs(state[0]) + abs(state[1]))
