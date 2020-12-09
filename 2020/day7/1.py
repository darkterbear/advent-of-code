import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

bag_types = {}

for line in lines:
  [parent_color, children] = line.split(' bags contain ')
  bag_types[parent_color] = {}
  if children != 'no other bags.':
    for child in children[:-1].split(', '):
      num_child = int(child[0])
      child_color = ' '.join(child.split(' ')[1:-1])
      bag_types[parent_color][child_color] = num_child

def can_reach_shiny_gold(color):
  if color == 'shiny gold':
    return True
  if not bag_types[color]:
    return False
  return any(can_reach_shiny_gold(child_color) for child_color in bag_types[color])

count = 0
for color in bag_types:
  if can_reach_shiny_gold(color):
    count += 1

print(count - 1)
